import {Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SessionStateManagmentService{

    private sessionName = "main-session";
    private _sessionManagmentService: Map<string, any>; 
    
    constructor(){
        if(sessionStorage.getItem(this.sessionName) != undefined || sessionStorage.getItem(this.sessionName) != null){
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this._sessionManagmentService = JSON.parse(sessionStorage.getItem(this.sessionName)!) as  Map<string, any>
        }
        else{
            this._sessionManagmentService = new  Map<string, any>();
        }
    }

    addSession(key:string, sessToAdd:Map<string, any>): void{
        this._sessionManagmentService.set(key,sessToAdd)
    }

    getSession(key:string, stateToGet:string):any{
        const stateData = this._sessionManagmentService.get(key)?.get(stateToGet);
        return stateData;
    }

    removeSession(key:string, stateToRemove:string): void{
        this._sessionManagmentService.get(key)?.delete(stateToRemove);
    }

    abandonSession(): void{
        this._sessionManagmentService = new Map<string, any>;
         sessionStorage.clear()
    }

    saveSession(sessionData: Map<number, Map<string, any>>){
        sessionStorage.setItem(this.sessionName, JSON.stringify(sessionData));
        
    }
}