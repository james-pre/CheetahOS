import {Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SessionStateManagmentService{

    private _sessionStateManagmentService:Map<number, Map<string, any>>; 
    
    constructor(){
        this._sessionStateManagmentService = new Map<number, Map<string, any>>();
    }

    addState(processId:number, stateToAdd:Map<string, any>): void{
        this._sessionStateManagmentService.set(processId,stateToAdd)
    }

    getState(processId:number , stateToGet:string):any{

        const stateData = this._sessionStateManagmentService.get(processId)?.get(stateToGet);
   
        return stateData;
    }

    removeState(processId:number , stateToRemove:string): void{
        this._sessionStateManagmentService.get(processId)?.delete(stateToRemove);
    }

    abandonState(processId:number): void{
        this._sessionStateManagmentService.delete(processId)
    }


}