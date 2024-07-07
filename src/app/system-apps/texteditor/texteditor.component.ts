import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { StateManagmentService } from 'src/app/shared/system-service/state.management.service';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';

import * as htmlToImage from 'html-to-image';
import { TaskBarPreviewImage } from '../taskbarpreview/taskbar.preview';
import { Subscription } from 'rxjs';
import { ScriptService } from 'src/app/shared/system-service/script.services';
declare const Quill:any;

@Component({
  selector: 'cos-texteditor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.css']
})


export class TextEditorComponent  implements BaseComponent, OnDestroy, AfterViewInit, OnInit  {

  @ViewChild('editorContainer', {static: true}) editorContainer!: ElementRef;
  
  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _stateManagmentService:StateManagmentService;
  private _triggerProcessService:TriggerProcessService;
  private _scriptService: ScriptService;

  private _maximizeWindowSub!: Subscription;
  SECONDS_DELAY = 250;
  private quill: any;


  hasWindow = true;
  icon = 'osdrive/icons/text-editor_48.png';
  name = 'texteditor';
  processId = 0;
  type = ComponentType.System;
  displayName = '';


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService, triggerProcessService:TriggerProcessService,
              stateManagmentService:StateManagmentService,  scriptService: ScriptService){
    this._processIdService = processIdService
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService = runningProcessService;
    this._stateManagmentService = stateManagmentService;
    this._triggerProcessService = triggerProcessService;
    this._scriptService = scriptService;


    this._runningProcessService.addProcess(this.getComponentDetail());
  }

  ngOnInit(): void {
    1
  }

  ngAfterViewInit(): void {
    this.setTextEditorWindowToFocus(this.processId); 


    const options = {
      debug: 'info',
      modules: {
        toolbar: true,
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    };
    this._scriptService.loadScript("quilljs","assets/quill/quill.js").then(() =>{
  
      this.quill = new Quill(this.editorContainer.nativeElement, options)
      //this.player.on('fullscreenchange', this.onFullscreenChange);
    })

    setTimeout(()=>{
      this.captureComponentImg();
    },this.SECONDS_DELAY) 
  }

  ngOnDestroy():void{
    this._maximizeWindowSub?.unsubscribe();
  }

  captureComponentImg():void{
    htmlToImage.toPng(this.editorContainer.nativeElement).then(htmlImg =>{
      //console.log('img data:',htmlImg);

      const cmpntImg:TaskBarPreviewImage = {
        pid: this.processId,
        imageData: htmlImg
      }
      this._runningProcessService.addProcessImage(this.name, cmpntImg);
    })
  }

  maximizeWindow():void{

    const uid = `${this.name}-${this.processId}`;
    const evtOriginator = this._runningProcessService.getEventOrginator();

    if(uid === evtOriginator){

      this._runningProcessService.removeEventOriginator();
      const mainWindow = document.getElementById('vanta');
      //window title and button bar, and windows taskbar height
      const pixelTosubtract = 30 + 40;
      this.editorContainer.nativeElement.style.height = `${(mainWindow?.offsetHeight || 0) - pixelTosubtract}px`;
      this.editorContainer.nativeElement.style.width = `${mainWindow?.offsetWidth}px`;

    }
  }

  setTextEditorWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }


  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type, this._triggerProcessService.getLastProcessTrigger)
  }
}
