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
declare var Howl:any;
declare let SiriWave:any;


@Component({
  selector: 'cos-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.css']
})
export class AudioPlayerComponent implements BaseComponent, OnInit, OnDestroy, AfterViewInit  {

  @ViewChild('siriContainer', {static: true}) siriContainer!: ElementRef;
  // @ViewChild('playBtn', {static: true}) playBtn!: ElementRef;
  // @ViewChild('pauseBtn', {static: true}) pauseBtn!: ElementRef;
  // @ViewChild('siriContainer', {static: true}) siriContainer!: ElementRef;
  // @ViewChild('siriContainer', {static: true}) siriContainer!: ElementRef;
  // @ViewChild('siriContainer', {static: true}) siriContainer!: ElementRef;
  // @ViewChild('siriContainer', {static: true}) siriContainer!: ElementRef;
  // @ViewChild('siriContainer', {static: true}) siriContainer!: ElementRef;
  // @ViewChild('siriContainer', {static: true}) siriContainer!: ElementRef;v
  // @ViewChild('siriContainer', {static: true}) siriContainer!: ElementRef;

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _triggerProcessService:TriggerProcessService;
  private _fileInfo!:FileInfo;

  private audioPlayer: any;
  private siriWave: any;

  recents:string[] = [];


  name= 'audioplayer';
  hasWindow = true;
  icon = '/osdrive/icons/audioplayer.png';
  processId = 0;
  type = ComponentType.userComponent;
  displayName = 'Howlerjs';
  showTopMenu = false;


  track = 'WAP';
  timer ='0:00';
  duration = '0:00' 


  constructor(processIdService:ProcessIDService, runningProcessService:RunningProcessService, triggerProcessService:TriggerProcessService) { 
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
    const audioSrc = '/' +this._fileInfo.getDataPath;

    this.audioPlayer = new Howl({
      src: [audioSrc],
      autoplay: false,
      loop: false,
      volume: 0.5,
      preload: true,
      onplay: function() {
        // Display the duration.
        // this.duration = self.formatTime(Math.round(this.audioPlayer.duration()));

        console.log('duration:',Math.round(this.audioPlayer))

        // Start updating the progress of the track.
        //requestAnimationFrame(self.step.bind(self));

        // Start the wave animation if we have already loaded
        // wave.container.style.display = 'block';
        // bar.style.display = 'none';
        // pauseBtn.style.display = 'block';
      },
      onend: function() {
        console.log('Finished!');
      }
    });

    this.audioPlayer.play();

    this.siriWave = new SiriWave({
      container: this.siriContainer.nativeElement,
      width: 640,
      height: 300,
    });
  }


  onPlayBtnClicked(){
    this.audioPlayer.play();
  }

  ngOnDestroy(): void {
    if (this.audioPlayer) {
      this.audioPlayer.unload();
    }
  }

  addToRecentsList(videoPath:string):void{
    if(!this.recents.includes(videoPath))
        this.recents.push(videoPath);
  }

  setAudi0WindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type, this._triggerProcessService.getLastProcessTrigger)
  }

}


