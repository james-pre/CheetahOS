export class AppDirectory {

    private _systemProcessList: string[];
    private _userProcessList: string[];
    private _processList: string[] = [];

    constructor(){
        this._systemProcessList = this.fetchSystemApp();
        this._userProcessList = this.fetchUserApp();
        this.createAppsList();
    }

    appExist(appName:string):boolean{
        const strString = appName.trim();
        return (this._systemProcessList.includes(strString) || this._userProcessList.includes(strString))
    }

    private fetchSystemApp(): string[]{
        this._systemProcessList = ['audioplayer', 'fileexplorer','taskmanager','terminal','videoplayer'];
        return this._systemProcessList;
    }

    private fetchUserApp(): string[]{
        this._userProcessList = ['hello','greeting', 'jsdos'];
        return this._userProcessList;
    }

    private createAppsList(): void{
        for (let i = 0; i < this._systemProcessList.length; i++) {
            this._processList.push(this._systemProcessList[i]);
        }

        for (let i = 0; i < this._userProcessList.length; i++) {
            this._processList.push(this._userProcessList[i]);
        }
    }

    public getAppPosition(appName:string):number{
        const appPosition = this._processList.indexOf(appName)
        return appPosition
    }
} 