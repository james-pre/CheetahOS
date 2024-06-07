import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';

@Component({
  selector: 'cos-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements BaseComponent, OnDestroy {

  @ViewChild('ttag', {static: true}) ttag!: ElementRef;

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _maximizeWindowSub!: Subscription;

  hasWindow = true;
  icon = '/osdrive/icons/terminal-2_48.png';
  name = 'terminal';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = 'Terminal';

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;

    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail()); 
    this._maximizeWindowSub = this._runningProcessService.maximizeWindowNotify.subscribe(() =>{this.maximizeWindow();})
  }

  ngOnDestroy():void{
    this._maximizeWindowSub?.unsubscribe();
  }

  maximizeWindow():void{
    console.log('maximize');
    this.ttag.nativeElement.style.height = '1000px';
  }

  setTerminalWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }
}
