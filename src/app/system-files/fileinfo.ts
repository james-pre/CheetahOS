export class FileInfo{
    private _IconPath:string;
    private _currentPath:string;
    private _contentPath:string;
    private _fileType:string;
    private _fileName:string;
    private _opensWith:string;
    private _dateModified:Date;
    private _size:number;
    private _isFile:boolean;
    private _fileSizeUnit:string;


    constructor(){
        this._IconPath = '';
        this._currentPath = '';
        this._contentPath = '';
        this._fileType = '';
        this._fileName = '';
        this._opensWith = '';
        this._dateModified = new Date('1990-01-01');
        this._size = 0;
        this._isFile = true;
        this._fileSizeUnit = 'B';
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

    get getFileNameShort(){
        if(this._fileName.length > 10)
           return (this._fileName.length > 10)
            ? this._fileName.substring(0, 9) + '..' : this._fileName;

        return '';
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

    get getDateModifiedUS(){
        return this._dateModified.toLocaleString("en-US");
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

    get getSize1(){
        let  tmpSize = 0

        if(this._size >= 0 && this._size <= 999){
            tmpSize = this._size;
        }

        if(this._size >= 1000 && this._size <= 999999){
            tmpSize= Math.round((this._size/1000) * 100) /100;
        }

        if(this._size >= 1000000 && this._size <= 999999999){
            tmpSize = Math.round((this._size/1000000) * 100) / 100;
        }

        return tmpSize;
    }
    set setSize(size:number){
        this._size = size;
    }

    get getIsFile(){
        return this._isFile;
    }
    set setIsFile(isFile:boolean){
        this._isFile = isFile;
    }

    get getFileSizeUnit(){

        if( this._size >= 0 && this._size <= 999){
            this._fileSizeUnit = 'B';
        }

        if( this._size >= 1000 && this._size <= 999999){
            this._fileSizeUnit = 'KB';
        }

        if( this._size >= 1000000 && this._size <= 999999999){
            this._fileSizeUnit = 'MB';
        }

        return this._fileSizeUnit;
    }
}