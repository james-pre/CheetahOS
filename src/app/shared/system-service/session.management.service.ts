import {Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SessionManagmentService{

    private sessionName = "main-session";
    private _sessionDataDict: Map<string, unknown>; 
    
    constructor(){
        if(sessionStorage.getItem(this.sessionName)){
            const sessData = sessionStorage.getItem(this.sessionName) as string;
            this._sessionDataDict = new Map(JSON.parse(sessData));
        }
        else{
            this._sessionDataDict = new  Map<string, unknown>();
        }
    }

    addSession(key:string, dataToAdd:unknown): void{

        this._sessionDataDict.set(key,dataToAdd)
        this.saveSession(this._sessionDataDict);
    }

    getSession(key:string):unknown{
        const stateData = this._sessionDataDict.get(key);
        return stateData;
    }

    removeSession(key:string): void{
        this._sessionDataDict.delete(key)
        this.saveSession(this._sessionDataDict);
    }

    resetSession(): void{
        this._sessionDataDict = new Map<string, unknown>;
        sessionStorage.clear()
    }

    private saveSession(sessionData:Map<string, unknown>){
        const data =  JSON.stringify(Array.from(sessionData.entries()));
        sessionStorage.setItem(this.sessionName, data);
    }
}