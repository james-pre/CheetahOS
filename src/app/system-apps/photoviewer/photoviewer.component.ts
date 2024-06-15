import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { FileService } from 'src/app/shared/system-service/file.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { Process } from 'src/app/system-files/process';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { AppState, BaseState } from 'src/app/system-files/state/state.interface';
import { StateType } from 'src/app/system-files/state/state.type';
import { StateManagmentService } from 'src/app/shared/system-service/state.management.service';
import { SessionManagmentService } from 'src/app/shared/system-service/session.management.service';
// import ImageViewer from 'awesome-image-viewer'


@Component({
  selector: 'cos-photoviewer',
  templateUrl: './photoviewer.component.html',
  styleUrls: ['./photoviewer.component.css']
})
export class PhotoviewerComponent implements BaseComponent, OnInit, OnDestroy, AfterViewInit {
  private photoViewer:any;
 

  private _fileService:FileService;
  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _triggerProcessService:TriggerProcessService;
  private _stateManagmentService:StateManagmentService;
  private _sessionManagmentService: SessionManagmentService;
  private _fileInfo!:FileInfo;
  private _appState!:AppState;
  private picSrc = '';
  private SECONDS_DELAY = 1500;

  name= 'photoviewer';
  hasWindow = true;
  icon = '/osdrive/icons/photos_48.png';
  isMaximizable = false;
  processId = 0;
  type = ComponentType.System;
  displayName = 'PhotoViewer';
  imageList:string[] = ['/osdrive/Pictures/Samples/Chill on the Moon.jpg', '/osdrive/Pictures/Samples/Mystical.jpg',
                        '/osdrive/Pictures/Samples/Sparkling Water.jpg', '/osdrive/Pictures/Samples/Sunset Car.jpg',
                        '/osdrive/Pictures/Samples/Sunset.jpg']
        
  currentImg = '';
  private currentImgIndex = 0;

  constructor(fileService:FileService, processIdService:ProcessIDService, runningProcessService:RunningProcessService, triggerProcessService:TriggerProcessService,
    stateManagmentService: StateManagmentService, sessionManagmentService: SessionManagmentService) { 
    this._fileService = fileService
    this._processIdService = processIdService;
    this._triggerProcessService = triggerProcessService;
    this._stateManagmentService = stateManagmentService;
    this._sessionManagmentService = sessionManagmentService;
    this.processId = this._processIdService.getNewProcessId();

    //this.retrievePastSessionData();

    this._runningProcessService = runningProcessService;
    this._runningProcessService.addProcess(this.getComponentDetail());
  }


  ngOnInit(): void {
    this._fileInfo = this._triggerProcessService.getLastProcessTrigger();
    this.currentImg = this.imageList[0];
  }

  ngOnDestroy(): void {
    1
  }

  async ngAfterViewInit() {
    this.setImageViewerWindowToFocus(this.processId); 

    // const container = document.getElementById('imageViewerWindow');
    // const testImg = [{mainUrl:'/osdrive/Pictures/stock-photo.jpeg', description:'stock photo'}];
    // this.photoViewer = new ImageViewer({
    //   images: testImg
    // });
    // console.log('this.photoViewer:',this.photoViewer);
    // container?.appendChild(this.photoViewer);

  }

  onKeyDown(evt:KeyboardEvent):void{

    if(evt.key == "ArrowLeft"){
      if((this.currentImgIndex >= 0)){
        this.currentImg = this.imageList[this.currentImgIndex--];

        if(this.currentImgIndex < 0){
          this.currentImgIndex = this.imageList.length - 1;
        }
      }      
    }

    if(evt.key == "ArrowRight"){
      if(this.currentImgIndex <= this.imageList.length - 1){
        this.currentImg = this.imageList[this.currentImgIndex++];

        if(this.currentImgIndex > this.imageList.length -1){
          this.currentImgIndex = 0;
        }
      }
    }
  }

  onClick(id?:number):void{

    if(id !== undefined){
      this.currentImg = this.imageList[id];
      this.currentImgIndex = id;
    }else{
      this.currentImgIndex = this.currentImgIndex + 1;
      if(this.currentImgIndex <= this.imageList.length - 1){
        this.currentImg = this.imageList[this.currentImgIndex];
      }
    }
  }

  focusOnInput():void{
    const photoCntnr= document.getElementById('photoCntnr') as HTMLElement;
    if(photoCntnr){
      photoCntnr?.focus();
    }
  }


  setImageViewerWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  retrievePastSessionData():void{
    const pickUpKey = this._sessionManagmentService._pickUpKey;
    if(this._sessionManagmentService.hasTempSession(pickUpKey)){
      const tmpSessKey = this._sessionManagmentService.getTempSession(pickUpKey) || ''; 
      const retrievedSessionData = this._sessionManagmentService.getSession(tmpSessKey) as BaseState[];

      if(retrievedSessionData !== undefined){
        const appSessionData = retrievedSessionData[0] as AppState;
        if(appSessionData !== undefined  && appSessionData.app_data != ''){
          this.picSrc = appSessionData.app_data as string;
        }
      }
    }
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type, this._triggerProcessService.getLastProcessTrigger)
  }


}
