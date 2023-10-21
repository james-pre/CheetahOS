export class FileInfo{
    private _icon:string;
    private _currentpath:string;
    private _dataPath:string;
    private _fileType:string;
    private _fileName:string;
    private _opensWith:string;


    constructor(){
        this._icon = '';
        this._currentpath = '';
        this._dataPath = '';
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

    get getCurrentPath(){
        return this._currentpath;
    }
    set setCurrentPath(currentPath:string){
         this._currentpath = currentPath;
    }

    get getDataPath(){
        return this._dataPath;
    }
    set setDataPath(dataPath:string){
         this._dataPath = dataPath;
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