import { Component } from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { AnimationEvent } from '@angular/animations';
import { openCloseAnimation } from 'src/app/system-apps/window/animation/animations';

@Component({
  selector:'cos-title',
  templateUrl: './title.component.html',
  animations: [ openCloseAnimation],
  styleUrls: ["./title.component.css"]
})

export class TitleComponent implements BaseComponent{

  private _processIdService;
  private _runningProcessService;

  hasWindow = true;
  icon = 'osdrive/picture/favicon.ico';
  name = 'hello';
  processId = 0;
  type = ComponentType.userComponent;
  displayName = 'Hello';
  onOpen = true;

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
  }


  setTitleWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
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