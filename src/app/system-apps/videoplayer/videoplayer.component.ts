import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FileService } from 'src/app/shared/system-service/file.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { Process } from 'src/app/system-files/process';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
import { FileInfo } from 'src/app/system-files/fileinfo';
// eslint-disable-next-line no-var
declare var videojs: (arg0: any, arg1: object, arg2: () => void) => any;


@Component({
  selector: 'cos-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoPlayerComponent implements BaseComponent, OnInit, OnDestroy, AfterViewInit  {

  @ViewChild('videowindow', {static: true}) videowindow!: ElementRef;

  private _fileService:FileService;
  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _triggerProcessService:TriggerProcessService;
  private _fileInfo!:FileInfo;
  private player: any;


  name= 'videoplayer';
  hasWindow = true;
  icon = '/osdrive/icons/videoplayer.png';
  processId = 0;
  type = ComponentType.userComponent;
  displayName = 'Video-js';
  showTopMenu = false;


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
  }

  showMenu(): void{
    this.showTopMenu = true;

    console.log('show menu')
  }

  openFileExplorer(): void{
    this.showTopMenu = false;
  }

  playPrevious():void{
    this.showTopMenu = false;
  }

  ngAfterViewInit() {
    const fileType = 'video/' + this._fileInfo.getFileType.replace('.','');
    const videoSrc = '/' +this._fileInfo.getDataPath;

    const options = {
      fluid: true,
      responsive: true,
      autoplay: true, 
      controls:true,
      aspectRatio: '16:9',
      sources: [{ src:videoSrc, type: fileType }] 
    }

    // this.player = videojs(this.videowindow.nativeElement, options, function onPlayerReady(){
    //         console.log('onPlayerReady', "player is read");
    //   });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  setVideoWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type, this._triggerProcessService.getLastProcessTrigger)
  }

}


