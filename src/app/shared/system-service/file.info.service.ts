import { Injectable } from "@angular/core";
import { FileInfo } from "src/app/system-files/fileinfo";
import { ShortCut } from "src/app/system-files/shortcut";
import { FileSystemService } from "./file.system.service";
import {extname} from 'path';
import { Constants } from "src/app/system-files/constants";
import { FSModule } from "browserfs/dist/node/core/FS";
import ini from 'ini';

@Injectable({
    providedIn: 'root'
})


export class FileInfoService{

    private _fileInfo!:FileInfo;
    private _fileSystemService: FileSystemService;
    private _consts:Constants = new Constants();
    private _fs!:FSModule;

    constructor(fileSystemService:FileSystemService){
        this._fileSystemService = fileSystemService;
        this._fs = this._fileSystemService.getFileSystem;
    }

    public getFileInfo(path:string){
        const extension = extname(path)
        this._fileInfo = new FileInfo()

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

    }

    public getShortCut(path: string):ShortCut {

        this._fs?.readFile(path, function(err, contents) {
            if(err){
                console.log('Getting ShortCut Failed:', err)
            }
            const stage = contents? contents.toString(): Buffer.from('').toString();
            const shortCut = ini.parse(stage) as ShortCut
            console.log('Getting ShortCut Passed:', shortCut)
            return shortCut;
        });

        console.log('Getting ShortCut Failed:')
        return new ShortCut('','')
    }
}


