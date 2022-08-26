import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ProcessIDServoce{

    private _activeProcessIds: number[];

    constructor(){
        this._activeProcessIds = []
     }

    public getNewProcessId(): number{
        let pid = 0;
        pid = this.generateProcessId();

        while(this._activeProcessIds.includes(pid))
                pid = this.generateProcessId();

        this._activeProcessIds.push(pid);
        return pid;
    }

    private generateProcessId(): number{
       const min = Math.ceil(1000);
       const max = Math.floor(9999);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    public removeProcessId(pid:number):void{
        
       const pidIndex = this._activeProcessIds.indexOf(pid)
       const deleteCount = 1;

       if (pidIndex !== -1) {
            this._activeProcessIds.splice(pidIndex, deleteCount);
        }
    }

    public processCount():number{
        return this._activeProcessIds.length;
    }
}