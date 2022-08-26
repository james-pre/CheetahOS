export class Process{

    private _processId:number;
    private _processName:string;
    private _icon:string;
    private _hasWindow:boolean

    constructor(processId:number, processName:string, icon:string, hasWindow:boolean){
        this._processId = processId;
        this._processName = processName
        this._icon = icon;
        this._hasWindow = hasWindow
    }

    get getProcessId(){
        return this._processId
    }

    get getProcessName(){
        return this._processName
    }

    get getIcon(){
        return this._icon
    }

    get getHasWindow(){
        return this._hasWindow
    }
}