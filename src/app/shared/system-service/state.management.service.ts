import {Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class StateManagmentService{

    private _sessionStateManagmentService:Map<number, Map<string, any>>; 
    
    constructor(){
        this._sessionStateManagmentService = new Map<number, Map<string, any>>();
    }

    addState(id:number, stateToAdd:Map<string, any>): void{
        this._sessionStateManagmentService.set(id,stateToAdd)

    }

    getState(id:number , stateToGet:string):any{

        const stateData = this._sessionStateManagmentService.get(id)?.get(stateToGet);
   
        return stateData;
    }

    removeState(id:number , stateToRemove:string): void{
        this._sessionStateManagmentService.get(id)?.delete(stateToRemove);
    }

    abandonState(id:number): void{
        this._sessionStateManagmentService.delete(id)
    }

}