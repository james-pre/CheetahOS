export class AppDirectory {

    private _systemProcessList: string[];
    private _userProcessList: string[];

    constructor(){
        this._systemProcessList = this.fetchSystemApp();
        this._userProcessList = this.fetchUserApp();
    }

    appExist(appName:string):boolean{
        const strString = appName.trim();
        return (this._systemProcessList.includes(strString) || this._userProcessList.includes(strString))
    }


    private fetchSystemApp(): string[]{
        this._systemProcessList = ['file explorer'];
        return this._systemProcessList;
    }

    private fetchUserApp(): string[]{
        this._userProcessList = ['Hello'];
        return this._userProcessList;
    }
} 