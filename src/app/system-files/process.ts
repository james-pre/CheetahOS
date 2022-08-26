export class Process{

    private _processId:number;
    private _processName:string;
    private _icon:string;
    private _hasWindow:boolean
    private _type:string

    constructor(processId:number, processName:string, icon:string, hasWindow:boolean, type:string){
        this._processId = processId;
        this._processName = processName
        this._icon = icon;
        this._hasWindow = hasWindow
        this._type = type
    }

    public get getProcessId(){
        return this._processId
    }

    public get getProcessName(){
        return this._processName
    }

    get getIcon(){
        return this._icon
    }

    public get getHasWindow(){
        return this._hasWindow
    }

    public get getType(){
        return this._type
    }
}