import { Component, Input, OnInit, OnDestroy, ElementRef, AfterViewInit,OnChanges, ViewChild, ChangeDetectorRef, SimpleChanges } from '@angular/core';

import { ComponentType } from 'src/app/system-files/component.types';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { Subscription } from 'rxjs';
import { StateManagmentService } from 'src/app/shared/system-service/state.management.service';
import { WindowState } from 'src/app/system-files/state/windows.state';
import {openCloseAnimation, hideShowAnimation, minimizeMaximizeAnimation} from 'src/app/system-apps/window/animation/animations';

 @Component({
   selector: 'cos-window',
   templateUrl: './window.component.html',
   animations: [openCloseAnimation,hideShowAnimation,minimizeMaximizeAnimation],
   styleUrls: ['./window.component.css']
 })
 export class WindowComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
   @ViewChild('divWindow') divWindow!: ElementRef;

   @Input() runningProcessID = 0;  
   @Input() processAppIcon = '';  
   @Input() processAppName = '';  
   
   private _runningProcessService:RunningProcessService;
   private _stateManagmentService: StateManagmentService
   private _originalWindowsState!:WindowState;

   private _restoreOrMinSub!:Subscription
   private _focusOnNextProcessSub!:Subscription;
   private _focusOnCurrentProcessSub!:Subscription;
   private _focusOutOtherProcessSub!:Subscription;


  hasWindow = false;
  icon = '';
  name = 'Window';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = '';
  
  windowOpen = true;
  windowHide = false;
  windowMaximize = false;
  currentWindowSizeState = false;
  currentStyles: Record<string, unknown> = {};
  headerActiveStyles: Record<string, unknown> = {}; 
  closeBtnStyles: Record<string, unknown> = {};
  defaultWidthOnOpen = 0;
  defaultHeightOnOpen = 0;
  private readonly z_index = 25914523; // this number = zindex
  

    constructor(runningProcessService:RunningProcessService, private changeDetectorRef: ChangeDetectorRef, stateManagmentService: StateManagmentService){
      this._runningProcessService = runningProcessService;
      this._stateManagmentService = stateManagmentService;
 
      this._restoreOrMinSub = this._runningProcessService.restoreOrMinimizeWindowNotify.subscribe((p) => {this.restoreHiddenWindow(p)});
      this._focusOnNextProcessSub = this._runningProcessService.focusOnNextProcessNotify.subscribe(() => {this.setNextWindowToFocus()});
      this._focusOnCurrentProcessSub = this._runningProcessService.focusOnCurrentProcessNotify.subscribe((p) => {this.setFocusOnWindow(p)});
      this._focusOutOtherProcessSub = this._runningProcessService.focusOutOtherProcessNotify.subscribe((p) => {this.removeFocusOnWindow(p)});
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
      this._restoreOrMinSub?.unsubscribe();
      this._focusOnNextProcessSub?.unsubscribe();
      this._focusOnCurrentProcessSub?.unsubscribe();
      this._focusOutOtherProcessSub?.unsubscribe();
    }

    ngAfterViewInit():void{
      this.defaultHeightOnOpen = this.getDivWindowElement.offsetHeight;
      this.defaultWidthOnOpen  = this.getDivWindowElement.offsetWidth;

      this._originalWindowsState = new WindowState(this.processId,this.defaultHeightOnOpen, this.defaultWidthOnOpen);
      this._stateManagmentService.addState(this.processId,this._originalWindowsState)
      this.setWindowToFocusById(this.processId);

      //tell angular to run additional detection cycle after 
      this.changeDetectorRef.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges):void{
      //console.log('WINDOW CHANGES:',changes)
      this.name = this.processAppName;
      this.icon = this.processAppIcon;
    }

    setHideAndShow():void{
      this.windowHide = !this.windowHide;
      // CSS styles: set per current state of component properties
      const windowState = this._stateManagmentService.getState(this.processId) as WindowState;

      if(this.windowHide){
        if(windowState.getPid == this.processId){
          windowState.setIsVisible = false;
          this._stateManagmentService.addState(this.processId,windowState);
        }
      }
      else if(!this.windowHide){
        if(windowState.getPid == this.processId){
          if(this.currentWindowSizeState){ 
            // if window was in full screen when hidden, fit it properly when un-hidden
            this.setWindowToFullScreen(this.processId, windowState.getZIndex);
          }else{
            this.currentStyles = {
              // opacity: 1,
              'width': `${String(windowState.getWidth)}`, 
              'height': `${String(windowState.getHeight)}`, 
              'transform': `translate(${String(windowState.getXAxis)}px, ${String(windowState.getYAxis)}px)`,
               'z-index': windowState.getZIndex
            };
          }

          windowState.setIsVisible = true;
          this._stateManagmentService.addState(this.processId,windowState);
        }
      }
    }

    setMaximizeAndUnMaximize():void{
      // CSS styles: set per current state of component properties
      const windowState = this._stateManagmentService.getState(this.processId) as WindowState;
      this.currentWindowSizeState = this.windowMaximize;
      if(this.windowMaximize){
        if(windowState.getPid == this.processId){
          this.setWindowToFullScreen(this.processId, windowState.getZIndex);
          this._runningProcessService.maximizeWindowNotify.next();
        }
      }
      else if(!this.windowMaximize){
        if(windowState.getPid == this.processId){
          this.currentStyles = {
            'width': `${String(windowState.getWidth)}px`, 
            'height': `${String(windowState.getHeight)}px`, 
            'transform': `translate(${String(windowState.getXAxis)}px, ${String(windowState.getYAxis)}px)`,
            'z-index': windowState.getZIndex
          };
        }
      }

      this.windowMaximize = !this.windowMaximize;
    }

    setBtnFocus(pid:number):void{
        if(this.processId == pid){
          this.closeBtnStyles = {
            'background-color':'rgb(139,10,20)'
          };
        }
    }

    setHeaderInActive(pid:number):void{
      if(this.processId == pid){
        this.headerActiveStyles = {
          'background-color':'rgb(121, 163, 232)'
        };
      }
    }

    setHeaderActive(pid:number):void{
      if(this.processId == pid){
        this.headerActiveStyles = {
          'background-color':'blue'
        };
      }
    }

    setWindowToFullScreen(pid:number, z_index:number):void{
      if(this.processId == pid){
        this.currentStyles = {
          'transform': 'translate(0,0)',
          'width': '100%',
          'height': 'calc(100% - 40px)', //This accounts for the taskbar height
          'top': '0',
          'left': '0',
          'right': '0',
          'bottom': '0', 
          'z-index': z_index
        };
      }
    }
   
    onHideBtnClick(pid:number):void{
      if(this.processId == pid){
        this.setHideAndShow()
      }
    }

    restoreHiddenWindow(pid:number):void{
      if(this.processId == pid){
        this.setHideAndShow()
      }
    }

    onMaximizeBtnClick():void{
      this.windowMaximize = true;
      this.setMaximizeAndUnMaximize();
    }

    onUnMaximizeBtnClick():void{
      this.windowMaximize = false;
      this.setMaximizeAndUnMaximize();
    }

    onTitleBarDoubleClick():void{
      // if window is currently in full screen and next state(windowMaximize == false)
      if(this.currentWindowSizeState && !this.windowMaximize){
        this.windowMaximize = false;
      }else{
        this.windowMaximize = true;
      }
      this.setMaximizeAndUnMaximize()
    }

    onDragEnd(input:HTMLElement):void{
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

    onDragStart(pid:number):void{
      this.setFocusOnWindow(pid);
    }

    onRZStop(input:any):void{
      const height = Number(input.size.height);
      const width = Number(input.size.width);

      const windowState = this._stateManagmentService.getState(this.processId) as WindowState 
      windowState.setHeight= height;
      windowState.setWidth= width;
      this._stateManagmentService.addState(this.processId,windowState);
    }

    onCloseBtnClick():void{
      const processToClose = this._runningProcessService.getProcess(this.processId);
      this._stateManagmentService.removeState(this.processId);
      this._runningProcessService.closeProcessNotify.next(processToClose);
      this._runningProcessService.focusOnNextProcessNotify.next();
    }

    setFocusOnWindow(pid:number):void{
      /**
       * If you want to make a non-focusable element focusable, 
       * you must add a tabindex attribute to it. And divs falls into the category non-focusable elements .
       */

      this._runningProcessService.focusOutOtherProcessNotify.next(pid);
      
      if(this.processId == pid){
        this.setHeaderActive(pid);
        this.setWindowToFocusById(pid);
      }
    }

    /**
     * the pid of the current window currently in focus is passed. if the pid of other windows do not match,
     * then they are set out of focus 
     */
    removeFocusOnWindow(pid:number):void{
      const processWithWindows = this._runningProcessService.getProcesses().filter(p => p.getHasWindow == true && p.getProcessId != pid);

      for (let i=0; i < processWithWindows.length; i++){
          const process = processWithWindows[i];
          const window = this._stateManagmentService.getState(process.getProcessId) as WindowState;

          if(window != undefined && window.getIsVisible){
            this.setHeaderInActive(window.getPid);
        }
      }
    }

   setWindowToFocusById(pid:number):void{
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
        this.setHeaderActive(pid);
      }
    }

   setNextWindowToFocus():void{
      const processWithWindows = this._runningProcessService.getProcesses().filter(p => p.getHasWindow == true);

      for (let i=0; i < processWithWindows.length; i++){
          const process = processWithWindows[i];
          const window = this._stateManagmentService.getState(process.getProcessId) as WindowState;
          
          //console.log("setNextWindowToFocus:", window);

        if(window != undefined && window.getIsVisible){
          //console.log('process:',process.getProcessId +'----'+process.getProcessName); //TBD
          this.setWindowToFocusById(process.getProcessId);
          break;
        }
      }
   }

}