import { Component, OnDestroy } from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { Subscription } from 'rxjs';

@Component({
  selector:'cos-title',
  templateUrl: './title.component.html',
  // animations: [ hideRestoreAnimation],
  styleUrls: ["./title.component.css"]
})

export class TitleComponent implements BaseComponent, OnDestroy{

  private _processIdService;
  private _runningProcessService;
  private _windowHideNotify!: Subscription;


  hasWindow = true;
  icon = 'osdrive/picture/favicon.ico';
  name = 'hello';
  processId = 0;
  type = ComponentType.userComponent;
  displayName = 'Hello';

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;

    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail()); 
  }

  ngOnDestroy():void{
    this._windowHideNotify?.unsubscribe();
  }


  setTitleWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}