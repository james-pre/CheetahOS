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
  
  runningProcess:Process[] = []

  hasWindow = false;
  icon = '';
  name = 'taskbarentry';
  processId = 0;
  type = ComponentType.systemComponent

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
      this.runningProcess = this._runningProcessService.getProcesses().filter(p => p.getHasWindow == true);
      //console.log('processs:',this.runningProcess) TBD
    }, 1500);
    //.filter(p => p.getType == ComponentType.userComponent); TBD
    //console.log('count of proc:', this._runningProcessService.processCount()) //TBD
  }

  ngOnDestroy(): void {
    this._processListChangeSub?.unsubscribe();
  }

  updateRunningProcess(){
    this.runningProcess = this._runningProcessService.getProcesses().filter(p => p.getHasWindow == true);
    //console.log('updated count of proc:', this._runningProcessService.processCount()) TBD
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
