export class FileInfo{
    private _icon:string;
    private _path:string;
    private _fileType:string;
    private _shortUrl:string;
    private _opensWith:string;


    constructor(){
        this._icon = '';
        this._path = '';
        this._fileType = '';
        this._shortUrl = '';
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

    get getShortUrl(){
        return this._shortUrl;
    }
    set setShortUrl(shortUrl:string){
        this._shortUrl = shortUrl
    }

    get getOpensWith(){
        return this._opensWith;
    }
    set setOpensWith(opensWith:string){
        this._opensWith = opensWith
    }
}