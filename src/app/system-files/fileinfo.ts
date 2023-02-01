export class FileInfo{
    private _icon:string;
    private _path:string;
    private _fileType:string;
    private _fileName:string;
    private _opensWith:string;


    constructor(){
        this._icon = '';
        this._path = '';
        this._fileType = '';
        this._fileName = '';
        this._opensWith = '';
    }

    get getIcon(){
        return this._icon;
    }
    set setIcon(icon:string){
        this._icon = icon;
    }

    get getPath(){
        return this._path;
    }
    set setPath(path:string){
         this._path = path;
    }

    get getFileType(){
        return this._fileType;
    }
    set setFileType(fileType:string){
        this._fileType = fileType
    }

    get getFileName(){
        return this._fileName;
    }
    set setFileName(fileName:string){
        this._fileName = fileName
    }

    get getOpensWith(){
        return this._opensWith;
    }
    set setOpensWith(opensWith:string){
        this._opensWith = opensWith
    }
}