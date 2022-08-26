import { Component, OnInit } from '@angular/core';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { ProcessIDServoce } from 'src/app/shared/system-service/process.id.service';
import { ComponentType } from 'src/app/system-files/component.types';

@Component({
  selector: 'cos-startbutton',
  templateUrl: './startbutton.component.html',
  styleUrls: ['./startbutton.component.css']
})
export class StartbuttonComponent implements OnInit {
  private _processIdService;

  faWindows = faWindows;
  hasWinow = false;
  hover = false;
  icon = '';
  name = 'start button';
  processId = 0;
  type = ComponentType.systemComponent

  constructor( processIdService:ProcessIDServoce ){
    this._processIdService = processIdService
    this.processId = this._processIdService.getNewProcessId()
  }


  ngOnInit(): void {
    1 + 1;
  }
  
}
