import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('playBtn', {static: true}) playBtn!: ElementRef;
  @ViewChild('pauseBtn', {static: true}) pauseBtn!: ElementRef;
  @ViewChild('progress', {static: true}) progress!: ElementRef;
  @ViewChild('bar', {static: true}) bar!: ElementRef;
  @ViewChild('loading', {static: true}) loading!: ElementRef;
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
    const audioSrc = '/' +this._fileInfo.getDataPath;

    this.siriWave = new SiriWave({
      container: this.siriContainer.nativeElement,
      width: 640,
      height: 480,
      autostart: false,
      cover: true,
      speed: 0.03,
      amplitude: 0.7,
      frequency: 2
    });

    this.audioPlayer = new Howl({
      src: [audioSrc],
      format:['mp3'],
      autoplay: false,
      loop: false,
      volume: 0.5,
      // html5: true,
      preload: true,
      onend:()=>{
        console.log('Finished!');
        this.siriWave.canvas.style.opacity = 0;
        this.bar.nativeElement.style.display = 'block';
        this.pauseBtn.nativeElement.style.display = 'none';
        this.playBtn.nativeElement.style.display = 'block';
    
        this.siriWave.stop();
      },
      onload:()=>{
        console.log('load!');

        if(this.audioPlayer.state() === 'loaded'){
          const duration = this.audioPlayer.duration();
          this.duration = this.formatTime(duration);
        }

        // // Start the wave animation if we have already loaded
        // this.siriContainer.nativeElement.style.display = 'block';
        // this.bar.nativeElement.style.display = 'none';
        // this.pauseBtn.nativeElement.style.display = 'block';
      },
      onseek:()=>{
        // Start updating the progress of the track.
        requestAnimationFrame(this.updatePlayBackPosition.bind(this));
      }
    });
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
    1
    // // console.log('audioPlayer:',this.audioPlayer)
    // setTimeout(()=>{
    //   if(this.audioPlayer.state() === 'loaded'){
    //     const duration = this.audioPlayer.duration();
    //     this.duration = this.formatTime(duration);
    //   }
    // },500);
  }

  onPlayBtnClicked(){
    // console.log('What is this:',this);
    // console.log('this.audioPlayer.state():',this.audioPlayer.state());
    // Start the wave animation if we have already loaded
    //this.siriContainer.nativeElement.style.display = 'block';

    // Display the duration.
    //this.duration = this.formatTime(this.audioPlayer.duration());

    this.siriWave.canvas.style.opacity = 1;
    this.bar.nativeElement.style.display = 'none';
    this.pauseBtn.nativeElement.style.display = 'block';
    this.playBtn.nativeElement.style.display = 'none';

    this.siriWave.start();
    this.audioPlayer.play();

    // Start updating the progress of the track.
    requestAnimationFrame(this.updatePlayBackPosition.bind(this));
  }

  onPauseBtnClicked(){
    //this.siriContainer.nativeElement.style.display = 'block';
    // console.log('this.siriContainer:',this.siriContainer);
    // console.log('this.siriWave.canvas:',this.siriWave.canvas);


    this.siriWave.canvas.style.opacity = 0;
    this.bar.nativeElement.style.display = 'block';
    this.pauseBtn.nativeElement.style.display = 'none';
    this.playBtn.nativeElement.style.display = 'block';

    this.siriWave.stop();
    this.audioPlayer.pause();
  }

  onPrevBtnClicked(){
    this.audioPlayer.play();
  }

  onNextBtnClicked(){
    this.audioPlayer.play();
  }


  ngOnDestroy(): void {
    if (this.audioPlayer) {
      this.audioPlayer.unload();
    }
  }

  formatTime(seconds:number):string{
    const mins = Math.floor(seconds / 60) || 0;
    const secs = Math.floor(seconds - (mins * 60)) || 0;
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  addToRecentsList(audioPath:string):void{
    if(!this.recents.includes(audioPath))
        this.recents.push(audioPath);
  }

  setAudioWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }


  resizeSiriWave(){
    const height = window.innerHeight * 0.3;
    const width = window.innerWidth;
    this.siriWave.height = height;
    this.siriWave.height_2 = height / 2;
    this.siriWave.MAX = this.siriWave.height_2 - 4;
    this.siriWave.width = width;
    this.siriWave.width_2 = width / 2;
    this.siriWave.width_4 = width / 4;
    this.siriWave.canvas.height = height;
    this.siriWave.canvas.width = width;
    this.siriWave.container.style.margin = -(height / 2) + 'px auto';
  }


  updatePlayBackPosition(){
    const seek = this.audioPlayer.seek() || 0;
    this.timer = this.formatTime(Math.round(seek));
    this.progress.nativeElement.style.width =  (((seek / this.audioPlayer.duration()) * 100) || 0) + '%';

    if(this.audioPlayer.playing()){
      requestAnimationFrame(this.updatePlayBackPosition.bind(this));
    }
  }


  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type, this._triggerProcessService.getLastProcessTrigger)
  }

}


