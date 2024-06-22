import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';

@Component({
  selector: 'cos-taskbarentries',
  templateUrl: './taskbarentries.component.html',
  styleUrls: ['./taskbarentries.component.css']
})
export class TaskbarentriesComponent implements AfterViewInit, OnDestroy {

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _processListChangeSub!: Subscription;
  
  runningProcess:Process[] = [];
  pinToStartList = [
     {icon:'osdrive/icons/file_explorer.png', appName:'fileexplorer'},
     {icon:'/osdrive/icons/terminal_48.png', appName:'terminal'},
     {icon:'/osdrive/icons/text-editor_48.png', appName:'texteditor'}];

  hover = false;
  hasWindow = false;
  icon = 'osdrive/icons/generic-program.ico';
  name = 'taskbarentry';
  processId = 0;
  type = ComponentType.System;
  displayName = '';

  constructor(processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._processListChangeSub = this._runningProcessService.processListChangeNotify.subscribe(() =>{this.updateRunningProcess();})
  }
  
  ngAfterViewInit(): void {
    //change detection is the better solution
    setTimeout(() => {
      this.runningProcess = this.filterProcesses();
      //console.log('processs:',this.runningProcess) TBD
    }, 1500);
    //.filter(p => p.getType == ComponentType.userComponent); TBD
    //console.log('count of proc:', this._runningProcessService.processCount()) //TBD
  }

  ngOnDestroy(): void {
    this._processListChangeSub?.unsubscribe();
  }

  updateRunningProcess():void{
    this.runningProcess = this.filterProcesses();
  }

  private filterProcesses():Process[]{

    /**
     * filter first on processes that have windows
     * then select unique instance of process with same proccess name
     */
    // const processWithWindows = this._runningProcessService.getProcesses().filter(p => p.getHasWindow == true);
    // const ids = processWithWindows.map(p => p.getProcessName);
    // return processWithWindows.filter(({getProcessName}, index) => !ids.includes(getProcessName, index + 1))

    const uniqueProccesses:Process[] = [];
    const proccessesNotInPinToStart:Process[] = [];
    const processWithWindows = this._runningProcessService.getProcesses().filter(p => p.getHasWindow == true);
    
    for(let i = 0; i <= processWithWindows.length - 1; i++){
      //if one object with matching processname isn't found, then add it
      if(!uniqueProccesses.some( x => x.getProcessName === processWithWindows[i].getProcessName)){
        uniqueProccesses.push(processWithWindows[i]);
      }
    }

    /**
     * i have 2 lists of varying lenght containing the same type of object
     * list one can have duplicates of the same object, but list 2 only has unique objects
     * compare both lists if object.name from list equal to object.name from list 2
     * print these objects match
     */


    // compare the filteredProcess list against the pinToStar List

    for(let i = 0; i <= uniqueProccesses.length -1; i++){

      if(this.pinToStartList.some( x => x.appName === uniqueProccesses[i].getProcessName)){

        this.setIconToActive(uniqueProccesses[i].getProcessName)
      }else{
        proccessesNotInPinToStart.push(uniqueProccesses[i]);
      }

    }
   
    return proccessesNotInPinToStart;
  }

  private setIconToActive(appName:string){

    const liElemnt = document.getElementById(`tskbar-${appName}`) as HTMLElement;

    if(liElemnt){
      liElemnt.style.borderBottom = '2px solid hsl(207deg 100%  72% / 90%)';
    }
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

  restoreOrMinizeWindow(processId:number){
    //const theProcess = this._runningProcessService.getProcess(processId); TBD
    //console.log('close evt triggered for pid:'+ theProcess.getProcessId +'----'+'pname:'+theProcess.getProcessName); //TBD
    this._runningProcessService.restoreOrMinimizeWindowNotify.next(processId)
  }

}
