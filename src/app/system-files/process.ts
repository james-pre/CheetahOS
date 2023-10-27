export class Process{

    private _processId:number;
    private _processName:string;
    private _icon:string;
    private _hasWindow:boolean;
    private _type:string;
    private _cpuUsage:number;
    private _memoryUsage:number;
    private _processTrigger:unknown;

    constructor(processId:number, processName:string, icon:string, hasWindow:boolean, type:string, processTrigger?:unknown){
        this._processId = processId;
        this._processName = processName;
        this._icon = icon;
        this._hasWindow = hasWindow;
        this._type = type;
        this._processTrigger = processTrigger || null;
        this._cpuUsage = 0;
        this._memoryUsage = 2;
    }

    public get getProcessId(){
        return this._processId;
    }

    public get getProcessName(){
        return this._processName;
    }

    public get getIcon(){
        return this._icon;
    }

    public get getCpuUsage(){
        return this._cpuUsage;
    }

    public get getMemoryUsage(){
        return this._memoryUsage;
    }

    public get getHasWindow(){
        return this._hasWindow;
    }

    public get getType(){
        return this._type;
    }

    public get getProcessTrigger(){
        return this._processTrigger;
    }

    public set setCpuUsage(cpuUage:number){
        this._cpuUsage = cpuUage;
    }
    
    public set setMemoryUsage(memoryUsage:number){
        this._memoryUsage = memoryUsage;
    }
}