import { Injectable } from "@angular/core";
import { FileInfo } from "src/app/system-files/fileinfo";
import { ShortCut } from "src/app/system-files/shortcut";
import {extname, basename, resolve, dirname} from 'path';
import { Constants } from "src/app/system-files/constants";
import { FSModule } from "browserfs/dist/node/core/FS";
import { FileEntry } from 'src/app/system-files/fileentry';
import { Subject } from "rxjs";
import * as BrowserFS from 'browserfs';
import osDriveFileSystemIndex from '../../../osdrive.json';
import ini  from 'ini';

@Injectable({
    providedIn: 'root'
})

export class FileService{

    private _fileInfo!:FileInfo;
    private _consts:Constants = new Constants();
    private _fileSystem!:FSModule;
    private _directoryFileEntires:FileEntry[]=[];
    private _fileExistsMap!:Map<string,number>; 
    dirFilesReadyNotify: Subject<void> = new Subject<void>();
    dirFilesUpdateNotify: Subject<void> = new Subject<void>();

    constructor(){ 
        this._fileExistsMap =  new Map<string, number>();
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
                (err) =>{
                    if(err){  
                        console.log('initBrowserFs Error:', err)
                        reject(err); 
                    }
                });
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

        if(!extension){
            const sc = await this.getFolderAsync(path) as ShortCut;
            this._fileInfo.setIcon = sc.getIconFile;
            this._fileInfo.setPath = path;
            this._fileInfo.setFileType = sc.getFileType;
            this._fileInfo.setFileName = sc.geFileName;
            this._fileInfo.setOpensWith = sc.getOpensWith;
        }
        else{
            if(extension == '.url'){
                const sc = await this.getShortCutAsync(path) as ShortCut;
                this._fileInfo.setIcon = sc.getIconFile;
                this._fileInfo.setPath = path;
                this._fileInfo.setFileType = sc.getFileType;
                this._fileInfo.setFileName = sc.geFileName;
                this._fileInfo.setOpensWith = sc.getOpensWith;
             }
             else if(this._consts.IMAGE_FILE_EXTENSIONS.includes(extension)){    
                const sc = await this.getImageFileB64DataUrlAsync(path) as ShortCut;
                this._fileInfo.setIcon = sc.getIconFile;
                this._fileInfo.setPath = path;
                this._fileInfo.setFileType = extension;
                this._fileInfo.setFileName = sc.geFileName;
                this._fileInfo.setOpensWith = 'imageviewer';
            }
             else if(extension == '.txt' || extension == '.properties'){
                this._fileInfo.setIcon = '/osdrive/icons/file.ico';
                this._fileInfo.setPath = path;
                this._fileInfo.setFileType = extname(path);
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setOpensWith = 'textopener';
            }
             else{
                this._fileInfo.setIcon='/osdrive/icons/unknown.ico';
                this._fileInfo.setPath = path;
                this._fileInfo.setFileName = basename(path, extname(path));
            }
        }
        return this._fileInfo;
    }

    public async getFolderAsync(path: string) {
        await this.initBrowserFsAsync();

        return new Promise((resolve, reject) =>{
            this._fileSystem.stat(path,(err, stats) =>{
                if(err){
                    console.log('getFolderAsync error:',err)
                    reject(err)
                }
                const isDirectory = stats ? stats.isDirectory() : false
                const iconFile = `/osdrive/icons/${isDirectory ? 'folder.ico' : 'unknown.ico'}`
                const fileType = 'folder';
                const opensWith ='fileexplorer'
                resolve(new ShortCut(iconFile, basename(path, extname(path)),fileType,basename(path, extname(path)) ,opensWith ));
            });
        });
    }

    public async getShortCutAsync(path:string) {
        await this.initBrowserFsAsync();

        return new Promise((resolve, reject) =>{
            this._fileSystem.readFile(path, function(err, contents = Buffer.from('')){
                if(err){
                    console.log('getShortCutAsync error:',err)
                    reject(err)
                }
                const stage = contents? contents.toString(): Buffer.from('').toString();
                const shortCut = ini.parse(stage) as unknown || {InternetShortcut:{ FileName:'hi', IconFile:'', FileType:'', ShortUrl:'', OpensWith:''}};
                if (typeof shortCut === 'object') {
                    const iSCut = (shortCut as {InternetShortcut:unknown})?.['InternetShortcut'];
                    const  fileName=  (iSCut as {FileName:unknown})?.['FileName'] as string;
                    const iconFile = (iSCut as {IconFile:unknown})?.['IconFile'] as string;
                    const fileType = (iSCut as {FileType:unknown})?.['FileType'] as string;
                    const shortUrl = (iSCut as {ShortUrl:unknown})?.['ShortUrl'] as string;
                    const opensWith = (iSCut as {OpensWith:unknown})?.['OpensWith'] as string;
                    resolve(new ShortCut(iconFile,fileName,fileType,shortUrl,opensWith));
                }

                resolve(new ShortCut('','','','',''));
            });
        });
    }

    public async getImageFileB64DataUrlAsync(path:string):Promise<unknown> {
        await this.initBrowserFsAsync();

        return new Promise((resolve, reject) =>{
            this._fileSystem.readFile(path, 'utf-8',(err, data) =>{
                if(err){
                    console.log('getImageFileAsync error:',err)
                    reject(err)
                }
                const stringData = data as string

                if(stringData.includes('\x00') || stringData.includes('\u0000')){
                    resolve(new ShortCut(path, basename(path, extname(path)),'',basename(path, extname(path)),''));
                }
                    
                resolve(new ShortCut(stringData, basename(path, extname(path)),'',basename(path, extname(path)),''));
            });
        });
    }

    public async getFileAsync(path:string): Promise<string> {
        await this.initBrowserFsAsync();

        return new Promise((resolve, reject) =>{
            this._fileSystem.readFile(path,(err, contents = Buffer.from('')) =>{
                if(err){
                    console.log('getFileAsync error:',err)
                    reject(err)
                }
                const fileUrl = URL.createObjectURL(new Blob([new Uint8Array(contents)]))
                resolve(fileUrl);
            });
        });
    }

    public async writeFileAsync(directory:string, file:File):Promise<void>{

        new Promise<void>((resolve, reject) =>{
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file);

            fileReader.onload = (evt) =>{

                this._fileSystem.writeFile(`${directory}/${file.name}`,evt.target?.result, {flag: 'wx'}, (err) =>{  
                    if(err?.code === 'EEXIST' ){
                        console.log('writeFileAsync Error: file already exists',err);

                        const itrName = this.iterateFileName(`${directory}/${file.name}`);
                        this._fileSystem.writeFile(itrName,evt.target?.result,(err) =>{  
                            if(err){
                                console.log('writeFileAsync Iterate Error:',err);
                                reject(err);
                            }
                            resolve();
                        });
                    }else{
                        this._fileExistsMap.set(`${directory}/${file.name}`,0);
                        resolve();
                    }
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

    public iterateFileName(path:string):string{
        const extension = extname(path);
        const filename = basename(path, extension);

        let count = this._fileExistsMap.get(path) || 0;
        count = count + 1;
        this._fileExistsMap.set(path, count);

        return `${dirname(path)}/${filename} (${count})${extension}`;
    }

    public resetDirectoryFiles(){
        this._directoryFileEntires=[]
    }

    public bufferToUrl(buffer:Buffer):string{
       return URL.createObjectURL(new Blob([new Uint8Array(buffer)]));
    }

    public uint8ToBase64(arr:Uint8Array):string{
        const base64String = btoa(String.fromCharCode(...new Uint8Array(arr)));
        return base64String;
    }
}
