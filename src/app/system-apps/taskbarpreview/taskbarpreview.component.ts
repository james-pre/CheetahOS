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
        animate('0.75s ease-in')
      ]),
      transition('in => out', [
        animate('0.75s ease-out')
      ]),
    ])
  ]
})
export class TaskbarPreviewComponent implements OnChanges, AfterViewInit {

  private _runningProcessService:RunningProcessService;

  @Input() name = '';
  @Input() icon = '';
  @Input() fadeState = '';


  appInfo = 'This is just a simple test';
  componentImages!:TaskBarPreviewImage[];

  constructor(runningProcessService:RunningProcessService){
    this._runningProcessService = runningProcessService
    this.fadeState = 'in';
  }

  ngOnChanges(changes: SimpleChanges):void{
    //console.log('DIALOG onCHANGES:',changes);
 
    console.log('this.name:',this.name);
    console.log('this.fadeState:',this.fadeState);
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      const tmp:TaskBarPreviewImage = {
        pid:1034,
        imageData: ''
      }
      this.componentImages = [tmp]; // this._runningProcessService.getProcessImages(this.name);
      this.shortAppInfo();
    }, 250);

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
