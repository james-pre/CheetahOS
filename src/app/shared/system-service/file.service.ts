import { Injectable } from "@angular/core";
import { FileInfo } from "src/app/system-files/fileinfo";
import { ShortCut } from "src/app/system-files/shortcut";
import {extname, basename, resolve} from 'path';
import { Constants } from "src/app/system-files/constants";
import { FSModule } from "browserfs/dist/node/core/FS";
import { FileEntry } from 'src/app/system-files/fileentry';
import { Subject } from "rxjs";
import * as BrowserFS from 'browserfs';
import osDriveFileSystemIndex from '../../../osdrive.json';
import ini from 'ini';

@Injectable({
    providedIn: 'root'
})

export class FileService{

    private _fileInfo!:FileInfo;
    private _consts:Constants = new Constants();
    private _fileSystem!:FSModule;
    private _directoryFileEntires:FileEntry[]=[];
    dirFilesReadyNotify: Subject<void> = new Subject<void>();
    dirFilesUpdateNotify: Subject<void> = new Subject<void>();

    constructor(){
        1
    }

    private async initBrowserFsAsync():Promise<void>{
        if(!this._fileSystem){
            return new Promise<void>((resolve, reject) => {
                BrowserFS.configure({
                    fs: "MountableFileSystem",
                    options:{
                        '/':{
                            fs: 'OverlayFS',
                            options:{
                                readable:{fs: 'XmlHttpRequest', options:{index: osDriveFileSystemIndex}},
                                writable:{fs:"IndexedDB", options: {storeName: "browser-fs-cache"}}
                            },
                        },  
                    }},
                (e) =>{
                    if(e){  
                        console.log('initBrowserFs Error:', e)
                        reject(e); 
                    } });

                this._fileSystem = BrowserFS.BFSRequire('fs')
                resolve();
            });
        }
    }

    public async getFilesFromDirectoryAsync(dirPath:string):Promise<unknown>{
        await this.initBrowserFsAsync();

        return new Promise((resolve, reject) => {
            const fs = this._fileSystem;
            const interval = setInterval(() => {
                fs.readdir(dirPath, function(err, files) {
                  if(err){
                      console.log("Oops! a boo boo happened, filesystem wasn't ready:", err)
                      reject(err)
                  }else{
                    clearInterval(interval);
                    resolve(files);
                  }
                });
            }, 100);
        });
    }

    public async getFileInfoAsync(path:string):Promise<FileInfo>{
        const extension = extname(path);
        this._fileInfo = new FileInfo();

        if(extension == '.url'){
           const sc = await this.getShortCutAsync(path) as ShortCut;
           this._fileInfo.setIcon = sc.getIconFile;
           this._fileInfo.setPath = sc.getUrl;
        }
        else if(this._consts.IMAGE_FILE_EXTENSIONS.includes(extension)){    
            const sc = await this.getImageFileB64DataUrlAsync(path) as ShortCut;
            this._fileInfo.setIcon = sc.getIconFile;
            this._fileInfo.setPath = sc.getUrl;
        }else{
            this._fileInfo.setIcon='/osdrive/icons/unknown.ico';
            this._fileInfo.setPath = basename(path, extname(path)) ;
        }

        return this._fileInfo;
    }

    public async getShortCutAsync(path: string) {
        await this.initBrowserFsAsync();

        return new Promise((resolve, reject) =>{

            this._fileSystem.readFile(path, function(err, contents = Buffer.from('')){
                if(err){
                    console.log('getShortCutAsync error:',err)
                    reject(err)
                }

                const stage = contents? contents.toString(): Buffer.from('').toString();
                const shortCut = ini.parse(stage) as unknown || {InternetShortcut:{ URL:'hi', IconFile:''}};
                if (typeof shortCut === 'object') {
                    const iSCut = (shortCut as {InternetShortcut:unknown})?.['InternetShortcut'];
                    const  url=  (iSCut as {URL:unknown})?.['URL'] as string;
                    const iconFile = (iSCut as {IconFile:unknown})?.['IconFile'] as string;
                    resolve(new ShortCut(iconFile,url));
                }

                resolve(new ShortCut('',''));
            });
        });
    }

    public async getImageFileB64DataUrlAsync(path: string):Promise<unknown> {
        await this.initBrowserFsAsync();

        return new Promise((resolve, reject) =>{
            this._fileSystem.readFile(path, 'utf-8',(err, b64Ed) =>{
                if(err){
                    console.log('getImageFileAsync error:',err)
                    reject(err)
                }
                const b64EncodedData = b64Ed as string
                resolve(new ShortCut(b64EncodedData, basename(path, extname(path))));
            });
        });
    }

    //NIU-not in use
    // public async getImageFileB64ToBlobAsync(path: string):Promise<unknown> {
    //     await this.initBrowserFsAsync();

    //     return new Promise((resolve, reject) =>{
    //         this._fileSystem.readFile(path,'utf-8',(err, b64Ed) =>{
    //             if(err){
    //                 console.log('getImageFileAsync error:',err)
    //                 reject(err)
    //             }
    //             const b64EncodedData = b64Ed as string
    //             const decodedString = atob(b64EncodedData.split(',')[1]);
    //             const arrBuffer = new ArrayBuffer(decodedString.length);
    //             const buffer = new Uint8Array(arrBuffer);
                
    //             for (let i = 0; i < decodedString.length; i++) {
    //                 buffer[i] = decodedString.charCodeAt(i);
    //             }

    //             const blob = new Blob([buffer], { type: 'image/jpeg' });
    //             const imageUrl = URL.createObjectURL(blob);

    //             resolve(new ShortCut(imageUrl, basename(path, extname(path))));
    //         });
    //     });
    // }

    //NIU-not in use
    // public async getDraggedAndDropFileData(file:File): Promise<unknown>{
    //     return new Promise((resolve) =>{
    //         const fileReader = new FileReader()
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = (evt) =>{
    //             resolve(evt.target?.result)
    //         }
    //     })
    // }

    public async writeFileAsync(directory:string, file:File,): Promise<void>{
        new Promise<void>((resolve, reject) =>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file);

            fileReader.onload = (evt) =>{
                this._fileSystem.writeFile(`${directory}/${file.name}`,evt.target?.result,(err) =>{  
                    if(err){
                        console.log('writeFileAsync Error:',err);
                        reject(err);
                    }
                    resolve();
                });
            }
         }).then(()=>{
            //Send update notification
            this.dirFilesUpdateNotify.next();
        });
    }

    public  getFileEntriesFromDirectory(fileList:string[], directory:string):FileEntry[]{

        for(let i = 0; i < fileList.length; i++){
            const  file = fileList[i];
            const fileEntry = new FileEntry()
            fileEntry.setName = basename(file, extname(file))
            fileEntry.setPath = resolve(directory, file);
            this._directoryFileEntires.push(fileEntry)
        }
        return this._directoryFileEntires;
    }

    public bufferToUrl(buffer:Buffer):string{
       return URL.createObjectURL(new Blob([new Uint8Array(buffer)]));
    }

    public uint8ToBase64(arr:Uint8Array):string{
        const base64String = btoa(String.fromCharCode(...new Uint8Array(arr)));
        return base64String;
    }
}
