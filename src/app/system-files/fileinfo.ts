export class FileInfo{
    private _icon:string;
    private _pid:string;
    private _path:string;


    constructor(){
        this._icon = '';
        this._path = '';
        this._pid = '';
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

    get getPid(){
        return this._pid;
    }
    set setPid(pid:string){
        this._pid = pid
    }

}