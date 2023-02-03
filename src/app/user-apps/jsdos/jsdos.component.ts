import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DosPlayer as Instance, DosPlayerFactoryType } from "js-dos";
import {DosPlayerOptions} from './js.dos'
import {Emulators} from "emulators"
import { FileService } from 'src/app/shared/system-service/file.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { Process } from 'src/app/system-files/process';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
declare const Dos: DosPlayerFactoryType;
declare const emulators:Emulators

@Component({
  selector: 'cos-jsdos',
  templateUrl: './jsdos.component.html',
  styleUrls: ['./jsdos.component.css']
})
export class JsdosComponent implements BaseComponent, OnInit, AfterViewInit {
  @ViewChild('doswindow') dosWindow!: ElementRef; 

  private _fileService:FileService;
  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;

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

  constructor(fileService:FileService, processIdService:ProcessIDService, runningProcessService:RunningProcessService) { 
    this._fileService = fileService
    this._processIdService = processIdService;
    this.processId = this._processIdService.getNewProcessId()
    
    this._runningProcessService = runningProcessService;
    this._runningProcessService.addProcess(this.getComponentDetail());
  }

  ngOnInit(): void {
    1
  }

  ngAfterViewInit() {

    setTimeout( async () => {

      //console.log('doswindow:',this.dosWindow) TBD
      //emulators.pathPrefix = 'https://cdn.jsdelivr.net/npm/js-dos@7.4.7/dist/'
      emulators.pathPrefix= '/'
      //console.log('emulator:',emulators) TBD
  
      // eslint-disable-next-line prefer-const
      let data = await this._fileService.getFileAsync('/osdrive/games/data/Digger.jsdos');
      //console.log('data:',data) //TBD 
  
      Dos(this.dosWindow.nativeElement, this.dosOptions).run(data);
    }, 3000);
  }


  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
