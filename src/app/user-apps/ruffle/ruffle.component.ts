import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { FileService } from 'src/app/shared/system-service/file.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { Process } from 'src/app/system-files/process';
import {extname} from 'path';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { AppState, BaseState } from 'src/app/system-files/state/state.interface';
import { StateType } from 'src/app/system-files/state/state.type';
import { StateManagmentService } from 'src/app/shared/system-service/state.management.service';
import { SessionManagmentService } from 'src/app/shared/system-service/session.management.service';
import { ScriptService } from 'src/app/shared/system-service/script.services';


@Component({
  selector: 'cos-ruffle',
  templateUrl: './ruffle.component.html',
  styleUrls: ['./ruffle.component.css']
})
export class RuffleComponent implements BaseComponent, OnInit, OnDestroy, AfterViewInit {
  private rufflePlayer:any;
  @ViewChild('ruffleWindow') ruffleWindow!: ElementRef; 

  private _fileService:FileService;
  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _triggerProcessService:TriggerProcessService;
  private _stateManagmentService:StateManagmentService;
  private _sessionManagmentService: SessionManagmentService;
  private _scriptService: ScriptService;
  private _fileInfo!:FileInfo;
  private _appState!:AppState;
  private gameSrc = '';
  private SECONDS_DELAY = 1500;

  name= 'ruffle';
  hasWindow = true;
  icon = '/osdrive/icons/emulator-1.png';
  isMaximizable = false;
  processId = 0;
  type = ComponentType.User;
  displayName = 'Ruffle-EM';

  constructor(fileService:FileService, processIdService:ProcessIDService, runningProcessService:RunningProcessService, triggerProcessService:TriggerProcessService,
    stateManagmentService: StateManagmentService, sessionManagmentService: SessionManagmentService, scriptService: ScriptService) { 
    this._fileService = fileService
    this._processIdService = processIdService;
    this._triggerProcessService = triggerProcessService;
    this._stateManagmentService = stateManagmentService;
    this._sessionManagmentService = sessionManagmentService;
    this._scriptService = scriptService;
    this.processId = this._processIdService.getNewProcessId();

    this.retrievePastSessionData();

    this._runningProcessService = runningProcessService;
    this._runningProcessService.addProcess(this.getComponentDetail());
  }

  ngOnInit(): void {
    this._fileInfo = this._triggerProcessService.getLastProcessTrigger();

    // this.loadWasm('assets/ruffle-wasm/318626a8878622d4730e.wasm');
    // this.loadWasm('assets/ruffle-wasm/42f8dbf7f8b1cca631d0.wasm');
    // "./src/scripts/ruffle/ruffle.js",
    // "./src/scripts/ruffle/core.ruffle.199108ce0aa8adfdc8f0.js",
    // "./src/scripts/ruffle/core.ruffle.e88cc385ca3824332d82.js"
  }


  async ngAfterViewInit() {
    this.setRuffleWindowToFocus(this.processId); 

    this.gameSrc = (this.gameSrc !=='')? 
    this.gameSrc : this.getGamesSrc(this._fileInfo.getContentPath, this._fileInfo.getCurrentPath);

    this._scriptService.loadScript("ruffle","https://unpkg.com/@ruffle-rs/ruffle").then(()=>{
      this.rufflePlayer = (window as any).RufflePlayer.newest();
      //console.log(' this.rufflePlayer', this.rufflePlayer);
      this.loadSWF('ruffleWindow',this.gameSrc);
      this.storeAppState(this.gameSrc);

    });
  }

  ngOnDestroy(): void {
    console.log('bye');
  }

    async loadWasm(url: string): Promise<WebAssembly.Instance> {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const { instance } = await WebAssembly.instantiateStreaming(response);
        console.log('WASM Loaded and Instantiated', instance);
        return instance;
      } catch (err) {
        console.error('Error loading WASM:', err);
        throw err;
      }
    }

    private getImports() {
      return {
        env: {
          // Define your imported functions and memory objects here
          memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }),
          table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
          // __wbindgen_cb_drop: function(arg) {
          //   console.log("__wbindgen_cb_drop called with arg:", arg);
          // },
          // __wbindgen_throw: function(ptr: number, len: number) {
          //   throw new Error(`wasm-bindgen throw: ${ptr}, ${len}`);
          // },
          __wbindgen_memory: function() {
            return this.memory;
          }
        }
      };
    }


  public loadSWF(elementId: string, swfUrl: string) {
    if (!this.rufflePlayer) {
      console.error('Ruffle is not loaded');
      return;
    }

    const container = document.getElementById(elementId);
    if (!container) {
      console.error(`Element with id ${elementId} not found`);
      return;
    }

    const player = this.rufflePlayer.createPlayer();
    container.appendChild(player);
    player.load(swfUrl);
  }


  setRuffleWindowToFocus(pid:number):void{
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
    const ext = ".swf";
    let res = false;

    if(contentExt != '' && contentExt == ext){
      res = true;
    }else if( currentPathExt == ext){
      res = false;
    }
    return res;
  }

  storeAppState(app_data:unknown):void{
    const uid = `${this.name}-${this.processId}`;

    this._appState = {
      pid: this.processId,
      app_data: app_data as string,
      app_name: this.name,
      unique_id: uid
    }

    this._stateManagmentService.addState(uid, this._appState, StateType.App);
  }

  retrievePastSessionData():void{
    const pickUpKey = this._sessionManagmentService._pickUpKey;
    if(this._sessionManagmentService.hasTempSession(pickUpKey)){
      const tmpSessKey = this._sessionManagmentService.getTempSession(pickUpKey) || ''; 
      const retrievedSessionData = this._sessionManagmentService.getSession(tmpSessKey) as BaseState[];

      if(retrievedSessionData !== undefined){
        const appSessionData = retrievedSessionData[0] as AppState;
        if(appSessionData !== undefined  && appSessionData.app_data != ''){
          this.gameSrc = appSessionData.app_data as string;
        }
      }
    }
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type, this._triggerProcessService.getLastProcessTrigger)
  }


}
