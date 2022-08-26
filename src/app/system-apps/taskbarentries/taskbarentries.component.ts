import { Component, OnInit } from '@angular/core';
import { ProcessIDServoce } from 'src/app/shared/system-service/process.id.service';
import { ComponentType } from 'src/app/system-files/component.types';

@Component({
  selector: 'cos-taskbarentries',
  templateUrl: './taskbarentries.component.html',
  styleUrls: ['./taskbarentries.component.css']
})
export class TaskbarentriesComponent implements OnInit {

  private _processIdService;

  hasWinow = false;
  icon = '';
  name = 'file explorer';
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
