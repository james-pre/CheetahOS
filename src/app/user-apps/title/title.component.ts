import { Component, ElementRef, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

export class TitleComponent implements BaseComponent, OnDestroy, AfterViewInit{

  @ViewChild('ptag', {static: true}) ptag!: ElementRef;

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _maximizeWindowSub!: Subscription;

  hasWindow = true;
  icon = 'osdrive/Pictures/favicon_nice.png';
  name = 'hello';
  processId = 0;
  type = ComponentType.User;
  displayName = 'Hello';

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;

    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail()); 

    this._maximizeWindowSub = this._runningProcessService.maximizeWindowNotify.subscribe(() =>{this.maximizeWindow();})
  }


  ngAfterViewInit(): void {
    this.setTitleWindowToFocus(this.processId); 
  }

  ngOnDestroy():void{
    this._maximizeWindowSub?.unsubscribe();
  }

  maximizeWindow():void{
    const mainWindow = document.getElementById('vanta');
    this.ptag.nativeElement.style.height = `${mainWindow?.offsetHeight || 0 - 40}px`;
    this.ptag.nativeElement.style.width = `${mainWindow?.offsetWidth}px`;
  }

  setTitleWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}