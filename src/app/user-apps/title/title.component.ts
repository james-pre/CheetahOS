import { Component, EventEmitter, Output } from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';

@Component({
    selector:'cos-title',
  templateUrl: './title.component.html',
  styleUrls: ["./title.component.css"]
})

export class TitleComponent implements BaseComponent{

  @Output() closeBtnClicked: EventEmitter<Process> =new EventEmitter<Process>();
  private _processIdService;
  private _runningProcessService;


  hasWindow = true;
  icon = 'osdrive/picture/favicon.ico';
  name = 'Hello';
  processId = 0;
  type = ComponentType.userComponent;
  displayName = 'Hello';

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}