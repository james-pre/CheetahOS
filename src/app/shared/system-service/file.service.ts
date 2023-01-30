import { Injectable } from "@angular/core";
import { FileInfo } from "src/app/system-files/fileinfo";
import { ShortCut } from "src/app/system-files/shortcut";
import { FileSystemService } from "./file.system.service";
import {extname, basename, resolve} from 'path';
import { Constants } from "src/app/system-files/constants";
import { FSModule } from "browserfs/dist/node/core/FS";
import { FileEntry } from 'src/app/system-files/fileentry';
import { Subject } from "rxjs";
// import { Injectable } from "@angular/core";
import * as BrowserFS from 'browserfs';
// import { FSModule } from 'browserfs/dist/node/core/FS';
import osDriveFileSystemIndex from '../../../osdrive.json';
import ini from 'ini';
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})

export class FileService{

    private _fileInfo!:FileInfo;
    private _fileSystemService: FileSystemService;
    private _domSanitizer: DomSanitizer;
    private _consts:Constants = new Constants();
    private _fs!:FSModule;
    private _directoryFile:string[]=[];
    private _directoryFileEntires:FileEntry[]=[];
    dirFilesReadyNotify: Subject<void> = new Subject<void>();
    dirFilesUpdateNotify: Subject<void> = new Subject<void>();
    // filesEntriesReadyNotify: Subject<void> = new Subject<void>();

    constructor(fileSystemService:FileSystemService, domSanitizer:DomSanitizer){
        this._fileSystemService = fileSystemService;
        this._domSanitizer = domSanitizer
        //this._fs = this._fileSystemService.getFileSystemAsync()
    }

    get directoryFiles(){
        return this._directoryFile;
    }

    private async setupBrowserFs(){
        return new Promise<void>((resolve, reject) => {
            BrowserFS.configure({
                fs: "OverlayFS",
                options:{
                  readable:{
                    fs: 'XmlHttpRequest',
                    options:{
                      index:osDriveFileSystemIndex
                    }
                  },
                  writable:{
                    fs:"IndexedDB",
                    options: {
                      "storeName":"browserfs-cache"
                    }
                  }
                }
            },
              (e) =>{
                if(e){  
                    console.log('BFS Error:', e)
                    reject(e); 
                }
            });
            this._fs = BrowserFS.BFSRequire('fs')
            resolve();
        });
    }

    public async getFilesFromDirectoryAsync(dirPath:string){
        await this.setupBrowserFs()

        return new Promise((resolve, reject) => {
            const fs = this._fs;
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

            const sc = await this.getImageFileAsync(path) as ShortCut;
            this._fileInfo.setIcon = sc.getIconFile;
            this._fileInfo.setPath = sc.getUrl;

        }else{
            this._fileInfo.setIcon='/osdrive/icons/unknown.ico';
            this._fileInfo.setPath = basename(path, extname(path)) ;
        }

        return this._fileInfo;
    }



    public async getShortCutAsync(path: string) {

        await this.setupBrowserFs()

        return new Promise((resolve, reject) =>{

            this._fs.readFile(path, function(err, contents = Buffer.from('')){
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

    public async getImageFileAsync(path: string) {
        await this.setupBrowserFs()

        return new Promise((resolve, reject) =>{
            this._fs.readFile(path, function(err, contents = Buffer.from('')){
                if(err){
                    console.log('getImageFileAsync error:',err)
                    reject(err)
                }
                const imgData = URL.createObjectURL(new Blob([new Uint8Array(contents)]))
                resolve(new ShortCut(imgData, path));
            });
        });
    }

    public async writeFileAsync(directory:string, file:File){
 
        new Promise<void>((resolve) => {
            const fs = this._fs;
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = function(ev){
                console.log('ev')
                console.log('reader.onload:', ev.target?.result);
                fs.writeFile(
                    `${directory}/${file.name}`, 
                    ev.target?.result,
                    function(err){
                        if(err){
                            console.log('writeFileAsync:', err);
                        }
                        resolve();
                    }
                );
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
}
