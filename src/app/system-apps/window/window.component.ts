import { Component, Input, OnInit } from '@angular/core';
 import { ComponentType } from 'src/app/system-files/component.types';
 import { faWindowClose, faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';

 @Component({
   selector: 'cos-window',
   templateUrl: './window.component.html',
   styleUrls: ['./window.component.css']
 })
 export class WindowComponent implements OnInit {

   @Input() runningProcessID = 0
   @Input() runningProcessName = ''
  

   faWinClose = faWindowClose;
   faWinMin = faWindowMinimize;
   faWinMax = faWindowMaximize;
   hasWindow = false;
   icon = '';
   name = '';
   processId = 0;
   type = ComponentType.systemComponent

   constructor( ){
     //
   }


   ngOnInit(): void {
     this.name = this.runningProcessName;
     this.processId = this.runningProcessID;
   }

   showProcessInfo(){

    console.log('this is process name:', this.name)
    console.log('this is process id:', this.processId)
   }
 }
