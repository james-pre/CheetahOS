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
  }

}
