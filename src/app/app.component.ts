import {Component,AfterViewInit,ViewChild, ViewContainerRef, ViewRef, OnDestroy} from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { ComponentType } from './system-files/component.types';
import { RunningProcessService } from './shared/system-service/running.process.service';
import { Process } from './system-files/process';
import { ComponentReferenceService } from './shared/system-service/component.reference.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

/**
 *  This is the main app component
 */
export class AppComponent implements AfterViewInit, OnDestroy {
 
  @ViewChild('processContainerRef',  { read: ViewContainerRef })
  private itemViewContainer!: ViewContainerRef

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _componentReferenceService:ComponentReferenceService;
  private _componentRefView!:ViewRef;

  private _closeProcessSub!:Subscription;
  private _startProcessSub!:Subscription;
  private _appNotFoundSub!:Subscription;
  private _appIsRunningSub!:Subscription;  


  hasWindow = false;
  icon = '';
  name = 'CheetahOS';
  processId = 0;
  //I know, I'm cheeting here
  type = ComponentType.systemComponent;
  _files!:string[];


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService,componentReferenceService:ComponentReferenceService ){
    this._processIdService = processIdService
    this.processId = this._processIdService.getNewProcessId()

    this._componentReferenceService = componentReferenceService;
    this._runningProcessService = runningProcessService;
    this._runningProcessService.closeProcess.subscribe((p) =>{this.onCloseBtnClicked(p)})
    this._runningProcessService.addProcess(this.getComponentDetail());
  }


  ngAfterViewInit(){ 
    1
    this.loadApps();
  }

  ngOnDestroy(): void {
    this._closeProcessSub?.unsubscribe();
    this._startProcessSub?.unsubscribe();
    this._appNotFoundSub?.unsubscribe();
    this._appIsRunningSub ?.unsubscribe();
  }

  async loadApps() {
    this.lazyLoadTitleComponment();
  }


  private async lazyLoadTitleComponment() {
    const {TitleComponent} = await import('./user-apps/title/title.component');
    const componentRef =this.itemViewContainer.createComponent(TitleComponent);
    const pid = componentRef.instance.processId;
    this._componentReferenceService.addComponentReference(pid, componentRef);

    componentRef.instance.closeBtnClicked.subscribe(evt =>{
         const evtData = evt;
         this.onCloseBtnClicked(evtData);
    });

   //alert subscribers
   this._runningProcessService.processListChange.next()
 }

 onCloseBtnClicked(eventData:Process){
   
  const componentToDelete = this._componentReferenceService.getComponentReference(eventData.getProcessId);
  this._componentRefView = componentToDelete.hostView;

  // eslint-disable-next-line prefer-const
  let iVCntr  = this.itemViewContainer.indexOf(this._componentRefView);
  this.itemViewContainer.remove(iVCntr);

  this._runningProcessService.removeProcess(eventData)
  this._componentReferenceService.removeComponentReference(eventData.getProcessId);
  this._processIdService.removeProcessId(eventData.getProcessId);

  //alert subscribers
  this._runningProcessService.processListChange.next()
}



  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
