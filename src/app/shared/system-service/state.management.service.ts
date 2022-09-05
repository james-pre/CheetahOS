import {Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class StateManagmentService{

    private _sessionStateManagmentService:Map<number, any>; 
    
    constructor(){
        this._sessionStateManagmentService = new Map<number, any>();
    }

    addState(id:number, stateData:any): void{
        this._sessionStateManagmentService.set(id,stateData)
    }

    getState(id:number):any{
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