import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ComponentType } from 'src/app/system-files/component.types';

@Component({
  selector: 'cos-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent implements OnInit,OnChanges {


  @Input() nameOfAppNotFound = '';

  hasWindow = false;
  icon = '';
  name = 'error dialog';
  type = ComponentType.System;
  displayName = ':/Osdrive';
  displayMgs = '';
  
  closeBtnStyles: Record<string, unknown> = {};

  constructor(private changeDetectorRef: ChangeDetectorRef ){
    console.log('you seeing this shit :)');
  }


  ngOnInit(): void {
    console.log('you seeing this shit :)');
  }

  ngOnChanges(changes: SimpleChanges):void{
    //console.log('DIALOG onCHANGES:',changes);
    this.displayMgs = `Osdrive:/App Directory/${this.nameOfAppNotFound}`;
  }


  onCloseBtnClick():void{
  1
  }

}
