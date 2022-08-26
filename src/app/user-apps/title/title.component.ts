import { Component } from '@angular/core';
import { ProcessIDServoce } from 'src/app/shared/system-service/process.id.service';
import { ComponentType } from 'src/app/system-files/component.types';

@Component({
    selector:'cos-title',
  templateUrl: './title.component.html',
  styleUrls: ["./title.component.css"]
})

export class TitleComponent{

  private _processIdService;

  hasWinow = true;
  icon = '';
  name = 'hellow world';
  processId = 0;
  type = ComponentType.userComponent

  constructor( processIdService:ProcessIDServoce ){
    this._processIdService = processIdService
    this.processId = this._processIdService.getNewProcessId()
  }
   
}