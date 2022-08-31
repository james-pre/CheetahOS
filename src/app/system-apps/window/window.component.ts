import { Component, Input, OnInit,ElementRef, NgZone, AfterViewInit, ViewChild  } from '@angular/core';
import { ComponentType } from 'src/app/system-files/component.types';
import { faWindowClose, faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { CdkDragMove } from '@angular/cdk/drag-drop';

 @Component({
   selector: 'cos-window',
   templateUrl: './window.component.html',
   styleUrls: ['./window.component.css']
 })
 export class WindowComponent implements OnInit,AfterViewInit {

   @Input() runningProcessID = 0;  
   @ViewChild('resizeBox') resizeBox!: ElementRef;
   @ViewChild('dragHandleRight') dragHandleRight!: ElementRef;
   @ViewChild('dragHandleBottom')dragHandleBottom!: ElementRef;
   private _runningProcessService:RunningProcessService;

   faWinClose = faWindowClose;
   faWinMin = faWindowMinimize;
   faWinMax = faWindowMaximize;
   hasWindow = false;
   icon = '';
   name = '';
   processId = 0;
   type = ComponentType.systemComponent
   hover = false;
   windowMinimize = false;
   windowMaximize = true;
   currentStyles: Record<string, string> = {};
   height = 0;
   width = 0;

   constructor(runningProcessService:RunningProcessService , private ngZone: NgZone){
      this._runningProcessService = runningProcessService;
   }


   ngOnInit(): void {
     this.processId = this.runningProcessID;
   }


   ngAfterViewInit() {
    this.setAllHandleTransform();
  }


  get resizeBoxElement(): HTMLElement {
    return this.resizeBox.nativeElement;
  }

  get dragHandleRightElement(): HTMLElement {
    return this.dragHandleRight.nativeElement;
  }

  get dragHandleBottomElement(): HTMLElement {
    return this.dragHandleBottom.nativeElement;
  }


  setAllHandleTransform() {
    const rect = this.resizeBoxElement.getBoundingClientRect();
    this.setHandleTransform(this.dragHandleRightElement, rect, 'x');
    this.setHandleTransform(this.dragHandleBottomElement, rect, 'y');
  }

  setHandleTransform( dragHandle: HTMLElement, targetRect: ClientRect | DOMRect, position: 'x' | 'y') {
    const dragRect = dragHandle.getBoundingClientRect();
    // const translateX = targetRect.width - dragRect.width;
    // const translateY = targetRect.height - dragRect.height;

    const translateX = targetRect.width - dragRect.width;
    const translateY = targetRect.height - dragRect.height;

    console.log('dragRect.width:', dragRect.width);
    console.log('dragRect.height:', dragRect.height);
    console.log('targetRect.width:', targetRect.width);
    console.log('targetRect.height:', targetRect.height);
    console.log('translateX:', translateX);
    console.log('translateY:', translateY);

    if (position === 'x') {
      dragHandle.style.transform = `translate(${translateX}px, 0)`;
    }

    if (position === 'y') {
      dragHandle.style.transform = `translate(0, ${translateY}px)`;
    }

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dragMove(dragHandle: HTMLElement, $event: CdkDragMove<any>) {
    this.ngZone.runOutsideAngular(() => {
      this.resize(dragHandle, this.resizeBoxElement);
    });
  }

  resize(dragHandle: HTMLElement, target: HTMLElement) {
    const dragRect = dragHandle.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const width = dragRect.left - targetRect.left + dragRect.width;
    const height = dragRect.top - targetRect.top + dragRect.height;

    target.style.width = width + 'px';
    target.style.height = height + 'px';

    this.setAllHandleTransform();
  }

   showProcessInfo(){

    console.log('this is process name:', this.name)
    console.log('this is process id:', this.processId)
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
          'display': 'block' 
        };
      }

   }
   
   onMinimizeBtnClick(){
    console.log('this is process name:', this.name)
    console.log('this is process id:', this.processId)
      this.windowMinimize = true;
      this.windowMaximize = false;
      this.setCurrentStyles()
   }

   onCloseBtnClick(){

    const processToClose = this._runningProcessService.getProcess(this.processId);
    console.log('this is process name:', processToClose.getProcessName)
    console.log('this is process id:', processToClose.getProcessId)
    this._runningProcessService.closeProcessNotify.next(processToClose)
   }
 }
