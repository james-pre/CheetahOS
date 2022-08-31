import { Injectable } from "@angular/core";
import { FileInfo } from "src/app/system-files/fileinfo";
import { ShortCut } from "src/app/system-files/shortcut";
import { FileSystemService } from "./file.system.service";
import {extname, basename, resolve} from 'path';
import { Constants } from "src/app/system-files/constants";
import { FSModule } from "browserfs/dist/node/core/FS";
import { FileEntry } from 'src/app/system-files/fileentry';
import { Subject } from "rxjs";
import ini from 'ini';

@Injectable({
    providedIn: 'root'
})

export class FileService{

    private _fileInfo!:FileInfo;
    private _fileSystemService: FileSystemService;
    private _consts:Constants = new Constants();
    private _fs!:FSModule;
    private _directoryFile:string[]=[];
    private _directoryFileEntires:FileEntry[]=[];
    dirFilesReadyNotify: Subject<void> = new Subject<void>();
    filesEntriesReadyNotify: Subject<void> = new Subject<void>();

    constructor(fileSystemService:FileSystemService){
        this._fileSystemService = fileSystemService;
        this._fs = this._fileSystemService.getFileSystem;
    }

    public getFileInfo(path:string):FileInfo{
        const extension = extname(path);
        this._fileInfo = new FileInfo();

        if(extension == '.url'){
           const sc = this.getShortCut(path);
           this._fileInfo.setIcon = sc.getIconFile;
           this._fileInfo.setPath = sc.getUrl;
        }
        else if(this._consts.IMAGE_FILE_EXTENSIONS.includes(extension)){    
            this._fileInfo.setIcon='fdfd';
            this._fileInfo.setPath = '';
        }else{
            this._fileInfo.setIcon='/favicon2.png';
            this._fileInfo.setPath = 'Test';
        }

        return this._fileInfo;
    }

    public getShortCut(path: string):ShortCut {

        const contents = this._fs.readFileSync(path);
        const stage = contents? contents.toString(): Buffer.from('').toString();
        const shortCut = ini.parse(stage) as unknown || {InternetShortcut:{ URL:'hi', IconFile:''}};
    
        if (typeof shortCut === 'object') {
           const iSCut = (shortCut as {InternetShortcut:unknown})?.['InternetShortcut'];
           const  url=  (iSCut as {URL:unknown})?.['URL'] as string;
           const iconFile = (iSCut as {IconFile:unknown})?.['IconFile'] as string;

           return  new ShortCut(iconFile,url);
        }

        return  new ShortCut('','');
    }


    public getShortCutAsync(path: string):ShortCut {

        this._fs.readFile(path, function(err, contents) {
            if(err){
                console.log('Getting ShortCut Failed:', err)
            }
            const stage = contents? contents.toString(): Buffer.from('').toString();
            //const shortCut = ini.parse(stage) as ShortCut;
            const shortCut = ini.parse(stage) as Map<string, string>;
            console.log('Getting ShortCut Passed:', shortCut);
            return shortCut;
        });

        console.log('Getting ShortCut Failed:');
        return new ShortCut('','');
    }


    public getFilesFromDirectory(dirPath:string){
        const fs = this._fs;

        // eslint-disable-next-line prefer-const
        let arr:string[] = [];

        new Promise(function(resolve) {
    
            const interval = setInterval(() => {
    
                fs.readdir(dirPath, function(err, contents = []) {
                  if(err){
                      console.log("Oops! a boo boo happened, filesystem wasn't ready:", err)
                  }else{
                    arr = contents
                    //console.log('this is content:',arr);
                    clearInterval(interval);
                    resolve(arr);
                  }
                });
    
            }, 50);
        }).then(()=>{
            //console.log("This is result:",arr)
            this._directoryFile = arr;
            //alert subscribers
            this.dirFilesReadyNotify.next();
        });
    
        //return res;
    }
    
    get directoryFiles(){
        return this._directoryFile;
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
}
