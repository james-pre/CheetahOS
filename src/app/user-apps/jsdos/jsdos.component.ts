import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { DosPlayer as Instance, DosPlayerFactoryType } from "js-dos";
import {DosPlayerOptions} from './js.dos'
import {CommandInterface, Emulators} from "emulators"
import { FileService } from 'src/app/shared/system-service/file.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { Process } from 'src/app/system-files/process';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
import { FileInfo } from 'src/app/system-files/fileinfo';
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
  private _ci!: CommandInterface;
  private _fileInfo!:FileInfo;

  name= 'jsdos';
  hasWindow = true;
  icon = '';
  processId = 0;
  type = ComponentType.userComponent;
  displayName = 'JS-Dos';

  dosOptions:DosPlayerOptions = {
    style: "none",
    noSideBar: true,
    noFullscreen: true,
    noSocialLinks:true
  }

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

  async ngAfterViewInit() {

    setTimeout( async () => {

      emulators.pathPrefix= '/';
      //console.log('fileInfo in Js-DOS:',this._fileInfo) //TBD 
      //let data = await this._fileService.getFileAsync('/osdrive/games/data/3d_duke.jsdos');
   
      const data = await this._fileService.getFileAsync(this._fileInfo.getDataPath);
      this._ci = await  Dos(this.dosWindow.nativeElement, this.dosOptions).run(data);

      URL.revokeObjectURL(this._fileInfo.getDataPath);

    }, 1500);

  }


  async ngOnDestroy(): Promise<void> {

      console.log('clean up:')

      if(this._ci != undefined)
        await this._ci.exit();
    
  }


  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type, this._triggerProcessService.getLastProcessTrigger)
  }

}
