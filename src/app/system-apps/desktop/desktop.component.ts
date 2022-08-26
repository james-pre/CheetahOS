import { AfterViewInit, Component } from '@angular/core';
import { ProcessIDServoce } from 'src/app/shared/system-service/process.id.service';
import { ComponentType } from 'src/app/system-files/component.types';
import {WAVES} from './vanta-object/wave';
declare const VANTA:WAVES 

@Component({
  selector: 'cos-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements AfterViewInit{

  private _processIdService;

  hasWinow = false;
  icon = '';
  name = 'desktop';
  processId = 0;
  type = ComponentType.systemComponent

  constructor( processIdService:ProcessIDServoce ){
    this._processIdService = processIdService
    this.processId = this._processIdService.getNewProcessId()
  }


  ngAfterViewInit(): void {

    VANTA.WAVES(new WAVES('#vanta',0x274c, 20, 50, 1, 0.75))
  }

}