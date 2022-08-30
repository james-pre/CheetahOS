import { Component, Input, OnInit } from '@angular/core';
 import { ComponentType } from 'src/app/system-files/component.types';
 import { faWindowClose, faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';

 @Component({
   selector: 'cos-window',
   templateUrl: './window.component.html',
   styleUrls: ['./window.component.css']
 })
 export class WindowComponent implements OnInit {

   @Input() runningProcessID = 0;  

   private _runningProcessService:RunningProcessService;

   faWinClose = faWindowClose;
   faWinMin = faWindowMinimize;
   faWinMax = faWindowMaximize;
   hasWindow = false;
   icon = '';
   name = '';
   processId = 0;
   type = ComponentType.systemComponent


   

   constructor(runningProcessService:RunningProcessService ){
      this._runningProcessService = runningProcessService;
   }


   ngOnInit(): void {
     this.processId = this.runningProcessID;
   }

   showProcessInfo(){

    console.log('this is process name:', this.name)
    console.log('this is process id:', this.processId)
   }

   onCloseBtnClick(){

    const processToClose = this._runningProcessService.getProcess(this.processId);
    console.log('this is process name:', processToClose.getProcessName)
    console.log('this is process id:', processToClose.getProcessId)
    this._runningProcessService.closeProcess.next(processToClose)
   }
 }
