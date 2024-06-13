import { AfterViewInit, OnInit,OnDestroy, Component} from '@angular/core';
import { Subscription} from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { BIRDS, GLOBE, HALO, RINGS, WAVE } from './vanta-object/vanta.interfaces';
import { IconsSizes, SortBys } from './desktop.enums';
import { FileManagerService } from 'src/app/shared/system-service/file.manager.services';
import { Colors } from './colorutil/colors';

declare let VANTA: { HALO: any; BIRDS: any;  WAVES: any;   GLOBE: any;  RINGS: any;};

@Component({
  selector: 'cos-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit, OnDestroy, AfterViewInit{

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _fileManagerServices:FileManagerService;
  private _timerSubscription!: Subscription;

  private _vantaEffect: any;

  readonly largeIcons = IconsSizes.LARGE_ICONS;
  readonly mediumIcons = IconsSizes.MEDIUM_ICONS;
  readonly smallIcons = IconsSizes.SMALL_ICONS

  isLargeIcon = true;
  isMediumIcon = false;
  isSmallIcon = false;

  readonly sortByName = SortBys.NAME;
  readonly sortByItemType = SortBys.ITEM_TYPE;
  readonly sortBySize = SortBys.SIZE;
  readonly sortByDateModified = SortBys.DATE_MODIFIED;

  isSortByName = false;
  isSortByItemType = false;
  isSortBySize = false;
  isSortByDateModified = false;

  autoAlignIcons = true;
  autoArrangeIcons = true;
  showDesktopIcons = true;

  cntxtMenuStyle:Record<string, unknown> = {};

  hasWindow = false;
  icon = 'osdrive/icons/generic-program.ico';
  name = 'desktop';
  processId = 0;
  type = ComponentType.System;
  displayName = '';

  waveBkgrnd:WAVE =  {el:'#vanta'}
  ringsBkgrnd:RINGS =  {el:'#vanta'}
  haloBkgrnd:HALO =  {el:'#vanta'}
  globeBkgrnd:GLOBE =  {el:'#vanta'}
  birdBkgrnd:BIRDS =  {el:'#vanta'}

  VANTAS:any = [this.waveBkgrnd, this.ringsBkgrnd,this.haloBkgrnd, this.globeBkgrnd, this.birdBkgrnd ];
  private MIN_NUMS_OF_DESKTOPS = 0;
  private MAX_NUMS_OF_DESKTOPS = this.VANTAS.length - 1;
  private CURRENT_DESTOP_NUM = 0;

  private MIN_DEG = 0;
  private MAX_DEG = 360;
  private CURRENT_DEG = 0;
  private defaultColor = 0x274c;
  private nextColor:Colors = new Colors();
  private animationId:any;
 

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService,fileManagerServices:FileManagerService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._fileManagerServices = fileManagerServices;

    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
    this.CURRENT_DEG = this.getRandomInt(0, 360);
  }

  ngOnInit():void{
    this._vantaEffect = VANTA.WAVES({
      el: '#vanta',
      color:this.defaultColor, //this._numSequence,
      waveHeight:20,
      shininess: 50,
      waveSpeed:0.5,
      zoom:0.75,     
    });
  }

  ngAfterViewInit():void{
  
    //this.animationId = requestAnimationFrame(this.changeAnimationColor.bind(this));  
  
     this.hideContextMenu();
  }

  changeAnimationColor():void{
  
    this.CURRENT_DEG = (this.CURRENT_DEG > this.MAX_DEG) ? this.MIN_DEG : this.CURRENT_DEG + 1;

    console.log('nextColor:', Number(this.nextColor.changeHue('#4f32c2',this.CURRENT_DEG)?.replace('#','0x')))
    this._vantaEffect.setOptions({
      color: Number(this.nextColor.changeHue('#4f32c2',this.CURRENT_DEG)?.replace('#','0x')),
    });

    // this ain't working 
    //this.animationId = requestAnimationFrame(this.changeAnimationColor.bind(this)); 
  }

  ngOnDestroy(): void {
    this._timerSubscription?.unsubscribe();
    cancelAnimationFrame(this.animationId);
    this._vantaEffect?.destroy();
  }

  getRandomInt(min:number, max:number):number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  showContextMenu(evt:MouseEvent):void{
    this._runningProcessService.responseToEventCount++;
    const evtRespCount = this._runningProcessService.responseToEventCount;

    /**
     * There is a doubling of responses to certain events that exist on the 
     * desktop compoonent and any other component running at the time the event was triggered.
     * The desktop will always respond to the event, but other components will only respond when they are in focus.
     * If there is a count of 2 or more(highly unlikely) reponses for a given event, then, ignore the desktop's response
     */

    if(evtRespCount > this._runningProcessService.MAX_RESPONSE_TO_EVENT){
      this._runningProcessService.responseToEventCount = 0
      return;
    }

    this.cntxtMenuStyle = {
      'display': 'block', 
      'width': '225px', 
      'transform':`translate(${String(evt.clientX + 2)}px, ${String(evt.clientY)}px)`,
      'z-index': 2,
      'opacity':1
    }

    this._runningProcessService.responseToEventCount = 0;
    evt.preventDefault();
  }

  hideContextMenu():void{
    this.cntxtMenuStyle = {
      'display': 'none', 
    }
  }

  viewBy(viewBy:string):void{
    if(viewBy === IconsSizes.LARGE_ICONS){
      this.isLargeIcon = true;
      this.isMediumIcon = false;
      this.isSmallIcon = false;
    }

    if(viewBy === IconsSizes.MEDIUM_ICONS){
      this.isMediumIcon = true;
      this.isLargeIcon = false;
      this.isSmallIcon = false;
    }

    if(viewBy === IconsSizes.SMALL_ICONS){
      this.isSmallIcon = true;
      this.isMediumIcon = false;
      this.isLargeIcon = false;
    }

    this._fileManagerServices.viewByNotify.next(viewBy);
  }

  sortBy(sortBy:string):void{

    if(sortBy === SortBys.DATE_MODIFIED){
      this.isSortByDateModified = true;
      this.isSortByItemType = false;
      this.isSortByName = false;
      this.isSortBySize = false;
    }

    if(sortBy === SortBys.ITEM_TYPE){
      this.isSortByItemType = true;
      this.isSortByDateModified = false;
      this.isSortByName = false;
      this.isSortBySize = false;
    }

    if(sortBy === SortBys.SIZE){
      this.isSortBySize  = true;
      this.isSortByItemType = false;
      this.isSortByName = false;
      this.isSortByDateModified = false;
    }

    if(sortBy === SortBys.NAME){
      this.isSortByName  = true;
      this.isSortByItemType = false;
      this.isSortByDateModified = false;
      this.isSortBySize = false;
    }

    this._fileManagerServices.sortByNotify.next(sortBy);
  }

  autoArrangeIcon():void{
    this.autoArrangeIcons = !this.autoArrangeIcons
    this._fileManagerServices.autoArrangeIconsNotify.next(this.autoArrangeIcons)
  }

  autoAlignIcon():void{
    this.autoAlignIcons = !this.autoAlignIcons
    this._fileManagerServices.alignIconsToGridNotify.next(this.autoAlignIcons)
  }

  refresh():void{
    this._fileManagerServices.refreshNotify.next();
  }

  showDesktopIcon():void{
    this.showDesktopIcons = !this.showDesktopIcons
    this._fileManagerServices.showDesktopIconsNotify.next(this.showDesktopIcons);
  }

  previousBackground():void{
    if(this.CURRENT_DESTOP_NUM > this.MIN_NUMS_OF_DESKTOPS){
      this.CURRENT_DESTOP_NUM --;
      const curNum = this.CURRENT_DESTOP_NUM;
      this.buildVantaEffect(curNum);
    }
    this.hideContextMenu();
  }

  nextBackground():void{
    if(this.CURRENT_DESTOP_NUM < this.MAX_NUMS_OF_DESKTOPS){
      this.CURRENT_DESTOP_NUM ++;
      const curNum = this.CURRENT_DESTOP_NUM;
      this.buildVantaEffect(curNum);
    }
    
    this.hideContextMenu();
  }

  private buildVantaEffect(n:number) {

    try {
      const vanta = this.VANTAS[n];
      if(n == 0){
        this._vantaEffect = VANTA.WAVES(vanta)
      }
      if(n == 1){
        this._vantaEffect = VANTA.RINGS(vanta)
      }
      if(n == 2){
        this._vantaEffect = VANTA.HALO(vanta)
      }
      if(n == 3){
        this._vantaEffect = VANTA.GLOBE(vanta)
      }
      if(n == 4){
        this._vantaEffect = VANTA.BIRDS(vanta)
      }

    } catch (err) {
      console.error('err:',err);
      //this.buildVantaEffect(this.CURRENT_DESTOP_NUM);
    }

  }


  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}