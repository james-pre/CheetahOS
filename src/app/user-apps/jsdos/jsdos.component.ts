import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import {DosPlayerFactoryType } from "js-dos";
import {DosPlayerOptions} from './js.dos';
import {CommandInterface, Emulators} from "emulators";
import {extname} from 'path';
import { FileService } from 'src/app/shared/system-service/file.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { Process } from 'src/app/system-files/process';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { AppState } from 'src/app/system-files/state/state.interface';
import { StateType } from 'src/app/system-files/state/state.type';
import { StateManagmentService } from 'src/app/shared/system-service/state.management.service';

declare const Dos: DosPlayerFactoryType;
declare const emulators:Emulators

@Component({
  selector: 'cos-jsdos',
  templateUrl: './jsdos.component.html',
  styleUrls: ['./jsdos.component.css']
})
export class JsdosComponent implements BaseComponent, OnInit, OnDestroy, AfterViewInit {
  @ViewChild('doswindow') dosWindow!: ElementRef; 

  private _fileService:FileService;
  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _triggerProcessService:TriggerProcessService;
  private _stateManagmentService:StateManagmentService;
  private _ci!: CommandInterface;
  private _fileInfo!:FileInfo;
  private _appState!:AppState;

  name= 'jsdos';
  hasWindow = true;
  icon = '/osdrive/icons/js-dos-logo.png';
  processId = 0;
  type = ComponentType.userComponent;
  displayName = 'JS-Dos';

  dosOptions:DosPlayerOptions = {
    style: "none",
    noSideBar: true,
    noFullscreen: true,
    noSocialLinks:true
  }

  constructor(fileService:FileService, processIdService:ProcessIDService, runningProcessService:RunningProcessService, triggerProcessService:TriggerProcessService,
              stateManagmentService: StateManagmentService) { 
    this._fileService = fileService
    this._processIdService = processIdService;
    this._triggerProcessService = triggerProcessService;
    this._stateManagmentService = stateManagmentService;
    this.processId = this._processIdService.getNewProcessId();
    
    this._runningProcessService = runningProcessService;
    this._runningProcessService.addProcess(this.getComponentDetail());
  }

  ngOnInit(): void {
    this._fileInfo = this._triggerProcessService.getLastProcessTrigger();
    this.name = this._fileInfo.getFileName;
  }

  ngOnDestroy(): void {
    if(this.dosOptions){

      if(this._ci != undefined)
          this._ci.exit();
    }
  }

  async ngAfterViewInit() {
    setTimeout( async () => {

      emulators.pathPrefix= '/';
      //console.log('fileInfo in Js-DOS:',this._fileInfo) //TBD 
      //let data = await this._fileService.getFileAsync('/osdrive/games/data/3d_duke.jsdos');
   
      if(this._fileInfo.getContentPath != '' || this._fileInfo.getCurrentPath != ''){

        const gameSrc = this.getGamesSrc(this._fileInfo.getContentPath, this._fileInfo.getCurrentPath)    
        const data = await this._fileService.getFileAsync(gameSrc);
        this._ci = await  Dos(this.dosWindow.nativeElement, this.dosOptions).run(data);
        URL.revokeObjectURL(gameSrc);


      }else{
        alert(`JS-Dos could not started. Sorry :(`);

        //look in the state managment service for information
      }
    }, 1500);
  }

  setJSDosWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  getGamesSrc(pathOne:string, pathTwo:string):string{
    let gameSrc = '';

    if(this.checkForExt(pathOne,pathTwo)){
      gameSrc = '/' + this._fileInfo.getContentPath;
    }else{
      gameSrc =  this._fileInfo.getCurrentPath;
    }

    return gameSrc;
  }

  checkForExt(contentPath:string, currentPath:string):boolean{
    const contentExt = extname(contentPath);
    const currentPathExt = extname(currentPath);
    const ext = ".jsdos";
    let res = false;

    if(contentExt != '' && contentExt == ext){
      res = true;
    }else if( currentPathExt == ext){
      res = false;
    }
    return res;
  }

  storeAppState(app_data:unknown):void{
    this._appState = {
      pid: this.processId,
      app_data: app_data as string,
      app_name: this.name,
      unique_id: `${this.name}-${this.processId}`
    }

    this._stateManagmentService.addState(this.processId, this._appState, StateType.App);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type, this._triggerProcessService.getLastProcessTrigger)
  }

}
