import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import {extname, basename} from 'path';
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

  @ViewChild('waveForm', {static: true}) waveForm!: ElementRef;
  @ViewChild('audioContainer', {static: true}) audioContainer!: ElementRef; 
  @ViewChild('playBtn', {static: true}) playBtn!: ElementRef;
  @ViewChild('pauseBtn', {static: true}) pauseBtn!: ElementRef;
  @ViewChild('prevBtn', {static: true}) prevBtn!: ElementRef;
  @ViewChild('nextBtn', {static: true}) nextBtn!: ElementRef;
  @ViewChild('playlistBtn', {static: true}) playlistBtn!: ElementRef;
  @ViewChild('progress', {static: true}) progress!: ElementRef;
  @ViewChild('bar', {static: true}) bar!: ElementRef;
  @ViewChild('loading', {static: true}) loading!: ElementRef;

  @ViewChild('volumeBtn', {static: true}) volumeBtn!: ElementRef;
  @ViewChild('volumeSlider', {static: true}) volumeSlider!: ElementRef;
  @ViewChild('barFull', {static: true}) barFull!: ElementRef;
  @ViewChild('barEmpty', {static: true}) barEmpty!: ElementRef;
  @ViewChild('sliderBtn', {static: true}) sliderBtn!: ElementRef;

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _triggerProcessService:TriggerProcessService;
  private _fileInfo!:FileInfo;

  private audioPlayer: any;
  private siriWave: any;
  private isSliderDown = false;


  playList:string[] = [];
  recents:string[] = [];
  value = 10;


  name= 'audioplayer';
  hasWindow = true;
  icon = '/osdrive/icons/audioplayer.png';
  processId = 0;
  type = ComponentType.userComponent;
  displayName = 'Howlerjs';
  showTopMenu = false;


  track = 'N/A';
  timer ='0:00';
  duration = '0:00' ;


 
  constructor(processIdService:ProcessIDService, runningProcessService:RunningProcessService, triggerProcessService:TriggerProcessService) { 
    this._processIdService = processIdService;
    this._triggerProcessService = triggerProcessService;
    this.processId = this._processIdService.getNewProcessId();
    
    this._runningProcessService = runningProcessService;
    this._runningProcessService.addProcess(this.getComponentDetail());
  }


  ngOnInit(): void {
    this._fileInfo = this._triggerProcessService.getLastProcessTrigger();

    this.siriWave = new SiriWave({
      container: this.waveForm.nativeElement,
      width: 640,
      height: 480,
      autostart: false,
      cover: true,
      speed: 0.03,
      amplitude: 0.7,
      frequency: 2
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

  ngAfterViewInit():void{  
    1
    // the audio src can't be overwritten, use this when you want to create a playlist later
    // this.audioPlayer.src = []
    // console.log('audioPlayer:',this.audioPlayer)
    // setTimeout(()=>{
    //   if(this.audioPlayer.state() === 'loaded'){
    //     const duration = this.audioPlayer.duration();
    //     this.duration = this.formatTime(duration);
    //   }
    // },500);


      const audioSrc  = '/' +this._fileInfo.getDataPath

    // console.log('file info:', basename(audioSrc, extname(audioSrc)));
    // console.log('extname:',extname(audioSrc));


    if(audioSrc  === '/' && this.playList.length == 0){
      this.audioPlayer = new Howl({
        src: '',
        autoplay: false,
        loop: false,
        preload:false
      });
    }

    if(audioSrc  !== '/' && this.playList.length == 0){
      this.loadHowlSingleTrackObjectAsync(audioSrc)
      .then(howl => {
        this.audioPlayer = howl;
        console.log('this.audioPlayer:',this.audioPlayer);
      })
      .catch(error => {
        console.error('Error loading track:', error);
      });
    }
  
    if((audioSrc !== '/' && this.playList.length >= 1) || (audioSrc  === '/' && this.playList.length >= 1)){
      1
    }
  }

  ngOnDestroy():void{
    this.audioPlayer?.unload();
  }

  onPlayBtnClicked():void{
    this.bar.nativeElement.style.display = 'none';
    this.waveForm.nativeElement.style.display = 'block';
    this.pauseBtn.nativeElement.style.display = 'block';
    this.playBtn.nativeElement.style.display = 'none';

    this.siriWave.start();
    this.audioPlayer.play();

    // Start updating the progress of the track.
    requestAnimationFrame(this.updatePlayBackPosition.bind(this));
  }

  onPauseBtnClicked():void{

    this.bar.nativeElement.style.display = 'block';
    this.waveForm.nativeElement.style.display = 'none';
    this.pauseBtn.nativeElement.style.display = 'none';
    this.playBtn.nativeElement.style.display = 'block';

    this.siriWave.stop();
    this.audioPlayer.pause();
  }

  onPrevBtnClicked():void{
    if(this.playList.length > 0)
      this.audioPlayer.play();
  }

  onRewind():void{
    const secs = 10
    let timeToSeek = this.audioPlayer.seek() - secs;
    timeToSeek = timeToSeek <= 0 ? 0 : timeToSeek;
    this.audioPlayer.seek(timeToSeek);
  }

  onNextBtnClicked():void{
    if(this.playList.length > 0)
      this.audioPlayer.play();
  }

  onFastForward():void{
    const secs = 10
    const timeToSeek = this.audioPlayer.seek() + secs;

    if ( timeToSeek >= this.audioPlayer.duration()) {
      this.audioPlayer.stop();
    } else {
      this.audioPlayer.seek(timeToSeek);
    }
  }

  onWaveFormClicked(evt:MouseEvent):void{
    const rect =  this.audioContainer.nativeElement.getBoundingClientRect();
    const boundedClinetX = evt.clientX - rect.left;

    const innerWidth = this.waveForm.nativeElement.offsetWidth;
    this.onSeek(boundedClinetX/ innerWidth);
  }

  onVolumeBtnClicked():void{
    const display = (this.volumeSlider.nativeElement.style.display === 'block') ? 'none' : 'block';
    setTimeout(()=> {
      this.volumeSlider.nativeElement.style.display = display;
    }, (display === 'block') ? 0 : 500);
    this.volumeSlider.nativeElement.className = (display === 'block') ? 'fadein' : 'fadeout';
  }

  onVolumeSliderBtnClicked():void{
    const display = (this.volumeSlider.nativeElement.style.display === 'block') ? 'none' : 'block';
    setTimeout(()=> {
      this.volumeSlider.nativeElement.style.display = display;
    }, (display === 'block') ? 0 : 500);
    this.volumeSlider.nativeElement.className = (display === 'block') ? 'fadein' : 'fadeout';
  }

  changeVolume(val:number):void{
    const rect =  this.audioContainer.nativeElement.getBoundingClientRect();
    const barWidth = (val * 90) / 100;
    this.barFull.nativeElement.style.width = (barWidth * 100) + '%';
    this.sliderBtn.nativeElement.style.left = (rect.width * barWidth + rect.width * 0.05 - 25) + 'px';
  }

  onBarEmptyClick(evt:MouseEvent):void{
    const scrollWidth = this.barEmpty.nativeElement.scrollWidth;
    const per = evt.offsetX / parseFloat(scrollWidth);
    this.changeVolume(per);
  }

  onMousDownSliderBtn():void{
    this.isSliderDown = true;
  }

  onVolumeMouseUp():void{
    this.isSliderDown = false;
  }


  onVolumeMouseMove(evt:MouseEvent):void{
    if(this.isSliderDown){
      const rect =  this.audioContainer.nativeElement.getBoundingClientRect();
      const boundedClinetX = evt.clientX - rect.left;

      const x = boundedClinetX;
      const startX = parseInt(rect.width) * 0.05;
      const layerX = x - startX;
      const per = Math.min(1, Math.max(0, layerX / parseFloat(this.barEmpty.nativeElement.scrollWidth)));
      this.changeVolume(per);
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

  resizeSiriWave():void{
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

  updatePlayBackPosition():void{
    const seek = this.audioPlayer.seek() || 0;
    this.timer = this.formatTime(Math.round(seek));
    this.progress.nativeElement.style.width =  (((seek / this.audioPlayer.duration()) * 100) || 0) + '%';

    if(this.audioPlayer.playing()){
      requestAnimationFrame(this.updatePlayBackPosition.bind(this));
    }
  }

  onSeek(per:number):void{
    console.log('percent:',per);
    // Convert the percent into a seek position.
    if (this.audioPlayer.playing()) {
      this.audioPlayer.seek(this.audioPlayer.duration() * per);
    }
  }


  loadHowlSingleTrackObjectAsync(audioSrc:string): Promise<any> {

    // Your asynchronous code here
    return new Promise<any>((resolve, reject) => {
     
      const audioPlayer = new Howl({
        src:['/osdrive/audio/titanium.mp3'],
        autoplay: false,
        loop: false,
        volume: 0.5,
        preload: true,
        onend:()=>{
          console.log('Finished!');

          this.bar.nativeElement.style.display = 'block';
          this.waveForm.nativeElement.style.display = 'none';
          this.pauseBtn.nativeElement.style.display = 'none';
          this.playBtn.nativeElement.style.display = 'block';
          
          this.siriWave.stop();
        },
        onload:()=>{
          console.log('loaded!');
          const duration =audioPlayer.duration();
          this.duration = this.formatTime(duration);
          this.track = basename(audioSrc, extname(audioSrc))
          resolve(audioPlayer);
        },
        onseek:()=>{
          // Start updating the progress of the track.
          requestAnimationFrame(this.updatePlayBackPosition.bind(this));
        },
        onloaderror:(err:any)=>{
          console.log('there are problem:',err);
          reject(err);
        }
      });
    });
  }

  loadHowlPlayListObjectAsync(audioSrc:string): Promise<any> {

    return new Promise<any>((resolve, reject) => { 
      this.track = basename(audioSrc, extname(audioSrc))
      const ext = extname(audioSrc)

      const audioPlayer = new Howl({
        src: [audioSrc],
        format:[ext],
        autoplay: false,
        loop: false,
        volume: 0.5,
        preload: false,
        autoSuspend: false,
        onend:()=>{
          console.log('Finished!');
          this.siriWave.canvas.style.opacity = 0;
          this.bar.nativeElement.style.display = 'block';
          this.pauseBtn.nativeElement.style.display = 'none';
          this.playBtn.nativeElement.style.display = 'block';
      
          this.siriWave.stop();
        },
        onload:()=>{
          console.log('loaded!');
            const duration =audioPlayer.duration();
            this.duration = this.formatTime(duration);

            resolve(audioPlayer);
        },
        onseek:()=>{
          // Start updating the progress of the track.
          requestAnimationFrame(this.updatePlayBackPosition.bind(this));
        },
        onloaderror:(err:any)=>{
          console.log('there are problem:',err);
          reject(err);
        }
      });
    });
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type, this._triggerProcessService.getLastProcessTrigger)
  }

}


