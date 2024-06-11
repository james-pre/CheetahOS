import { Component, Input, OnInit, OnDestroy, ElementRef, AfterViewInit,OnChanges, ViewChild, ChangeDetectorRef, SimpleChanges } from '@angular/core';

import { ComponentType } from 'src/app/system-files/component.types';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { Subscription } from 'rxjs';
import { StateManagmentService } from 'src/app/shared/system-service/state.management.service';
import { WindowState } from 'src/app/system-files/state/state.interface';
import {openCloseAnimation, hideShowAnimation, minimizeMaximizeAnimation} from 'src/app/system-apps/window/animation/animations';
import { StateType } from 'src/app/system-files/state/state.type';

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
   private _stateManagmentService: StateManagmentService;
   private _originalWindowsState!:WindowState;

   private _restoreOrMinSub!:Subscription
   private _focusOnNextProcessSub!:Subscription;
   private _focusOnCurrentProcessSub!:Subscription;
   private _focusOutOtherProcessSub!:Subscription;


  hasWindow = false;
  icon = '';
  name = 'Window';
  processId = 0;
  uniqueId = '';
  type = ComponentType.System;
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
  private readonly z_index = '25914523'; // this number = zindex
  

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


      this._originalWindowsState = {
        app_name: this.name,
        pid : this.processId,
        height:this.defaultHeightOnOpen,
        width: this.defaultWidthOnOpen,
        x_axis: 0,
        y_axis: 0,
        z_index:0,
        is_visible:true
      }
      
      this.uniqueId = `${this.name}-${this.processId}`;
      this._stateManagmentService.addState(this.uniqueId,this._originalWindowsState, StateType.Window);
      this.setWindowToFocusById(this.processId);

      //tell angular to run additional detection cycle after 
      this.changeDetectorRef.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges):void{
      //console.log('WINDOW onCHANGES:',changes);
      this.name = this.processAppName;
      this.icon = this.processAppIcon;
    }

    setHideAndShow():void{
      this.windowHide = !this.windowHide;
      // CSS styles: set per current state of component properties

      const windowState = this._stateManagmentService.getState(this.uniqueId, StateType.Window) as WindowState;

      if(this.windowHide){
        if(windowState.pid == this.processId){
          windowState.is_visible = false;
          this._stateManagmentService.addState(this.uniqueId, windowState, StateType.Window);
        }
      }
      else if(!this.windowHide){
        if(windowState.pid == this.processId){
          if(this.currentWindowSizeState){ 
            // if window was in full screen when hidden, fit it properly when un-hidden
            this.setWindowToFullScreen(this.processId, windowState.z_index);
          }else{
            this.currentStyles = {
              // opacity: 1,
              'width': `${String(windowState.width)}`, 
              'height': `${String(windowState.height)}`, 
              'transform': `translate(${String(windowState.x_axis)}px, ${String(windowState.y_axis)}px)`,
               'z-index': windowState.z_index
            };
          }

          windowState.is_visible = true;
          this._stateManagmentService.addState(this.uniqueId, windowState, StateType.Window);
        }
      }
    }

    setMaximizeAndUnMaximize():void{
      // CSS styles: set per current state of component properties

      const windowState = this._stateManagmentService.getState(this.uniqueId, StateType.Window) as WindowState;
      this.currentWindowSizeState = this.windowMaximize;
      if(this.windowMaximize){
        if(windowState.pid == this.processId){
          this.setWindowToFullScreen(this.processId, windowState.z_index);
          this._runningProcessService.maximizeWindowNotify.next();
        }
      }
      else if(!this.windowMaximize){
        if(windowState.pid == this.processId){
          this.currentStyles = {
            'width': `${String(windowState.width)}px`, 
            'height': `${String(windowState.height)}px`, 
            'transform': `translate(${String(windowState.x_axis)}px, ${String(windowState.y_axis)}px)`,
            'z-index': windowState.z_index
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
        const windowState = this._stateManagmentService.getState(this.uniqueId, StateType.Window) as WindowState;
        windowState.x_axis= x_axis;
        windowState.y_axis= y_axis;
        this._stateManagmentService.addState(this.uniqueId, windowState, StateType.Window);
      }
    }

    onDragStart(pid:number):void{
      this.setFocusOnWindow(pid);
    }

    onRZStop(input:any):void{
      const height = Number(input.size.height);
      const width = Number(input.size.width);

      const windowState = this._stateManagmentService.getState(this.uniqueId, StateType.Window) as WindowState;
      windowState.height= height;
      windowState.width= width;
      this._stateManagmentService.addState(this.uniqueId, windowState, StateType.Window);
    }

    onCloseBtnClick():void{
      const processToClose = this._runningProcessService.getProcess(this.processId);
      this._stateManagmentService.removeState(this.uniqueId);
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
          const window = this._stateManagmentService.getState(`${process.getProcessName}-${process.getProcessId}`, StateType.Window) as WindowState;
          
          if(window != undefined && window.is_visible){
            this.setHeaderInActive(window.pid);
        }
      }
    }

   setWindowToFocusById(pid:number):void{
      let z_index = this._stateManagmentService.getState(this.z_index) as number;

      const uid = `${this.name}-${pid}`;
      const windowState = this._stateManagmentService.getState(uid,StateType.Window) as WindowState;

      if(windowState !== undefined){
        if((windowState.pid == pid) && (windowState.z_index != z_index)){

          if (!z_index ? z_index = 1 :  z_index = z_index + 1)
            this._stateManagmentService.addState(this.z_index,z_index);
        
          windowState.z_index = z_index
          this._stateManagmentService.addState(this.uniqueId, windowState, StateType.Window);
  
          this.currentStyles = {
            'z-index':z_index
          };
          this.setHeaderActive(pid);
        }
      }
    }

   setNextWindowToFocus():void{
      const processWithWindows = this._runningProcessService.getProcesses().filter(p => p.getHasWindow == true);

      for (let i = 0; i < processWithWindows.length; i++){
        const process = processWithWindows[i];
        const window = this._stateManagmentService.getState(`${process.getProcessName}-${process.getProcessId}`,StateType.Window) as WindowState;
          
        if(window != undefined && window.is_visible){
          //console.log('process:',process.getProcessId +'----'+process.getProcessName); //TBD
          this.setWindowToFocusById(process.getProcessId);
          break;
        }
      }
   }

}