import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { TaskBarPreviewImage } from './taskbar.preview';

@Component({
  selector: 'cos-taskbarpreview',
  templateUrl: './taskbarpreview.component.html',
  styleUrl: './taskbarpreview.component.css'
})
export class TaskbarPreviewComponent implements OnChanges, AfterViewInit {

  private _runningProcessService:RunningProcessService;

  @Input() name = '';
  @Input() icon = '';

  appInfo = 'This is just a simple test';
  componentImages!:TaskBarPreviewImage[];

  constructor(runningProcessService:RunningProcessService){
    this._runningProcessService = runningProcessService
  }

  ngOnChanges(changes: SimpleChanges):void{
    //console.log('DIALOG onCHANGES:',changes);
 
    console.log('this.name:',this.name);
  }

  ngAfterViewInit(): void {
    this.componentImages = this._runningProcessService.getProcessImages(this.name);
    this.shortAppInfo();
  }

  shortAppInfo():void{
    const limit = 26;
    const ellipsis = '...';
 
    //limit = this.appInfo.substring(0, limit).lastIndexOf(' ');
    this.appInfo = (this.appInfo.length > limit) ? this.appInfo.substring(0, limit) + ellipsis : this.appInfo;
  }

  onClosePreviewWindow():void{
    console.log('I will implement this......later')
  }

}
