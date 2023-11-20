export class ShortCut{
    private _iconFile:string;
    private _fileName:string;
    private _fileType:string;
    private _contentUrl:string;
    private _opensWith:string;

    constructor(IconFile:string, FileName:string, FileType:string, ContentUrl:string, OpensWith:string){
        this._iconFile = IconFile;
        this._fileName = FileName;
        this._fileType = FileType;
        this._contentUrl = ContentUrl;
        this._opensWith = OpensWith;
    }

    get getIconFile(){
        return this._iconFile;
    }
    set setFileIcon(iconFile:string){
        this._iconFile = iconFile;
    }

    get geFileName(){
        return this._fileName;
    }
    set setFileName(fileName:string){
        this._fileName = fileName
    }

    get getContentUrl(){
        return this._contentUrl;
    }
    set setContentUrl(contentUrl:string){
        this._contentUrl = contentUrl
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