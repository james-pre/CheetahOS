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
    private _eventOriginator = '';

    dirFilesReadyNotify: Subject<void> = new Subject<void>();
    dirFilesUpdateNotify: Subject<void> = new Subject<void>();

    SECONDS_DELAY = 250;

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

    private changeFolderIcon(fileName:string, iconPath:string):string{

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

    public async checkIfDirectory(path: string):Promise<boolean> {
        await this.initBrowserFsAsync();

        return new Promise<boolean>((resolve, reject) =>{
            this._fileSystem.stat(path,(err, stats) =>{
                if(err){
                    console.log('checkIfDirectory error:',err)
                    reject(err)
                }
               
                const isDirectory = (stats)? stats.isDirectory(): false;
                resolve(isDirectory);
            });
        });
    }

    public async checkIfExistsAsync(dirPath:string):Promise<boolean>{
        await this.initBrowserFsAsync();
        return new Promise<boolean>((resolve) =>{
            this._fileSystem.exists(`${dirPath}`, (exits) =>{
                 if(exits){
                     console.log('checkIfExistsAsync :Already exists',exits);
                     resolve(true)
                 }else{
                    console.log('checkIfExistsAsync :Does not exists',exits);
                    resolve(false);
                 }
            });
        })
    }

    public async copyFileAsync(sourcepath:string, destinationpath:string):Promise<boolean>{
        await this.initBrowserFsAsync();

        const fileName = this.getFileName(sourcepath);
        return new Promise<boolean>((resolve, reject) =>{
             this._fileSystem.readFile(sourcepath,(err, contents = Buffer.from('')) =>{
                if(err){
                    console.log('copyFileAsync error:',err)
                    reject(false)
                }else{
                    this._fileSystem.writeFile(`${destinationpath}/${fileName}`, contents, {flag: 'wx'}, (err) =>{  
                        if(err?.code === 'EEXIST' ){
                            console.log('copyFileAsync Error: file already exists',err);
        
                            const itrName = this.iterateFileName(`${destinationpath}/${fileName}`);
                            this._fileSystem.writeFile(itrName,fileName,(err) =>{  
                                if(err){
                                    console.log('copyFileAsync Iterate Error:',err);
                                    reject(false);
                                }
                                resolve(true);
                            });
                        }else{
                            this._fileExistsMap.set(`${destinationpath}/${fileName}`,0);
                            resolve(true);
                        }
                    });
                }
            });
        });
    }


    public async copyFilesAsync(sourcepaths:string[], destinationpath:string):Promise<boolean>{
        await this.initBrowserFsAsync();

        return new Promise<boolean>((resolve, reject) =>{
            for(const sourcepath of sourcepaths){
                const fileName = this.getFileName(sourcepath);
                this._fileSystem.readFile(sourcepath,(err, contents = Buffer.from('')) =>{
                    if(err){
                        console.log('copyFilesAsync error:',err)
                        reject(false)
                    }else{
                        this._fileSystem.writeFile(`${destinationpath}/${fileName}`, contents, {flag: 'wx'}, (err) =>{  
                            if(err?.code === 'EEXIST' ){
                                console.log('copyFilesAsync Error: file already exists',err);
            
                                const itrName = this.iterateFileName(`${destinationpath}/${fileName}`);
                                this._fileSystem.writeFile(itrName,fileName,(err) =>{  
                                    if(err){
                                        console.log('copyFilesAsync Iterate Error:',err);
                                        reject(false);
                                    }
                                    resolve(true);
                                });
                            }else{
                                this._fileExistsMap.set(`${destinationpath}/${fileName}`,0);
                                resolve(true);
                            }
                        });
                    }
                });
            }
        });
    }

    public async createFolderAsync(directory:string, fileName:string):Promise<boolean>{
        await this.initBrowserFsAsync();
        return new Promise<boolean>((resolve, reject) =>{

           this._fileSystem.exists(`${directory}/${fileName}`, (exists) =>{
                if(exists){
                    console.log('createFolderAsync: folder already exists',exists);
                    resolve(false);
                }else{
                    this._fileSystem.mkdir(`${directory}/${fileName}`,0o777,(err) =>{  
                        if(err){
                            console.log('createFolderAsync Error: folder creation',err);
                            reject(false);
                        }
                        //this.dirFilesUpdateNotify.next();
                        resolve(true);
                    });
                }
            });
        })
    }

    public async deleteFolderAsync(directory:string, fileName:string):Promise<boolean>{
       return new Promise<boolean>((resolve, reject) =>{
           this._fileSystem.exists(`${directory}/${fileName}`, (err) =>{
                if(err){
                    this._fileSystem.rmdir(`${directory}/${fileName}`,(err) =>{  
                        if(err){
                            console.log('deleteFolderAsync Error: folder delete failed',err);
                            reject(false);
                        }
                        resolve(true);
                    });
                }else{
                    console.log('deleteFolderAsync Error: folder doesn\'t exists',err);
                }
            });
        })
    }

    public async deleteFileAsync(path:string): Promise<boolean> {
        await this.initBrowserFsAsync();

        return new Promise<boolean>((resolve, reject) =>{
            this._fileSystem.unlink(path,(err) =>{
                if(err){
                    console.log('deleteFileAsync error:',err)
                    reject(false)
                }
                resolve(true);
            });
        })
    }

    public async getExtraFileMetaDataAsync(path: string) {
        await this.initBrowserFsAsync();

        return new Promise((resolve, reject) =>{
            this._fileSystem.stat(path,(err, stats) =>{
                if(err){
                    console.log('getExtraFileMetaDataAsync error:',err)
                    reject(err)
                }
                resolve(new FileMetaData(stats?.ctime, stats?.mtime, stats?.size, stats?.mode));
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
                    reject(err)
                }else{
                    resolve(contents.toString('utf8'));
                }
            });
        });
    }

    public async getFileBlobAsync(path:string): Promise<string> {
        if (!path) {
            console.error('getFileBlobAsync error: Path must not be empty');
            return Promise.reject(new Error('Path must not be empty'));
        }

        await this.initBrowserFsAsync();

        return new Promise((resolve, reject) =>{
            this._fileSystem.readFile(path,(err, contents = Buffer.from('')) =>{
                if(err){
                    console.log('getFileBlobAsync error:',err)
                    reject(err);
                    return
                }

                contents = contents || new Uint8Array();
                const fileUrl = URL.createObjectURL(new Blob([new Uint8Array(contents)]))
                resolve(fileUrl);
            });
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

    public async getFilesPathsFromDirectoryAsync(dirPath:string):Promise<string[]>{
        await this.initBrowserFsAsync();

        return new Promise<string[]>((resolve, reject) => {
            const fs = this._fileSystem;
            const interval = setInterval(() => {
                fs.readdir(dirPath, function(err, files) {
                  if(err){
                      console.log("Oops! a boo boo happened, filesystem wasn't ready:", err);
                      reject([]);
                  }else{
                    clearInterval(interval);
                    resolve(files || []);
                  }
                });
            }, this.SECONDS_DELAY);
        });
    }

    private getFileName(path:string):string{
        return `${basename(path, extname(path))}${ extname(path)}`;
    }

    public async getFileInfoAsync(path:string):Promise<FileInfo>{
        const extension = extname(path);
        this._fileInfo = new FileInfo();

        if(!extension){
            const sc = await this.setFolderValuesAsync(path) as ShortCut;
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
                this._fileInfo.setMode = fileMetaData.getMode;
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
                this._fileInfo.setMode = fileMetaData.getMode;
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
                this._fileInfo.setMode = fileMetaData.getMode;
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
                this._fileInfo.setMode = fileMetaData.getMode;
            }else if(extension == '.txt' || extension == '.properties'){
                this._fileInfo.setIconPath = '/osdrive/icons/file.ico';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setFileType = extname(path);
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setOpensWith = 'texteditor';
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
                this._fileInfo.setMode = fileMetaData.getMode;
            }else if(extension == '.md'){
                this._fileInfo.setIconPath = '/osdrive/icons/markdown-file_50.png';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setFileType = extname(path);
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setOpensWith = 'markdownviewer';
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
                this._fileInfo.setMode = fileMetaData.getMode;
            }else if(extension == '.jsdos'){
                this._fileInfo.setIconPath = '/osdrive/icons/emulator-2.png';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setFileType = extname(path);
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setOpensWith = 'jsdos';
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
                this._fileInfo.setMode = fileMetaData.getMode;
            }
            else if(extension == '.swf'){
                this._fileInfo.setIconPath = '/osdrive/icons/flash_67.png';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setFileType = extname(path);
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setOpensWith = 'ruffle';
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
                this._fileInfo.setMode = fileMetaData.getMode;
            }
             else{
                this._fileInfo.setIconPath='/osdrive/icons/unknown.ico';
                this._fileInfo.setCurrentPath = path;
                this._fileInfo.setFileName = basename(path, extname(path));
                this._fileInfo.setDateModified = fileMetaData.getModifiedDate;
                this._fileInfo.setSize = fileMetaData.getSize;
                this._fileInfo.setMode = fileMetaData.getMode;
            }
        }
        return this._fileInfo;
    }
    
    public async getImageFileB64DataUrlAsync(path:string):Promise<ShortCut> {
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

    public async getShortCutAsync(path:string):Promise<ShortCut>{
        await this.initBrowserFsAsync();

        return new Promise<ShortCut>((resolve, reject) =>{
            this._fileSystem.readFile(path, function(err, contents = Buffer.from('')){
                if(err){
                    console.log('getShortCutAsync error:',err)
                    reject(new ShortCut('','','','',''));
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
            });
        });
    }

    public async writeFilesAsync(directory:string, files:File[]):Promise<boolean>{
        await this.initBrowserFsAsync();
        return new Promise<boolean>((resolve, reject) =>{
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
                                resolve(true);
                            });
                        }else{
                            this._fileExistsMap.set(`${directory}/${file.name}`,0);
                            resolve(true);
                        }
                    });
                }
            })
        });
    }

    public async writeFileAsync(directory:string, file:FileInfo):Promise<boolean>{
        await this.initBrowserFsAsync();
        return new Promise<boolean>((resolve, reject) =>{
            this._fileSystem.writeFile(`${directory}/${file.getFileName}`, file.getContentPath, {flag: 'wx'}, (err) =>{  
                if(err?.code === 'EEXIST' ){
                    console.log('writeFileAsync Error: file already exists',err);

                    const itrName = this.iterateFileName(`${directory}/${file.getFileName}`);
                    this._fileSystem.writeFile(itrName,file.getContentPath,(err) =>{  
                        if(err){
                            console.log('writeFileAsync Iterate Error:',err);
                            reject(false);
                        }
                        resolve(true);
                    });
                }else{
                    this._fileExistsMap.set(`${directory}/${file.getFileName}`,0);
                    resolve(true);
                }
            });
        });
    }

    public async renameFolderAsync(directory:string, oldfileName:string, newFileName:string):Promise<boolean>{
        await this.initBrowserFsAsync();

        return new Promise<boolean>((resolve, reject) =>{
           this._fileSystem.exists(`${directory}/${newFileName}`, (err) =>{
                if(err){
                    console.log('renameFolderAsync Error: folder already exists',err);
                }else{
                    this._fileSystem.rename(`${directory}/${oldfileName}`,`${directory}/${newFileName}`,(err) =>{  
                        if(err){
                            console.log('renameFolderAsync Error: folder rename',err);
                            reject(false);
                        }
                        resolve(true);
                    });
                }
             });
        });
    }

    public async renameFileAsync(path:string, newFileName:string): Promise<boolean> {
        await this.initBrowserFsAsync();

       return new Promise<boolean>((resolve, reject) =>{
            this._fileSystem.readFile(path,(err, contents = Buffer.from('')) =>{
                if(err){
                    console.log('getFile in renameFileAsync error:',err)
                    reject(false)
                }else{
                    this._fileSystem.writeFile(`${dirname(path)}/${newFileName}${extname(path)}`,contents,(err)=>{  
                        if(err){
                            console.log('writeFile in renameFileAsync error:',err);
                            reject(false);
                        }else{
                            this._fileSystem.unlink(path,(err) =>{
                                if(err){
                                    console.log('unlink file error:',err)
                                    reject(err)
                                }
                                console.log('successfully unlinked')
                                resolve(true);
                            });
                            console.log('successfully renamed')
                            resolve(true);
                        }
                    });
                    console.log('successfully fetched')
                    resolve(true);
                }
            });
        });
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


    public async setFolderValuesAsync(path: string):Promise<ShortCut>{
        await this.initBrowserFsAsync();

        return new Promise<ShortCut>((resolve, reject) =>{
            this._fileSystem.stat(path,(err, stats) =>{
                if(err){
                    console.log('setFolderValuesAsync error:',err)
                    reject(new ShortCut('','','','',''));
                }

                const isDirectory = (stats)? stats.isDirectory(): false;
                const iconFile = `/osdrive/icons/${isDirectory ? 'folder.ico' : 'unknown.ico'}`
                const fileType = 'folder';
                const opensWith ='fileexplorer'
                resolve(new ShortCut(iconFile, basename(path, extname(path)),fileType,basename(path, extname(path)) ,opensWith ));
            });
        });
    }

    private bufferToUrl(buffer:Buffer):string{
       return URL.createObjectURL(new Blob([new Uint8Array(buffer)]));
    }

    private uint8ToBase64(arr:Uint8Array):string{
        const base64String = btoa(String.fromCharCode(...new Uint8Array(arr)));
        return base64String;
    }

    private isUtf8Encoded(data: string): boolean {
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

    addEventOriginator(eventOrig:string):void{
        this._eventOriginator = eventOrig;
    }

    getEventOrginator():string{
        return this._eventOriginator;
    }

    removeEventOriginator():void{
        this._eventOriginator = '';
    }
}
