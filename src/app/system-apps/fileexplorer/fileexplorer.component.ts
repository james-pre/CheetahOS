import {Component} from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { Process } from 'src/app/system-files/process';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'cos-fileexplorer',
  templateUrl: './fileexplorer.component.html',
  animations: [
    trigger('openClose', [
      transition('* => open', [
        animate("250ms ease-in", style({
          opacity: 0.5,
          height: '95%',
          width: '95%'
        }))
      ]),
      transition('open => *', [
        animate("250ms ease-out", style({
          opacity: 0.5,
          height: '95%',
          width: '95%'
        }))
      ])
    ]),
    trigger('hideRestore', [
      transition('* => open', [
        animate("250ms ease-in", style({
          opacity: 0.5,
          height: '95%',
          width: '95%'
        }))
      ]),
      transition('open => *', [
        animate("250ms ease-out", style({
          opacity: 0.5,
          height: '95%',
          width: '95%'
        }))
      ])
    ]),
  ],
  styleUrls: ['./fileexplorer.component.css']
})
export class FileexplorerComponent implements BaseComponent {

  private _processIdService;
  private _runningProcessService;


  hasWindow = true;
  icon = 'osdrive/icons/file_explorer.ico';
  name = 'fileexplorer';
  processId = 0;
  type = ComponentType.systemComponent;
  directory ='/osdrive/';
  displayName = 'File Explorer';
  onOpen = true;

  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());

  }

  updateIconAndName(updatedData:FileInfo):void{
    //console.log('updatedData:',updatedData); TBD
    this.directory = updatedData.getCurrentPath;
    this.name = updatedData.getFileName;
    this.icon = updatedData.getIcon;
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

  onAnimationEvent(event: AnimationEvent) {

    // // openClose is trigger name in this example
    // console.warn(`Animation Trigger: ${event.triggerName}`);

    // // phaseName is "start" or "done"
    // console.warn(`Phase: ${event.phaseName}`);

    // // in our example, totalTime is 1000 (number of milliseconds in a second)
    // console.warn(`Total time: ${event.totalTime}`);

    // // in our example, fromState is either "open" or "closed"
    // console.warn(`From: ${event.fromState}`);

    // // in our example, toState either "open" or "closed"
    // console.warn(`To: ${event.toState}`);

    // // the HTML element itself, the button in this case
    // console.warn(`Element: ${event.element}`);
  }

  setFileExplorerWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }
}
