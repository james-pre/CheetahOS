import { Component, Input, OnInit } from '@angular/core';
import { ComponentType } from 'src/app/system-files/component.types';

@Component({
  selector: 'cos-taskbarentry',
  templateUrl: './taskbarentry.component.html',
  styleUrls: ['./taskbarentry.component.css']
})
export class TaskbarentryComponent implements OnInit {

  @Input() taskBarIconImgUrl = ''
  @Input() taskBarIconName = ''
  @Input() taskBarPid = ''

  hasWinow = false;
  icon = '';
  name = '';
  processId = '';
  type = ComponentType.systemComponent

  constructor( ){
    //
  }


  ngOnInit(): void {
    this.icon = this.taskBarIconImgUrl;
    this.name = this.taskBarIconName;
    this.processId = this.taskBarPid;
  }
}
