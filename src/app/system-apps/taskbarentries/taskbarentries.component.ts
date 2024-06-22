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
  private prevOpenedProccesses:string[]= [];
  
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

    this.turnOffInActiveProccess();
  }

  private filterProcesses():Process[]{
    const uniqueProccesses = this.getUniqueProccess();
    const proccessesNotInPinToStart:Process[] = [];

    this.storeHistory(uniqueProccesses);
    /**
     * i have 2 lists of varying lengths
     * list one can have duplicates of the same object, but list 2 only has unique objects
     * compare both lists, if object.name from list1 equal to object.name from list 2
     * setIconToActive
     * else, put object in a different list
     */
    uniqueProccesses.filter(x =>{
      if(this.pinToStartList.some( i => i.appName === x.getProcessName)){
        this.setIconState(x.getProcessName,true);
      }else{
        proccessesNotInPinToStart.push(x);
      }
    });
  
    return proccessesNotInPinToStart;
  }

  getUniqueProccess():Process[]{
    const uniqueProccesses:Process[] = [];
    /**
     * filter first on processes that have windows
     * then select unique instance of process with same proccess name
     */
    this._runningProcessService.getProcesses()
      .filter(p => p.getHasWindow == true)
      .filter(x =>{
        if(!uniqueProccesses.some(a => a.getProcessName === x.getProcessName)){
          uniqueProccesses.push(x)
        }
    });

    return uniqueProccesses
  }

  private storeHistory(arg:Process[]):void{
    arg.filter(x =>{
      if(!this.prevOpenedProccesses.includes(x.getProcessName)){
        this.prevOpenedProccesses.push(x.getProcessName)
      }
    });
  }

  turnOffInActiveProccess():void{
    const runningProcess = this.getUniqueProccess();
    this.prevOpenedProccesses.filter(x =>{
      if(!runningProcess.some(i => i.getProcessName === x)){
        this.setIconState(x,false);
      }
    });
  }

  setIconState(appName:string, isActive:boolean){
    const liElemnt = document.getElementById(`tskbar-${appName}`) as HTMLElement;
    if(liElemnt){

      if(isActive)
        liElemnt.style.borderBottomColor = ' hsl(207deg 100%  72% / 90%)';
      else
      liElemnt.style.borderBottomColor = 'transparent';
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
