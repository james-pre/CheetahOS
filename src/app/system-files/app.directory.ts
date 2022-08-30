export class AppDirectory {

    private _systemProcessList: string[];
    private _userProcessList: string[];

    constructor(){
        this._systemProcessList = this.fetchSystemApp();
        this._userProcessList = this.fetchUserApp();
    }

    appExist(appName:string):boolean{
        return (this._systemProcessList.includes(appName) || this._userProcessList.includes(appName))
    }


    private fetchSystemApp(): string[]{
        this._systemProcessList = ['file explorer'];
        return this._systemProcessList;
    }

    private fetchUserApp(): string[]{
        this._userProcessList = ['hello'];
        return this._userProcessList;
    }
} 