import { Component, OnDestroy } from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { AnimationEvent } from '@angular/animations';
import { hideRestoreAnimation } from 'src/app/system-apps/window/animation/animations';
import { WindowAnimationService } from 'src/app/shared/system-service/window.animation.service';
import { Subscription } from 'rxjs';

@Component({
  selector:'cos-title',
  templateUrl: './title.component.html',
  animations: [ hideRestoreAnimation],
  styleUrls: ["./title.component.css"]
})

export class TitleComponent implements BaseComponent, OnDestroy{

  private _processIdService;
  private _runningProcessService;
  private _windowHideNotify!: Subscription;
  private _winAnimationSerice: WindowAnimationService;

  hasWindow = true;
  icon = 'osdrive/picture/favicon.ico';
  name = 'hello';
  processId = 0;
  type = ComponentType.userComponent;
  displayName = 'Hello';
  onOpen = true;
  HideShow = false;

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService, winAnimationSerice: WindowAnimationService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._winAnimationSerice = winAnimationSerice;

    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());

    this._windowHideNotify = this._winAnimationSerice.hideOrShowWindowNotify.subscribe(() =>{this.chnageHideShow()} )   
  }

  ngOnDestroy():void{
    this._windowHideNotify?.unsubscribe();
  }


  setTitleWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  chnageHideShow():void{
    /**
     * By default, hideshow is false, meaning that the page is visble. when hideshow is true, the page is hidden
     */
    this.HideShow = !this.HideShow;

    console.log("HideShow:",this.HideShow);
  }



  onAnimationEvent(event: AnimationEvent) {

    // openClose is trigger name in this example
    console.warn(`Animation Trigger: ${event.triggerName}`);

    // phaseName is "start" or "done"
    console.warn(`Phase: ${event.phaseName}`);

    // in our example, totalTime is 1000 (number of milliseconds in a second)
    console.warn(`Total time: ${event.totalTime}`);

    // in our example, fromState is either "open" or "closed"
    console.warn(`From: ${event.fromState}`);

    // in our example, toState either "open" or "closed"
    console.warn(`To: ${event.toState}`);

    // the HTML element itself, the button in this case
    console.warn(`Element: ${event.element}`);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}