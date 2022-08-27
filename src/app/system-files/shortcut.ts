export class ShortCut{
    private _iconFile:string;
    private _url:string;

    constructor(iconFile:string, url:string){
        this._iconFile = iconFile;
        this._url = url;
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

}