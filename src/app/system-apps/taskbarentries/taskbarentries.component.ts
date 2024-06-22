import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/shared/system-service/menu.services';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { Process } from 'src/app/system-files/process';

@Component({
  selector: 'cos-taskbarentries',
  templateUrl: './taskbarentries.component.html',
  styleUrls: ['./taskbarentries.component.css']
})
export class TaskbarentriesComponent implements AfterViewInit, OnDestroy {

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _triggerProcessService:TriggerProcessService;
  private _menuService:MenuService;
  private _processListChangeSub!: Subscription;
  private _addIconToTaskbarSub!: Subscription;
  private _removeIconFromTaskbarSub!: Subscription;
  private prevOpenedProccesses:string[]= [];
  
  runningProcess:Process[] = [];
  pinToTaskBarList:FileInfo[] = [];

  pinToTaskBarList1 = [
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
  appProcessId = 0;

  constructor(processIdService:ProcessIDService,runningProcessService:RunningProcessService, menuService:MenuService,
              triggerProcessService:TriggerProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._triggerProcessService = triggerProcessService;
    this._menuService = menuService;

    this.processId = this._processIdService.getNewProcessId();
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._processListChangeSub = this._runningProcessService.processListChangeNotify.subscribe(() =>{this.updateRunningProcess()});
    this._addIconToTaskbarSub = this._menuService.pinToTaskBar.subscribe((p)=>{this.pinIconToTaskBarList(p)});
    this._removeIconFromTaskbarSub = this._menuService.unPinToTaskBar.subscribe((p)=>{this.unPinIconToTaskBarList(p)});
  }
  
  ngAfterViewInit(): void {
    //change detection is the better solution
    setTimeout(() => {
      this.runningProcess = this.filterProcesses();
    }, 1500);
  }

  ngOnDestroy(): void {
    this._processListChangeSub?.unsubscribe();
    this._addIconToTaskbarSub?.unsubscribe();
    this._removeIconFromTaskbarSub?.unsubscribe();
    
  }

  updateRunningProcess():void{
    this.runningProcess = this.filterProcesses();

    this.turnOffInActiveProccess();
  }

  pinIconToTaskBarList(file:FileInfo):void{
    if(!this.pinToTaskBarList.some(x => x.getOpensWith === file.getOpensWith))
        this.pinToTaskBarList.push(file);
  }

  unPinIconToTaskBarList(file:FileInfo):void{
    const deleteCount = 1;
    const procIndex = this.pinToTaskBarList.findIndex((pin) => {
        return pin.getOpensWith === file.getOpensWith;
      });

    if(procIndex != -1){
        this.pinToTaskBarList.splice(procIndex, deleteCount)
    }
  }

  filterProcesses():Process[]{
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
      if(this.pinToTaskBarList.some( i => i.getOpensWith === x.getProcessName)){
        this.appProcessId = x.getProcessId;
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

  storeHistory(arg:Process[]):void{
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
        liElemnt.style.borderBottomColor = 'hsl(207deg 100%  72% / 90%)';
      else
      liElemnt.style.borderBottomColor = 'transparent';
    }
  }

  onPinnedAppIconClick(file:FileInfo):void{
    // check if the give app is running
    // if it isn't running, then trigger it
    if(!this._runningProcessService.isProcessRunning(file.getOpensWith)){
      this._triggerProcessService.startApplication(file);
      return;
    }else{
      const process = this._runningProcessService.getProcesses().filter(x => x.getProcessName === file.getOpensWith);
      this._runningProcessService.restoreOrMinimizeWindowNotify.next(process[0].getProcessId);
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
