import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { RunningProcessService } from "./running.process.service";
import { AppDirectory } from "src/app/system-files/app.directory";

@Injectable({
    providedIn: 'root'
})

export class StartProcessService{

    private _runningProcessService:RunningProcessService;
    private _appDirectory:AppDirectory;

    startProcessNotify: Subject<string> = new Subject<string>();
    appNotFoundNotify: Subject<string> = new Subject<string>();
    appIsRunningNotify: Subject<string> = new Subject<string>();

    constructor(runningProcessService:RunningProcessService){
        this._runningProcessService = runningProcessService;
        this._appDirectory = new AppDirectory();
    }


    startApplication(appName:string):void{

        if(this._appDirectory.appExist(appName)){

            if(!this._runningProcessService.isProcessRunning(appName)){
                this.startProcessNotify.next(appName);
                return
            }
            this.appNotFoundNotify.next(appName);
            return;
        }
        this.appNotFoundNotify.next(appName);
        return;
    }

}