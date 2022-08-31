import { Component, EventEmitter, Output } from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';

@Component({
    selector:'cos-title',
  templateUrl: './title.component.html',
  styleUrls: ["./title.component.css"]
})

export class TitleComponent{

  @Output() closeBtnClicked: EventEmitter<Process> =new EventEmitter<Process>();
  private _processIdService;
  private _runningProcessService;


  hasWindow = true;
  icon = 'favicon.ico';
  name = 'hello';
  processId = 0;
  type = ComponentType.userComponent

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
  }

  onCloseBtnClick(): void {
    const pid = this.getComponentDetail().getProcessId;
    const pname = this.getComponentDetail().getProcessName;
    console.log('close evt triggered for pid:'+ pid +'----'+'pname:'+pname);
    this.closeBtnClicked.emit(this.getComponentDetail());
  }
   
  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}