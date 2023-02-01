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

  name= 'JS-Dos';
  hasWindow = true;
  icon = '';
  processId = 0;
  type = ComponentType.systemComponent;

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

    1
    // setTimeout(() => {

    //   console.log('doswindow:',this.dosWindow)
    //   //emulators.pathPrefix = 'https://cdn.jsdelivr.net/npm/js-dos@7.4.7/dist/'
    //   emulators.pathPrefix= '/'
    //   console.log('emulator:',emulators)
  
    //   // eslint-disable-next-line prefer-const
    //   //let data = this._fileService.getFile('/desktop/test.jsdos');
    //   //console.log('data:',data)
  
      //Dos(this.dosWindow.nativeElement, this.dosOptions).run("https://doszone-uploads.s3.dualstack.eu-central-1.amazonaws.com/original/2X/2/24b00b14f118580763440ecaddcc948f8cb94f14.jsdos")
      
    // }, 3000);
  }


  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
