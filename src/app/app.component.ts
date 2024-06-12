import {Component,ViewChild, ViewContainerRef, ViewRef, OnDestroy, Type, AfterViewInit} from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { ComponentType } from './system-files/component.types';
import { RunningProcessService } from './shared/system-service/running.process.service';
import { Process } from './system-files/process';
import { ComponentReferenceService } from './shared/system-service/component.reference.service';
import { Subscription } from 'rxjs';
import { TriggerProcessService } from './shared/system-service/trigger.process.service';
import { BaseComponent } from './system-base/base/base.component';
import { TitleComponent } from './user-apps/title/title.component';
import { GreetingComponent } from './user-apps/greeting/greeting.component';
import { FileexplorerComponent } from './system-apps/fileexplorer/fileexplorer.component';
import { TaskmanagerComponent } from './system-apps/taskmanager/taskmanager.component';
import { SessionManagmentService } from './shared/system-service/session.management.service';
import { AppDirectory } from './system-files/app.directory';
import { JsdosComponent } from './user-apps/jsdos/jsdos.component';
import { VideoPlayerComponent } from './system-apps/videoplayer/videoplayer.component';
import { AudioPlayerComponent } from './system-apps/audioplayer/audioplayer.component';
import { TerminalComponent } from './system-apps/terminal/terminal.component';

