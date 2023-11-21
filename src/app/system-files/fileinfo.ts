export class FileInfo{
    private _IconPath:string;
    private _currentPath:string;
    private _contentPath:string;
    private _fileType:string;
    private _fileName:string;
    private _opensWith:string;
    private _dateModified:Date;
    private _size:number;


    constructor(){
        this._IconPath = '';
        this._currentPath = '';
        this._contentPath = '';
        this._fileType = '';
        this._fileName = '';
        this._opensWith = '';
        this._dateModified = new Date('1990-01-01');
        this._size = 0;
    }

    get getIconPath(){
        return this._IconPath;
    }
    set setIconPath(iconPath:string){
        this._IconPath = iconPath;
    }

    get getCurrentPath(){
        return this._currentPath;
    }
    set setCurrentPath(currentPath:string){
         this._currentPath = currentPath;
    }

    get getContentPath(){
        return this._contentPath;
    }
    set setContentPath(contentPath:string){
         this._contentPath = contentPath;
    }

    get getFileType(){
        return this._fileType;
    }
    set setFileType(fileType:string){
        this._fileType = fileType;
    }

    get getFileName(){
        return this._fileName;
    }
    set setFileName(fileName:string){
        this._fileName = fileName;
    }

    get getOpensWith(){
        return this._opensWith;
    }
    set setOpensWith(opensWith:string){
        this._opensWith = opensWith;
    }

    get getDateModified(){
        return this._dateModified;
    }
    set setDateModified(dateModified:any){

        if(typeof dateModified === "string")
            this._dateModified = new Date(dateModified);
        else{
            this._dateModified = dateModified
        }
    }

    get getSize(){
        return this._size;
    }
    set setSize(size:number){
        this._size = size;
    }
}