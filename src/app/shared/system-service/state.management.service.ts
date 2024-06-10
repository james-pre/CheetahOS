import {Injectable } from "@angular/core";
import { AppState, BaseState, WindowState } from "src/app/system-files/state/state.interface";
import { StateType } from "src/app/system-files/state/state.type";
import { SessionManagmentService } from "./session.management.service";
@Injectable({
    providedIn: 'root'
})

export class StateManagmentService{

    static instance: StateManagmentService;
    private _appStateManagmentService:Map<number, unknown>;  
    private _sessionManagmentService: SessionManagmentService 
    
    constructor(){
        this._appStateManagmentService = new Map<number, unknown>();
        StateManagmentService.instance = this; //I added this to access the service from a class, not component
        this._sessionManagmentService = SessionManagmentService.instance;
    }

    /**
     * 
     * @param pid 
     * @param stateData 
     * @param type 
     * 
     * addState perform the dual role of adding a new entry or updating an existing entry
     */
    addState(pid:number, stateData:unknown, type?:StateType):void{

        console.log(`pid:${pid} type:${type}`);
        if(type !== undefined){
            if(this._appStateManagmentService.has(pid)){
                const currStateData = this._appStateManagmentService.get(pid) as BaseState[];
                if(type == StateType.App){
                    currStateData[StateType.App] = stateData as AppState;
                }else{
                    currStateData[StateType.Window] = stateData as WindowState;
                }
                this._sessionManagmentService.addSession(String(pid), currStateData);
            }else{
                const appState:AppState={pid:0, app_data:'', app_name:'', unique_id:''}
                const windowState:WindowState={pid:0, x_axis:0, y_axis:0, height:0, width:0, z_index:0, is_visible:true}
                let state:BaseState[] = [];
    
                if(type == StateType.App){
                    state = [stateData as AppState, windowState];
                }else{
                    state= [appState, stateData as WindowState];
                }
    
                this._appStateManagmentService.set(pid,state);
                this._sessionManagmentService.addSession(String(pid), state);
            }
        }else{
            this._appStateManagmentService.set(pid,stateData)
        }
    }

    /**
     * 
     * @param pid 
     * @param type 
     * @returns 
     * 
     * returns exisiting state data.
     * if a type value is passed, the it will return either a Window or App State
     */
    getState(pid:number, type?:StateType):unknown{
        
        if(type !== undefined){
            const stateData = this._appStateManagmentService.get(pid) as BaseState[];

            if(stateData){
                if(type == StateType.App)
                    return stateData[StateType.App];
                else
                    return stateData[StateType.Window];
            }
            return stateData
        }else{
            const stateData = this._appStateManagmentService.get(pid);
            return stateData;
        }
    }

    /**
     * 
     * @param pid 
     * @returns 
     * return a true/false value when checking for a state
     */
    hasState(pid:number):boolean{
        return this._appStateManagmentService.has(pid) ? true : false;
    }

    /**
     * 
     * @param pid 
     * remove an existing state
     */
    removeState(pid:number): void{
       if(this._appStateManagmentService.has(pid))
            this._appStateManagmentService.delete(pid)
    }

    getKeys():number[]{
        const keys:number[] = [];

        for(const key of this._appStateManagmentService.keys()){
            keys.push(key)
        }
        return keys;
    }

}