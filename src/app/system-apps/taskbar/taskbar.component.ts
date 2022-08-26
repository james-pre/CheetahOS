import { Component, OnInit } from '@angular/core';
import { ProcessIDServoce } from 'src/app/shared/system-service/process.id.service';
import { ComponentType } from 'src/app/system-files/component.types';

@Component({
  selector: 'cos-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {

  private _processIdService;

  hasWinow = false;
  icon = '';
  name = 'task bar';
  processId = 0;
  type = ComponentType.systemComponent

  constructor( processIdService:ProcessIDServoce ){
    this._processIdService = processIdService
    this.processId = this._processIdService.getNewProcessId()
  }

  ngOnInit(): void {
    1  
  }
}
