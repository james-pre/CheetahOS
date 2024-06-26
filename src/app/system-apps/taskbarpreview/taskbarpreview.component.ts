import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';

@Component({
  selector: 'cos-taskbarpreview',
  templateUrl: './taskbarpreview.component.html',
  styleUrl: './taskbarpreview.component.css'
})
export class TaskbarPreviewComponent implements OnChanges, AfterViewInit {

  private _runningProcessService:RunningProcessService;

  @Input() appName = '';

  appInfo = 'This is just a simple test';
  componentImages:unknown[] = [{pid:0, imageData:''}];

  constructor(runningProcessService:RunningProcessService){
    this._runningProcessService = runningProcessService
  }

  ngOnChanges(changes: SimpleChanges):void{
    //console.log('DIALOG onCHANGES:',changes);
 
    console.log('this.appName:',this.appName);
  }

  ngAfterViewInit(): void {
    this.componentImages = this._runningProcessService.getProcessImages(this.appName);
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
