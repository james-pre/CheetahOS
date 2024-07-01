import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { TaskBarPreviewImage } from './taskbar.preview';
import { trigger, state, style, animate, transition } from '@angular/animations'
@Component({
  selector: 'cos-taskbarpreview',
  templateUrl: './taskbarpreview.component.html',
  styleUrl: './taskbarpreview.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('* => in', [
        animate('0.50s ease-in')
      ]),
      transition('in => out', [
        animate('0.50s ease-out')
      ]),
    ])
  ]
})
export class TaskbarPreviewComponent implements OnChanges, AfterViewInit {

  private _runningProcessService:RunningProcessService;

  @Input() name = '';
  @Input() icon = '';
  @Input() fadeState = '';

  componentImages!:TaskBarPreviewImage[];
  appInfo = '';
  SECONDS_DELAY = 250;

  constructor(runningProcessService:RunningProcessService){
    this._runningProcessService = runningProcessService
    this.fadeState = 'in';
  }

  ngOnChanges(changes: SimpleChanges):void{
    console.log('PREVIEW onCHANGES:',changes);
    // console.log('this.name:',this.name);
    // console.log('this.fadeState:',this.fadeState);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.componentImages = this._runningProcessService.getProcessImages(this.name);
      this.shortAppInfo();
    }, this.SECONDS_DELAY);
  }

  shortAppInfo():void{
    this.appInfo = this.name;
    const limit = 26;
    const ellipsis = '...';

    this.appInfo = (this.appInfo.length > limit) ? this.appInfo.substring(0, limit) + ellipsis : this.appInfo;
  }

  onClosePreviewWindow():void{
    console.log('I will implement this......later')
  }


  keepTaskBarPreviewWindow():void{
    this._runningProcessService.keepPreviewWindowNotify.next();
  }

  hideTaskBarPreviewWindow():void{
    this._runningProcessService.hidePreviewWindowNotify.next();
  }

}