import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from 'src/app/shared/system-service/file.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { Process } from 'src/app/system-files/process';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
import { FileInfo } from 'src/app/system-files/fileinfo';

// eslint-disable-next-line no-var
declare var videojs: (arg0: string) => any;


@Component({
  selector: 'cos-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoPlayerComponent implements BaseComponent, OnInit, OnDestroy, AfterViewInit  {

  private _fileService:FileService;
  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _triggerProcessService:TriggerProcessService;
  private _fileInfo!:FileInfo;



  name= 'videoplayer';
  hasWindow = true;
  icon = '/osdrive/icons/js-dos-logo.png';
  processId = 0;
  type = ComponentType.userComponent;
  displayName = 'Video-js';


  constructor(fileService:FileService, processIdService:ProcessIDService, runningProcessService:RunningProcessService, triggerProcessService:TriggerProcessService) { 
    this._fileService = fileService
    this._processIdService = processIdService;
    this._triggerProcessService = triggerProcessService;
    this.processId = this._processIdService.getNewProcessId();
    
    this._runningProcessService = runningProcessService;
    this._runningProcessService.addProcess(this.getComponentDetail());
  }



  ngOnInit(): void {
    this._fileInfo = this._triggerProcessService.getLastProcessTrigger();
    this.name = this._fileInfo.getFileName;
  }

  ngOnDestroy(): void {
    // const myPlayer = videojs('some-player-id');
 
    // myPlayer.src("http://www.example.com/path/to/video.mp4");
1
  }

  async ngAfterViewInit() {
1
  }

  setVideoWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type, this._triggerProcessService.getLastProcessTrigger)
  }

}


