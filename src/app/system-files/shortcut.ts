export class ShortCut{
    private _iconFile:string;
    private _url:string;
    private _fileType:string;
    private _shortUrl:string;
    private _opensWith:string;

    constructor(IconFile:string, URL:string, FileType:string, ShortUrl:string, OpensWith:string){
        this._iconFile = IconFile;
        this._url = URL;
        this._fileType = FileType;
        this._shortUrl = ShortUrl;
        this._opensWith = OpensWith;
    }

    get getIconFile(){
        return this._iconFile;
    }
    set setFileIcon(iconFile:string){
        this._iconFile = iconFile;
    }

    get getUrl(){
        return this._url;
    }
    set setUrl(url:string){
        this._url = url
    }

    get getShortUrl(){
        return this._shortUrl;
    }
    set setShortUrl(shortUrl:string){
        this._shortUrl = shortUrl
    }

    get getFileType(){
        return this._fileType;
    }
    set setFileType(fileType:string){
        this._fileType = fileType
    }

    get getOpensWith(){
        return this._opensWith;
    }
    set setOpensWith(opensWith:string){
        this._opensWith = opensWith
    }

}