import { AfterViewInit, Component } from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import {WAVES} from './vanta-object/wave';
declare const VANTA:WAVES 

@Component({
  selector: 'cos-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements AfterViewInit{

  private _processIdService;
  private _runningProcessService;

  hasWindow = false;
  icon = '';
  name = 'desktop';
  processId = 0;
  type = ComponentType.systemComponent

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
  }


  ngAfterViewInit(): void {

    VANTA.WAVES(new WAVES('#vanta',0x274c, 20, 50, 0.8, 0.75))
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}