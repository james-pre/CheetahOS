import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ComponentType } from 'src/app/system-files/component.types';
import { NotificationService } from '../../system-service/notification.service';

@Component({
  selector: 'cos-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})


export class DialogComponent implements OnChanges {

  @Input() inputMsg = '';
  @Input() notificationType = '';

  private _notificationServices:NotificationService;

  notificationOption = '';
  errorNotification = "Error";
  infoNotification = "Info";

  hasWindow = false;
  icon = '';
  name = 'error dialog';
  type = ComponentType.System;
  displayName = ':/Osdrive';
  displayMgs = '';


  
  closeBtnStyles: Record<string, unknown> = {};

  constructor(private changeDetectorRef: ChangeDetectorRef, notificationServices:NotificationService){
    this._notificationServices = notificationServices;
  }


  ngOnChanges(changes: SimpleChanges):void{
    //console.log('DIALOG onCHANGES:',changes);
    this.displayMgs = this.inputMsg;
    this.notificationOption =this.notificationType;
  }


  onCloseDialogBox():void{
    this._notificationServices.closeDialogBoxNotify.next();
  }

}
