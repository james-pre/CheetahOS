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
    1
  }

  async ngAfterViewInit() {

    setTimeout( async () => {

      emulators.pathPrefix= '/';
      const fileInfo = this._triggerProcessService.getLastProcessTrigger();

       console.log('fileInfo in Js-DOS:',fileInfo) //TBD 
      
      // eslint-disable-next-line prefer-const
      let data = await this._fileService.getFileAsync(fileInfo.getPath);
      //console.log('data:',data) //TBD 
  


       this._ci = await  Dos(this.dosWindow.nativeElement, this.dosOptions).run(data);
    }, 3000);

    // const data = await this._fileService.getFileAsync('/osdrive/games/data/3d_duke.jsdos');
    // const ci = await  Dos(this.dosWindow.nativeElement, this.dosOptions).run(data);
    // Revoke url 
    // setTimeout(()=> {
    //   URL.revokeObjectURL('/osdrive/games/data/3d_duke.jsdos');
    // }, 5000);
  }


  async ngOnDestroy(): Promise<void> {
    if (this.dosOptions) {

      console.log('clean up:')
      await this._ci.exit();
    }
  }


  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type, this._triggerProcessService.getLastProcessTrigger)
  }

}
