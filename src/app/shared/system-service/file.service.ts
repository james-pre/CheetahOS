import { Injectable } from "@angular/core";
import { FileInfo } from "src/app/system-files/fileinfo";
import { ShortCut } from "src/app/system-files/shortcut";
import {extname, basename, resolve, dirname} from 'path';
import { Constants } from "src/app/system-files/constants";
import { FSModule } from "browserfs/dist/node/core/FS";
import { FileEntry } from 'src/app/system-files/fileentry';
import { FileMetaData } from "src/app/system-files/file.metadata";

import { Subject } from "rxjs";
import * as BrowserFS from 'browserfs';
import { Buffer } from 'buffer';
import osDriveFileSystemIndex from '../../../osdrive.json';
import ini  from 'ini';



@Injectable({
    providedIn: 'root'
})

export class FileService{

    static instace:FileService;
    private _fileInfo!:FileInfo;
    private _consts:Constants = new Constants();
    private _fileSystem!:FSModule;
    private _directoryFileEntires:FileEntry[]=[];
    private _fileExistsMap!:Map<string,number>; 
    dirFilesReadyNotify: Subject<void> = new Subject<void>();
    dirFilesUpdateNotify: Subject<void> = new Subject<void>();

    SECONDS_DELAY = 150;

    constructor(){ 
        this._fileExistsMap =  new Map<string, number>();
        FileService.instace = this;
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
            }, this.SECONDS_DELAY);
        });
    }

    public async getFileInfoAsync(path:string):Promise<FileInfo>{
        const extension = extname(path);
        this._fileInfo = new FileInfo();

        if(!extension){
            const sc = await this.getFolderAsync(path) as ShortCut;
            this._fileInfo.setIconPath = this.changeFolderIcon(sc.geFileName,sc.getIconPath);
            this._fileInfo.setCurrentPath = path;
            this._fileInfo.setFileType = sc.getFileType;
            this._fileInfo.setFileName = sc.geFileName;
            this._fileInfo.setOpensWith = sc.getOpensWith;
            this._fileInfo.setIsFile = false;
        }
        else{

            const fileMetaData = await this.getExtraFileMetaDataAsync(path) as FileMetaData;

            if(extension == '.url'){
                const sc = await this.getShortCutAsync(path) as ShortCut;
                this._fileInfo.setIconPath = sc.getIconPath;
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setContentPath = sc.getContentPath;
                this._fileInfo.setFileType = sc.getFileType;
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setOpensWith = sc.getOpensWith;
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
            }
             else if(this._consts.IMAGE_FILE_EXTENSIONS.includes(extension)){    
                const sc = await this.getImageFileB64DataUrlAsync(path) as ShortCut;
                this._fileInfo.setIconPath = sc.getIconPath;
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setContentPath = sc.getContentPath;
                this._fileInfo.setFileType = extension;
                this._fileInfo.setFileName = sc.geFileName;
                this._fileInfo.setOpensWith = 'photoviewer';
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
            }
            else if(this._consts.VIDEO_FILE_EXTENSIONS.includes(extension)){    
                const sc = await this.getImageFileB64DataUrlAsync(path) as ShortCut;
                this._fileInfo.setIconPath = '/osdrive/icons/video_file.ico';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setContentPath = sc.getContentPath;
                this._fileInfo.setFileType = extension;
                this._fileInfo.setFileName = sc.geFileName;
                this._fileInfo.setOpensWith = 'videoplayer';
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
            }else if(this._consts.AUDIO_FILE_EXTENSIONS.includes(extension)){    
                const sc = await this.getImageFileB64DataUrlAsync(path) as ShortCut;
                this._fileInfo.setIconPath = '/osdrive/icons/music_file.ico';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setContentPath = sc.getContentPath;
                this._fileInfo.setFileType = extension;
                this._fileInfo.setFileName = sc.geFileName;
                this._fileInfo.setOpensWith = 'audioplayer';
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
            }else if(extension == '.txt' || extension == '.properties'){
                this._fileInfo.setIconPath = '/osdrive/icons/file.ico';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setFileType = extname(path);
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setOpensWith = 'texteditor';
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
            }else if(extension == '.md'){
                this._fileInfo.setIconPath = '/osdrive/icons/markdown-file_50.png';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setFileType = extname(path);
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setOpensWith = 'markdownviewer';
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
            }else if(extension == '.jsdos'){
                this._fileInfo.setIconPath = '/osdrive/icons/emulator-2.png';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setFileType = extname(path);
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setOpensWith = 'jsdos';
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
            }
            else if(extension == '.swf'){
                this._fileInfo.setIconPath = '/osdrive/icons/flash_67.png';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setFileType = extname(path);
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setOpensWith = 'ruffle';
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
            }
             else{
                this._fileInfo.setIconPath='/osdrive/icons/unknown.ico';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
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
                const isDirectory = stats? stats.isDirectory() : false
                const iconFile = `/osdrive/icons/${isDirectory ? 'folder.ico' : 'unknown.ico'}`
                const fileType = 'folder';
                const opensWith ='fileexplorer'
                resolve(new ShortCut(iconFile, basename(path, extname(path)),fileType,basename(path, extname(path)) ,opensWith ));
            });
        });
    }

    public async createFolderAsync(directory:string, fileName:string):Promise<void>{
        new Promise<void>((resolve, reject) =>{

           this._fileSystem.exists(`${directory}/${fileName}`, (err) =>{
                if(err){
                    console.log('createFolderAsync Error: folder already exists',err);
                }else{
                    this._fileSystem.mkdir(`${directory}/${fileName}`,'0777',(err) =>{  
                        if(err){
                            console.log('createFolderAsync Error: folder creation',err);
                            reject(err);
                        }
                        resolve();
                    });
                }
             });
        }).then(()=>{
            //Send update notification
            this.dirFilesUpdateNotify.next();
        });
    }

    public async renameFolderAsync(directory:string, oldfileName:string, newFileName:string):Promise<void>{
        new Promise<void>((resolve, reject) =>{

           this._fileSystem.exists(`${directory}/${newFileName}`, (err) =>{
                if(err){
                    console.log('renameFolderAsync Error: folder already exists',err);
                }else{
                    this._fileSystem.rename(`${directory}/${oldfileName}`,`${directory}/${newFileName}`,(err) =>{  
                        if(err){
                            console.log('renameFolderAsync Error: folder rename',err);
                            reject(err);
                        }
                        resolve();
                    });
                }
             });
        }).then(()=>{
            //Send update notification
            this.dirFilesUpdateNotify.next();
        });
    }

    public async deleteFolderAsync(directory:string, fileName:string):Promise<void>{
        new Promise<void>((resolve, reject) =>{
           this._fileSystem.exists(`${directory}/${fileName}`, (err) =>{
                if(err){
                    this._fileSystem.rmdir(`${directory}/${fileName}`,(err) =>{  
                        if(err){
                            console.log('deleteFolderAsync Error: folder delete failed',err);
                            reject(err);
                        }
                        resolve();
                    });
                }else{
                    console.log('deleteFolderAsync Error: folder doesn\'t exists',err);
                }
             });
        }).then(()=>{
            //Send update notification
            this.dirFilesUpdateNotify.next();
        });
    }

    public async getExtraFileMetaDataAsync(path: string) {
        await this.initBrowserFsAsync();

        return new Promise((resolve, reject) =>{
            this._fileSystem.stat(path,(err, stats) =>{
                if(err){
                    console.log('getExtraFileMetaDataAsync error:',err)
                    reject(err)
                }
                resolve(new FileMetaData(stats?.ctime, stats?.mtime, stats?.size));
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
                const shortCut = ini.parse(stage) as unknown || {InternetShortcut:{ FileName:'hi', IconPath:'', FileType:'',ContentPath:'', OpensWith:''}};
                if (typeof shortCut === 'object') {
                    const iSCut = (shortCut as {InternetShortcut:unknown})?.['InternetShortcut'];
                    const  fileName=  (iSCut as {FileName:unknown})?.['FileName'] as string;
                    const iconPath = (iSCut as {IconPath:unknown})?.['IconPath'] as string;
                    const fileType = (iSCut as {FileType:unknown})?.['FileType'] as string;
                    const contentPath = (iSCut as {ContentPath:unknown})?.['ContentPath'] as string;
                    const opensWith = (iSCut as {OpensWith:unknown})?.['OpensWith'] as string;
                    resolve(new ShortCut(iconPath,fileName,fileType,contentPath,opensWith));
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

                //console.log('stringData:', stringData.substring(0, 20));
                // if(stringData.includes('\x00') || stringData.includes('\u0000')){
                //     resolve(new ShortCut(path, basename(path, extname(path)),'',basename(path, extname(path)),''));
                // }

                const stringData = data as string

                if(this.isUtf8Encoded(stringData)){
                    if(stringData.substring(0, 10) == 'data:image'){
                        resolve(new ShortCut(stringData, basename(path, extname(path)),'',stringData,''));
                    }else{
                        resolve(new ShortCut(path, basename(path, extname(path)),'',basename(path, extname(path)),''));
                    }
                }else{
                    resolve(new ShortCut(stringData, basename(path, extname(path)),'',stringData,''));
                }
            });
        });
    }

    public async getFileAsync(path:string): Promise<string> {
        if (!path) {
            console.error('getFileAsync error: Path must not be empty');
            return Promise.reject(new Error('Path must not be empty'));
        }

        await this.initBrowserFsAsync();

        return new Promise((resolve, reject) =>{
            this._fileSystem.readFile(path,(err, contents = Buffer.from('')) =>{
                if(err){
                    console.log('getFileAsync error:',err)
                    reject(err);
                    return
                }

                contents = contents || new Uint8Array();
                const fileUrl = URL.createObjectURL(new Blob([new Uint8Array(contents)]))
                resolve(fileUrl);
            });
        });
    }

    public async writeFilesAsync(directory:string, files:File[]):Promise<void>{

        new Promise<void>((resolve, reject) =>{
            files.forEach((file)=>{
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
            })
         }).then(()=>{
            //Send update notification
            this.dirFilesUpdateNotify.next();
        });
    }

    public async writeFileAsync(directory:string, file:FileInfo):Promise<void>{
        new Promise<void>((resolve, reject) =>{
            this._fileSystem.writeFile(`${directory}/${file.getFileName}`, file.getContentPath, {flag: 'wx'}, (err) =>{  
                if(err?.code === 'EEXIST' ){
                    console.log('writeFileAsync Error: file already exists',err);

                    const itrName = this.iterateFileName(`${directory}/${file.getFileName}`);
                    this._fileSystem.writeFile(itrName,file.getContentPath,(err) =>{  
                        if(err){
                            console.log('writeFileAsync Iterate Error:',err);
                            reject(err);
                        }
                        resolve();
                    });
                }else{
                    this._fileExistsMap.set(`${directory}/${file.getFileName}`,0);
                    resolve();
                }
            });
         }).then(()=>{
            //Send update notification
            this.dirFilesUpdateNotify.next();
        });
    }

    public async renameFileAsync(path:string, newFileName:string): Promise<void> {
        await this.initBrowserFsAsync();

        new Promise((resolve, reject) =>{
            this._fileSystem.readFile(path,(err, contents = Buffer.from('')) =>{
                if(err){
                    console.log('getFile in renameFileAsync error:',err)
                    reject(err)
                }else{
                    this._fileSystem.writeFile(`${dirname(path)}/${newFileName}${extname(path)}`,contents,(err)=>{  
                        if(err){
                            console.log('writeFile in renameFileAsync error:',err);
                            reject(err);
                        }else{
                            this._fileSystem.unlink(path,(err) =>{
                                if(err){
                                    console.log('deleteFileAsync error:',err)
                                    reject(err)
                                }
                                resolve(console.log('successfully deleted'));
                            });
                            resolve(console.log('successfully renamed'));
                        }
                    });
                    resolve(console.log('successfully fetched'));
                }
            });
        });
    }

    public async deleteFileAsync(path:string): Promise<void> {
        await this.initBrowserFsAsync();

        new Promise((resolve, reject) =>{
            this._fileSystem.unlink(path,(err) =>{
                if(err){
                    console.log('deleteFileAsync error:',err)
                    reject(err)
                }
               
                resolve(console.log('successfully deleted'));
            });
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

    public isUtf8Encoded(data: string): boolean {
        try {
          const encoder = new TextEncoder();
          const bytes = encoder.encode(data);
          const decoder = new TextDecoder('utf-8', { fatal: true });
          decoder.decode(bytes);
          return true;
        } catch (error) {
          return false;
        }
      }

    public changeFolderIcon(fileName:string, iconPath:string):string{

        if(fileName === 'Music'){
            return '/osdrive/icons/music_folder.ico';
        }else if(fileName === 'Videos'){
            return '/osdrive/icons/video_folder.ico';

        }else if(fileName === 'Pictures'){
            return '/osdrive/icons/picture_folder.ico';
        }
        else if(fileName === 'Desktop'){
            return '/osdrive/icons/desktop_folder.ico';
        }
        else if(fileName === 'Documents'){
            return '/osdrive/icons/documents_folder.ico';
        }
        else if(fileName === 'Downloads'){
            return '/osdrive/icons/downloads_folder.ico';
        }

        return iconPath;
    }
}
