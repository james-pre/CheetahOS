import { Component, OnInit } from '@angular/core';
import { ProcessIDServoce } from 'src/app/shared/system-service/process.id.service';
import { ComponentType } from 'src/app/system-files/component.types';

@Component({
  selector: 'cos-fileexplorer',
  templateUrl: './fileexplorer.component.html',
  styleUrls: ['./fileexplorer.component.css']
})
export class FileexplorerComponent implements OnInit {

  private _processIdService;

  hasWinow = true;
  icon = '';
  name = 'file explorer';
  processId = 0;
  type = ComponentType.systemComponent

  constructor( processIdService:ProcessIDServoce ){
    this._processIdService = processIdService
    this.processId = this._processIdService.getNewProcessId()
  }


  ngOnInit(): void {
    1 + 1
  }

}
