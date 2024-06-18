import {Component, Input, OnInit} from '@angular/core';
import { ComponentType } from 'src/app/system-files/component.types';

@Component({
  selector: 'cos-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent implements OnInit {


  @Input() nameOfAppNotFound = '';

  hasWindow = false;
  icon = '';
  name = 'error dialog';
  type = ComponentType.System;
  displayName = ':/osdrive';
  displayMgs = `osdrive:/app directory/${this.nameOfAppNotFound}`;
  
  closeBtnStyles: Record<string, unknown> = {};

  constructor(){
    console.log('you seeing this shit :)');
  }


  ngOnInit(): void {
    console.log('you seeing this shit :)');
  }

  onCloseBtnClick():void{
  1
  }

}
