import { Component, Input, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ComponentType } from 'src/app/system-files/component.types';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { Subscription } from 'rxjs';
import { StateManagmentService } from 'src/app/shared/system-service/state.management.service';
import { WindowState } from 'src/app/system-files/state/windows.state';

 @Component({
   selector: 'cos-window',
   templateUrl: './window.component.html',
   styleUrls: ['./window.component.css']
 })
 export class WindowComponent implements OnInit, AfterViewInit, OnDestroy {
   @ViewChild('divWindow') divWindow!: ElementRef;

   @Input() runningProcessID = 0;  
   private _runningProcessService:RunningProcessService;
   private _stateManagmentService: StateManagmentService

   private _restoreOrMinSub!:Subscription

   private originalWindowsState!:WindowState;

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
  


   constructor(runningProcessService:RunningProcessService, private changeDetectorRef: ChangeDetectorRef, stateManagmentService: StateManagmentService){
      this._runningProcessService = runningProcessService;
      this._stateManagmentService = stateManagmentService;
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
    const leftOffSet = this.divWindowElement.offsetLeft;
    const topOffSet = this.divWindowElement.offsetTop;


    console.log('offsetLeft:', this.divWindowElement.offsetLeft)
    console.log('offsetTop:', this.divWindowElement.offsetTop)

    this.originalWindowsState = new WindowState(this.processId,this.defaultHeightOnOpen, this.defaultWidthOnOpen,0,0,leftOffSet,topOffSet);
    console.log('orginal window state:', this.originalWindowsState)
    this._stateManagmentService.addState(this.processId,new WindowState(this.processId,this.defaultHeightOnOpen, this.defaultWidthOnOpen,0,0,leftOffSet,topOffSet))

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
          
          'max-width': '100%',
          'max-height': 'calc(100% - 40px)', //This accounts for the taskbar height
          'top': '4.9%',
          'left': '7.5%',
          'right': '0',
          'bottom': '4%', //This accounts for the taskbar height
        };
      }
      else if(this.windowRestore){
        const windowState = this._stateManagmentService.getState(this.processId) as WindowState;
        if(windowState.getPid == this.processId){
          this.currentStyles = {
            'display': 'block',
            'width': `${String(windowState.getWidth)}px`, 
            'height': `${String(windowState.getHeight)}px`, 
            'transform': `translate(${String(windowState.getXAxis)}px, ${String(windowState.getXAxis)}px)`
          };
        }
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

   onRestoreBtnClick(){
    this.windowRestore = true;
    this.windowMaximize = false;
    this.setCurrentStyles();
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

    onDragEnd(input:HTMLElement){
      
      const style = window.getComputedStyle(input);
      const matrix1 = new WebKitCSSMatrix(style.transform);
      const x_axis = matrix1.m41;
      const y_axis = matrix1.m42;

      console.log('o_left:',input.offsetLeft)
      console.log('o_top:',input.offsetTop)

      const windowState = this._stateManagmentService.getState(this.processId) as WindowState 
      windowState.setXAxis= x_axis;
      windowState.setYAxis= y_axis;

      this._stateManagmentService.addState(this.processId,windowState);
    }

    onRZStop(input:any){
      const height = Number(input.size.height);
      const width = Number(input.size.width);

      console.log('input:',input)
      console.log('o_left1:',input.position.left)
      console.log('o_top1:',input.position.top)

      const windowState = this._stateManagmentService.getState(this.processId) as WindowState 
      windowState.setHeight= height;
      windowState.setWidth= width;

      this._stateManagmentService.addState(this.processId,windowState);
    }


   onCloseBtnClick(){
    const processToClose = this._runningProcessService.getProcess(this.processId);
    this._stateManagmentService.removeState(this.processId);
    this._runningProcessService.closeProcessNotify.next(processToClose)
   }
 }
