import {Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class StateManagmentService{

    static instance: StateManagmentService;
    private _sessionStateManagmentService:Map<number, unknown>; 
    
    constructor(){
        this._sessionStateManagmentService = new Map<number, unknown>();
        StateManagmentService.instance = this; //I added this to access the service from a class, not component
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
       if(this._sessionStateManagmentService.has(id))
            this._sessionStateManagmentService.delete(id)
    }

    getKeys():number[]{
        const keys:number[] = [];

        for(const key of this._sessionStateManagmentService.keys()){
            keys.push(key)
        }
        return keys;
    }

}