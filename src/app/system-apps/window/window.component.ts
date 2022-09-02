import { Component, Input, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ComponentType } from 'src/app/system-files/component.types';
import { faWindowClose, faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { Subscription } from 'rxjs';

 @Component({
   selector: 'cos-window',
   templateUrl: './window.component.html',
   styleUrls: ['./window.component.css']
 })
 export class WindowComponent implements OnInit, AfterViewInit, OnDestroy {
   @ViewChild('divWindow') divWindow!: ElementRef;

   @Input() runningProcessID = 0;  
   private _runningProcessService:RunningProcessService;
   private _restoreOrMinSub!:Subscription

  faWinClose = faWindowClose;
  faWinMin = faWindowMinimize;
  faWinMax = faWindowMaximize;
  hasWindow = false;
  icon = '';
  name = 'Window';
  processId = 0;
  type = ComponentType.systemComponent
  hover = false;
  windowMinimize = false;
  windowMaximize = false;
  windowRestore = false;
  currentStyles: Record<string, string> = {};
  defaultWidthOnOpen = 0;
  defaultHeightOnOpen = 0;


   constructor(runningProcessService:RunningProcessService, private changeDetectorRef: ChangeDetectorRef){
      this._runningProcessService = runningProcessService;
      this._restoreOrMinSub = this._runningProcessService.restoreOrMinimizeWindowNotify.subscribe((p) => {this.restorOrMinimzeWinddow(p)})
    
   }

   get divWindowElement(): HTMLElement {
    return this.divWindow.nativeElement;
  }

   ngOnInit(): void {
     this.processId = this.runningProcessID;
   }

   ngOnDestroy(): void {
    this._restoreOrMinSub.unsubscribe();
   }

   ngAfterViewInit(): void {
    this.defaultHeightOnOpen = this.divWindowElement.offsetHeight;
    this.defaultWidthOnOpen  = this.divWindowElement.offsetWidth;

    //tell angular to run additional detection cycle after 
    this.changeDetectorRef.detectChanges();
   }
   

   setCurrentStyles() {
      // CSS styles: set per current state of component properties
      if(this.windowMinimize){
        this.currentStyles = {
          'display': 'none' 
        };
      }
      else if(this.windowMaximize){
        this.currentStyles = {
          'display': 'block',
          'max-width': '100%',
          'max-height': 'calc(100% - 40px)', //This account for the tasbat height
          'top': '5%',
          'left': '8%',
          'right': '0',
          'bottom': '4%', //This account for the tasbat height
        };
      }
      else if(this.windowRestore){
        this.currentStyles = {
          'display': 'block',
          'width': '50%',
          'height': '50%' 
        };
      }

   }
   
   onMinimizeBtnClick(){
    // console.log('this is process name:', this.name)
    // console.log('this is process id:', this.processId)
      this.windowMinimize = true;
      this.windowMaximize = false;
      this.windowRestore = false;
      this.setCurrentStyles();
   }

   onMaximizeBtnClick(){
      this.windowMaximize = true;
      this.windowMinimize = false;
      this.windowRestore = false;
      this.setCurrentStyles();
   }
   onTitleBarDoubleClick(){
      if(!this.windowRestore && !this.windowMaximize)
          this.windowMaximize = true;
      else if(this.windowMaximize && !this.windowRestore){
          this.windowRestore = true;
          this.windowMaximize = false;
      }else{
        this.windowRestore = false;
        this.windowMaximize = true;
      }
      this.setCurrentStyles()
   }

   restorOrMinimzeWinddow(pid:number){

    if(this.processId == pid){
     if(this.windowMinimize && !this.windowRestore){
          this.windowRestore = true;
          this.windowMinimize = false;
      }else{
        this.windowRestore = false;
        this.windowMinimize = true;
      }
      this.setCurrentStyles()
    }

 }

   onCloseBtnClick(){
    const processToClose = this._runningProcessService.getProcess(this.processId);
    // console.log('this is process name:', processToClose.getProcessName)
    // console.log('this is process id:', processToClose.getProcessId)
    this._runningProcessService.closeProcessNotify.next(processToClose)
   }
 }
