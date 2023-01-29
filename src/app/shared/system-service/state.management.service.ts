import {Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class StateManagmentService{

    private _sessionStateManagmentService:Map<number, unknown>; 
    
    constructor(){
        this._sessionStateManagmentService = new Map<number, unknown>();
    }

    addState(id:number, stateData:unknown): void{
        this._sessionStateManagmentService.set(id,stateData)
    }

    getState(id:number):unknown{
        const stateData = this._sessionStateManagmentService.get(id);
        return stateData;
    }

    hasState(id:number):boolean{

        return this._sessionStateManagmentService.has(id) ? true : false;
    }

    removeState(id:number ): void{
        this._sessionStateManagmentService.delete(id)
    }

}