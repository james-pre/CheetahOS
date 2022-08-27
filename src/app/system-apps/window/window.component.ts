import { Component, Input } from '@angular/core';
 import { ComponentType } from 'src/app/system-files/component.types';

 @Component({
   selector: 'cos-window',
   templateUrl: './window.component.html',
   styleUrls: ['./window.component.css']
 })
 export class WindowComponent {

   @Input() taskBarIconImgUrl = ''
   @Input() taskBarIconName = ''
   @Input() taskBarPid = ''

   hasWindow = false;
   icon = '';
   name = '';
   processId = '';
   type = ComponentType.systemComponent

   constructor( ){
     //
   }


   // ngOnInit(): void {
   //   this.icon = this.taskBarIconImgUrl;
   //   this.name = this.taskBarIconName;
   //   this.processId = this.taskBarPid;
   // }
 }
