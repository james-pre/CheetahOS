import { Component, Input, OnInit, OnDestroy, ElementRef, AfterViewInit,OnChanges, ViewChild, ChangeDetectorRef, SimpleChanges } from '@angular/core';
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
 export class WindowComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
   @ViewChild('divWindow') divWindow!: ElementRef;

   @Input() runningProcessID = 0;  
   @Input() processAppIcon = '';  
   @Input() processAppName = '';  
   
   private _runningProcessService:RunningProcessService;
   private _stateManagmentService: StateManagmentService
   private _restoreOrMinSub!:Subscription
   private originalWindowsState!:WindowState;

  hasWindow = false;
  icon = '';
  name = 'Window';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = '';
   
  hover = false;
  windowMinimize = false;
  windowUnMinimize = false;
  windowMaximize = false;
  windowRestore = false;
  currentStyles: Record<string, unknown> = {};
  defaultWidthOnOpen = 0;
  defaultHeightOnOpen = 0;
  private readonly z_index = 25914523; // this number = zindex
  

   constructor(runningProcessService:RunningProcessService, private changeDetectorRef: ChangeDetectorRef, stateManagmentService: StateManagmentService){
      this._runningProcessService = runningProcessService;
      this._stateManagmentService = stateManagmentService;
      this._restoreOrMinSub = this._runningProcessService.restoreOrMinimizeWindowNotify.subscribe((p) => {this.restoreMinimzeWindow(p)})
   }

   get getDivWindowElement(): HTMLElement {
    return this.divWindow.nativeElement;
  }

   ngOnInit():void{
     this.processId = this.runningProcessID;
     this.icon = this.processAppIcon;
     this.name = this.processAppName;
   }

   ngOnDestroy():void{
    this._restoreOrMinSub.unsubscribe();
   }

   ngAfterViewInit():void{
    this.defaultHeightOnOpen = this.getDivWindowElement.offsetHeight;
    this.defaultWidthOnOpen  = this.getDivWindowElement.offsetWidth;

    this.originalWindowsState = new WindowState(this.processId,this.defaultHeightOnOpen, this.defaultWidthOnOpen);
    this._stateManagmentService.addState(this.processId,this.originalWindowsState)

    this.setWindowToFocus(this.processId);

    //tell angular to run additional detection cycle after 
    this.changeDetectorRef.detectChanges();
   }

   ngOnChanges(changes: SimpleChanges):void{
    console.log('WINDOW CHANGES:',changes)
    this.name = this.processAppName;
    this.icon = this.processAppIcon;
  }

   setCurrentStyles():void{
      // CSS styles: set per current state of component properties
      if(this.windowMinimize){
        this.currentStyles = {
          'display': 'none' 
        };
      }
      if(this.windowUnMinimize){
        this.currentStyles = {
          'display': 'block' 
        };
      }
      else if(this.windowMaximize){
        this.currentStyles = {
          'transform': 'translate(0px,0px)',
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
            'transform': `translate(${String(windowState.getXAxis)}px, ${String(windowState.getYAxis)}px)`
          };
        }
      }
   }
   
   onMinimizeBtnClick(){
    //TODO: on minimize, store the currect window size and postion before minimize
      this.windowMinimize = true;
      this.windowMaximize = false;
      this.windowRestore = false;
      this.windowUnMinimize = false;
      this.setCurrentStyles();
   }

   onMaximizeBtnClick(){
      this.windowMaximize = true;
      this.windowMinimize = false;
      this.windowRestore = false;
      this.windowUnMinimize = false;
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

   restoreMinimzeWindow(pid:number){
      if(this.processId == pid){
        if(this.windowMinimize && !this.windowUnMinimize){
              this.windowUnMinimize = true;
              this.windowMinimize = false;
        }else{
          this.windowUnMinimize = false;
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

      //ignore false drag
      if( x_axis!= 0  && y_axis != 0){
        const windowState = this._stateManagmentService.getState(this.processId) as WindowState 
        windowState.setXAxis= x_axis;
        windowState.setYAxis= y_axis;

        this._stateManagmentService.addState(this.processId,windowState);
      }
    }

    onRZStop(input:any){
      const height = Number(input.size.height);
      const width = Number(input.size.width);

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


   setWindowToFocus(pid:number):void{
    /**
     * If you want to make a non-focusable element focusable, 
     * you must add a tabindex attribute to it. And divs falls into the category non-focusable elements .
     */

      let z_index = this._stateManagmentService.getState(this.z_index) as number;
      const windowState = this._stateManagmentService.getState(pid) as WindowState;
     
      if((windowState.getPid == pid) && (windowState.getZIndex != z_index)){

        if (!z_index ? z_index = 1 :  z_index = z_index + 1)
        this._stateManagmentService.addState(this.z_index,z_index);

        windowState.setZIndex = z_index
        this._stateManagmentService.addState(this.processId,windowState);

        this.currentStyles = {
          'z-index':z_index
        };

        this.divWindow.nativeElement.focus();
      }
   }

   onFocus(focusEvt:any):void{
    console.log('This is focusEvt data:', focusEvt);
    console.log('onFocus divWindow:',this.divWindow)
   }


   onBlur(blurEvt:any):void{
    console.log('This is blurEvt data:', blurEvt);
   }

 }
