import { Injectable } from "@angular/core";
import { FileInfo } from "src/app/system-files/fileinfo";
import { ShortCut } from "src/app/system-files/shortcut";
import { FileSystemService } from "./file.system.service";
import {extname, basename, resolve} from 'path';
import { Constants } from "src/app/system-files/constants";
import { FSModule } from "browserfs/dist/node/core/FS";
import { FileEntry } from 'src/app/system-files/fileentry';
import ini from 'ini';

@Injectable({
    providedIn: 'root'
})

export class FileService{

    private _fileInfo!:FileInfo;
    private _fileSystemService: FileSystemService;
    private _consts:Constants = new Constants();
    private _fs!:FSModule;
    private _directoryFileEntires:FileEntry[]=[];

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
            this._fileInfo.setIcon='/icon/unkown.svg';
            this._fileInfo.setPath = '';
        }

        return this._fileInfo;
    }

    public getShortCut(path: string):ShortCut {

        this._fs.readFile(path, function(err, contents) {
            if(err){
                console.log('Getting ShortCut Failed:', err)
            }
            const stage = contents? contents.toString(): Buffer.from('').toString();
            const shortCut = ini.parse(stage) as ShortCut;
            console.log('Getting ShortCut Passed:', shortCut);
            return shortCut;
        });

        console.log('Getting ShortCut Failed:');
        return new ShortCut('','');
    }

    // public getFilesFromDirectory(dirPath:string):string[]{

    //     this._fs.readFile(dirPath, function(err, contents) {
    //         if(err){
    //             console.log('Getting Directory List:', err)
    //         }
    //         const stage = contents? contents.toString(): Buffer.from('').toString();
    //         const shortCut = ini.parse(stage) as ShortCut;
    //         console.log('Getting Directory List:', shortCut);
    //         return shortCut;
    //     });
    // }

    private getFilesFromDirectory(dirPath:string):string[]{
        
        this._fs.readdir(dirPath, function(err, contents = []) {
            if(err){
                console.log('Getting Directory List:', err)
            }
            return contents;
        });
        return [];
    }

    public getFileEntriesFromDirectory(directory:string):FileEntry[]{

        // remane to just fileservice
        const fileList = this.getFilesFromDirectory(directory);
    
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
