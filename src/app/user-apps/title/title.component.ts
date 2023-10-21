import { Component, EventEmitter, Output } from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';

@Component({
  selector:'cos-title',
  templateUrl: './title.component.html',
  animations: [
    trigger('openClose', [
      //...
      state('open', style({
        // height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        // height: '100px',
        // opacity: 0.8,
        // backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('10s')
      ]),
      transition('closed => open', [
        animate('9.5s')
      ]),
      transition('* => closed', [
        animate('10s')
      ]),
      transition('* => open', [
        animate('9.5s')
      ]),
      transition('open <=> closed', [
        animate('9.5s')
      ]),
      transition ('* => open', [
        animate ('10s',
          style ({ opacity: '*' }),
        ),
      ]),
      transition('* => *', [
        animate('10s')
      ]),
    ]),
  ],
  styleUrls: ["./title.component.css"]
})

export class TitleComponent implements BaseComponent{

  @Output() closeBtnClicked: EventEmitter<Process> =new EventEmitter<Process>();
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