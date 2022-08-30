import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Process } from "src/app/system-files/process";


@Injectable({
    providedIn: 'root'
})

export class RunningProcessService{

    private _runningProcesses:Process[]
    processListChange: Subject<void> = new Subject<void>();
    closeProcess: Subject<Process> = new Subject<Process>();

    constructor(){
        this._runningProcesses = []
    }

    addProcess(proccessToAdd:Process): void{
        this._runningProcesses.push(proccessToAdd)
    }

    removeProcess(proccessToRemove:Process): void{
        
        const procIndex = this._runningProcesses.findIndex((process) => {
            return process.getProcessId === proccessToRemove.getProcessId;
          });

        const deleteCount = 1;

        if(procIndex != -1){
            this._runningProcesses.splice(procIndex, deleteCount)
        }
    }

    getProcess(processId:number): Process{
        const process = this._runningProcesses.find((process) => {
            return process.getProcessId === processId;
        });

        return process || new Process(0,'','',false,'');
    }

    getProcesses(): Process[]{
        return this._runningProcesses;
    }

    processCount():number{
        return this._runningProcesses.length;
    }
}