import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Process } from "src/app/system-files/process";


@Injectable({
    providedIn: 'root'
})

export class RunningProcessService{

    static instance: RunningProcessService;
    private _runningProcesses:Process[];
    private _runningProcessesImages:Map<string, unknown[]>;
    private _eventOriginator = '';

    processListChangeNotify: Subject<void> = new Subject<void>();
    closeProcessNotify: Subject<Process> = new Subject<Process>();
    focusOnNextProcessNotify: Subject<void> = new Subject<void>();
    focusOnCurrentProcessNotify: Subject<number> = new Subject<number>();
    focusOutOtherProcessNotify: Subject<number> = new Subject<number>();
    restoreOrMinimizeWindowNotify: Subject<number> = new Subject<number>();
    maximizeWindowNotify: Subject<void> = new Subject<void>();
    showPreviewWindowNotify: Subject<unknown[]> = new Subject<unknown[]>();
    hidePreviewWindowNotify: Subject<void> = new Subject<void>();

    constructor(){
        this._runningProcesses = [];
        this._runningProcessesImages = new Map<string, unknown[]>();
        RunningProcessService.instance = this; //I added this to access the service from a class, not component
    }

    addProcess(proccessToAdd:Process):void{
        this._runningProcesses.push(proccessToAdd)
    }

    addProcessImage(appName:string, data:unknown[]):void{
        if(!this._runningProcessesImages.has(appName))
            this._runningProcessesImages.set(appName, data);
        else{
            const currImages = this._runningProcessesImages.get(appName)
            currImages?.push(data);
            this._runningProcessesImages.set(appName, data);
        }
    }

    addEventOriginator(eventOrig:string):void{
        this._eventOriginator = eventOrig;
    }

    removeProcess(proccessToRemove:Process):void{
        const deleteCount = 1;
        const procIndex = this._runningProcesses.findIndex((process) => {
            return process.getProcessId === proccessToRemove.getProcessId;
          });

        if(procIndex != -1){
            this._runningProcesses.splice(procIndex, deleteCount)
        }
    }

    removeProcessImages(appName:string):void{
        if(this._runningProcessesImages.has(appName))
            this._runningProcessesImages.delete(appName);
    }

    removeProcessImage(appName:string, pid:number):void{
        const deleteCount = 1;
        if(this._runningProcessesImages.has(appName)){
            const currImages = this._runningProcessesImages.get(appName) as [{pid:0, imageSrc:''}] 

            console.log('removeProcessImage - Did the cast work', currImages);

            const dataIndex = currImages.findIndex((d) => {
                return d.pid  === pid;
              });
    
            if(dataIndex != -1){
                currImages.splice(dataIndex, deleteCount)
            }
        }    
    }

    removeEventOriginator():void{
        this._eventOriginator = '';
    }

    getProcess(processId:number):Process{
        const process = this._runningProcesses.find((process) => {
            return process.getProcessId === processId;
        });

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return process!;
    }


    getProcessImages(appName:string):unknown[]{
        if(this._runningProcessesImages.has(appName))
           return this._runningProcessesImages.get(appName) ||  [{}];

        return [{}];
    }

    getEventOrginator():string{
        return this._eventOriginator;
    }

    isProcessRunning(appName:string):boolean{
        const process = this._runningProcesses.find((process) => {
            return process.getProcessName === appName;
        });

        if(process)
            return true;
        
        return false;
    }

    getProcesses():Process[]{
        return this._runningProcesses;
    }

    processCount():number{
        return this._runningProcesses.length;
    }
}