@Component({
  selector: 'cos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

/**
 *  This is the main app component
 */
export class AppComponent implements OnDestroy, AfterViewInit {
 
  @ViewChild('processContainerRef',  { read: ViewContainerRef })
  private itemViewContainer!: ViewContainerRef

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _componentReferenceService:ComponentReferenceService;
  private _triggerProcessService:TriggerProcessService;
  private _sessionMangamentServices:SessionManagmentService;
  private _componentRefView!:ViewRef;
  private _appDirectory:AppDirectory;

  private _closeProcessSub!:Subscription;
  private _startProcessSub!:Subscription;
  private _appNotFoundSub!:Subscription;
  private _appIsRunningSub!:Subscription;  

  private userOpenedAppsList:string[] = [];
  private retreivedKeys:string[] = [];
  private userOpenedAppsKey = "openedApps";
  private reOpendAppsCounter = 0;
  private SECONDS_DELAY:number[] =[1500, 1500];
 
  hasWindow = false;
  icon = 'osdrive/icons/generic-program.ico';
  name = 'system';
  processId = 0;
  type = ComponentType.System;
  displayName = '';

  //:TODO when you have more apps with a UI worth looking at, add a way to select the right component for the give
  //appname
  private apps: {type: Type<BaseComponent>}[] =[
    {type: AudioPlayerComponent},
    {type: FileexplorerComponent},
    {type: TaskmanagerComponent},
    {type: TerminalComponent},
    // {type: TaskmanagerMiniComponent},
    {type: VideoPlayerComponent},
    {type: TitleComponent},
    {type: GreetingComponent},
    {type: JsdosComponent}
  ];


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService,componentReferenceService:ComponentReferenceService, triggerProcessService:TriggerProcessService,
    sessionMangamentServices:SessionManagmentService){
    this._processIdService = processIdService
    this.processId = this._processIdService.getNewProcessId()

    this._componentReferenceService = componentReferenceService;
    this._runningProcessService = runningProcessService;
    this._triggerProcessService = triggerProcessService;
    this._sessionMangamentServices = sessionMangamentServices;

    this._startProcessSub = this._triggerProcessService.startProcessNotify.subscribe((appName) =>{this.loadApps(appName)})
    this._startProcessSub = this._triggerProcessService.appNotFoundNotify.subscribe((appName) =>{this.loadApps(appName)})
    this._runningProcessService.closeProcessNotify.subscribe((p) =>{this.onCloseBtnClicked(p)})
    this._runningProcessService.addProcess(this.getComponentDetail());

    this._appDirectory = new AppDirectory();
  }

  ngOnDestroy():void{
    this._closeProcessSub?.unsubscribe();
    this._startProcessSub?.unsubscribe();
    this._appNotFoundSub?.unsubscribe();
    this._appIsRunningSub?.unsubscribe();
  }

  ngAfterViewInit():void{
    // This quiets the - Expression has changed after it was checked.
    //TODO: change detection is the better solution TBD
      setTimeout(()=> {
         const priorSessionInfo = this.fetchPriorSessionInfo();
         const sessionKeys = this.getSessionKey(priorSessionInfo);
         this.restorePriorSession(sessionKeys);
    }, this.SECONDS_DELAY[0]);
  }

  async loadApps(appName:string):Promise<void>{
    if(this._appDirectory.appExist(appName)){
        this.lazyLoadComponment(this._appDirectory.getAppPosition(appName));
    }else{
      alert(`The app: ${appName} was not found. It could have been deleted or location changed.`)
    }
  }

  private async lazyLoadComponment(appPosition:number) {
    const componentToLoad = this.apps[appPosition];
    const componentRef = this.itemViewContainer.createComponent<BaseComponent>(componentToLoad.type);
    const pid = componentRef.instance.processId
    this.addEntryFromUserOpenedApps(componentRef.instance.name);
    this._componentReferenceService.addComponentReference(pid, componentRef);

   //alert subscribers
   this._runningProcessService.processListChangeNotify.next()
  }

  onCloseBtnClicked(eventData:Process):void{
    
    const componentToDelete = this._componentReferenceService.getComponentReference(eventData.getProcessId);
    this._componentRefView = componentToDelete.hostView;
    
    const iVCntr  = this.itemViewContainer.indexOf(this._componentRefView);
    this.itemViewContainer.remove(iVCntr);

    this._runningProcessService.removeProcess(eventData)
    this._componentReferenceService.removeComponentReference(eventData.getProcessId);
    this._processIdService.removeProcessId(eventData.getProcessId);
    this.deleteEntryFromUserOpenedAppsAndSession(eventData);

    //alert subscribers
    this._runningProcessService.processListChangeNotify.next()
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

  private deleteEntryFromUserOpenedAppsAndSession(proccess:Process):void{
      const deleteCount = 1
      const pidIndex = this.userOpenedAppsList.indexOf(proccess.getProcessName)

      if (pidIndex !== -1) 
        this.userOpenedAppsList.splice(pidIndex, deleteCount);

      this._sessionMangamentServices.addSession(this.userOpenedAppsKey, this.userOpenedAppsList)
      const uid = `${proccess.getProcessName}-${proccess.getProcessId}`;
      this._sessionMangamentServices.removeSession(uid);
  }

  private fetchPriorSessionInfo():string[]{
    const openedAppList = this._sessionMangamentServices.getSession(this.userOpenedAppsKey) as string[];

    if(openedAppList != null || openedAppList != undefined)
      return openedAppList;

    return [];
  }

  private getSessionKey(priorOpendApps:string[]):string[]{
   
    if(priorOpendApps.length > 0){
      const sessionKeys = this._sessionMangamentServices.getKeys();

      for(let i= 0; i < priorOpendApps.length; i++){
        const tmpKey = sessionKeys.filter(x => x.includes(priorOpendApps[i]));
        
        for(let j = 0; j < tmpKey.length; j++)
          this.retreivedKeys.push(tmpKey[j]);
      }
    }

    return this.retreivedKeys;
  }

  private restorePriorSession(priorSessionData:string[]):void{
    const pickUpKey = this._sessionMangamentServices._pickUpKey;

    const interval =  setInterval((pSessionData) => {
      let tmpCounter = 0;
      let i = this.reOpendAppsCounter;

      for(i; i < pSessionData.length; i++){
        if (tmpCounter < 1){
          const appName = priorSessionData[i].split('-')[0];
          console.log('appName:', appName);
          this._sessionMangamentServices.addSession(pickUpKey, priorSessionData[i]);
          this.loadApps(appName);

          tmpCounter++;
        }
      }

      if(this.reOpendAppsCounter == pSessionData.length - 1)
        clearInterval(interval);

      this.reOpendAppsCounter++;
    },this.SECONDS_DELAY[1], priorSessionData);

  }


  private addEntryFromUserOpenedApps(proccessName:string):void{
    this.userOpenedAppsList.push(proccessName);
    this._sessionMangamentServices.addSession(this.userOpenedAppsKey, this.userOpenedAppsList)
  }

}
