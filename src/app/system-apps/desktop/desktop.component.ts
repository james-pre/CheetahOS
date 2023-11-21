import { AfterViewInit, OnInit,OnDestroy, Component} from '@angular/core';
import { Subscription, interval} from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { BIRDS, GLOBE, HALO, RINGS, WAVE } from './vanta-object/vanta.interfaces';
import { IconsSizes, SortBys } from './desktop.enums';
import { FileManagerService } from 'src/app/shared/system-service/file.manager.services';

declare let VANTA: {
  HALO: any; 
  BIRDS: any;  
  WAVES: any;  
  GLOBE: any; 
  RINGS: any; 
};

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
  private _numSequence = 0;
  private _charSquence = 'a';
  private _charSquenceCount = 0;

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

  autoAlignIcons = true;
  autoArrangeIcons = true;
  showDesktopIcons = true;

  cntxtMenuStyle:Record<string, unknown> = {};

  hasWindow = false;
  icon = 'osdrive/icons/generic-program.ico';
  name = 'desktop';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = '';

  waveBkgrnd:WAVE =  {el:'#vanta'}
  ringsBkgrnd:RINGS =  {el:'#vanta'}
  haloBkgrnd:HALO =  {el:'#vanta'}
  globeBkgrnd:GLOBE =  {el:'#vanta'}
  birdBkgrnd:BIRDS =  {el:'#vanta'}

  VANTAS:any = [
    this.waveBkgrnd,
    this.ringsBkgrnd,
    this.haloBkgrnd,
    this.globeBkgrnd,
    this.birdBkgrnd
  ];

  private MIN_NUMS_OF_DESKTOPS = 0;
  private MAX_NUMS_OF_DESKTOPS = this.VANTAS.length - 1;
  private CURRENT_DESTOP_NUM = 0;


  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService,fileManagerServices:FileManagerService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._fileManagerServices = fileManagerServices;

    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._numSequence = this.getRandomInt(100, 999);
  }

  ngOnInit():void{
    this._vantaEffect = VANTA.WAVES({
      el: '#vanta',
      color:0x5588, //this._numSequence,
      // waveHeight:20,
      // shininess: 50,
      // waveSpeed:0.5,
      // zoom:0.75,     
    });
  }

  ngAfterViewInit():void{
    
    // //interval countdown also 15 second
    //  this._timerSubscription = interval(15000) .subscribe(() => {

    //       //console.log("hexColor:",this.getNextColor());
    //       this._vantaEffect.setOptions({
    //         color: this.getNextColor(),
    //       });
    //  });

     this.hideContextMenu();
  }

  ngOnDestroy(): void {
    this._timerSubscription?.unsubscribe();
    this._vantaEffect?.destroy();
  }

  getNextColor():number{
    const minMun = 100;
    const maxNum = 999;
    const charSet:string[] = ['a','b','c','d','e','f'];
    let mid = this._numSequence;
    let tail = this._charSquence;
    let charCount = this._charSquenceCount;

    if(mid < maxNum){
      mid = mid + 1;
      this._numSequence = mid;
    }else if(mid >= maxNum ){
      mid = minMun
      this._numSequence = minMun;

      if(tail == charSet[5]){
          this._charSquenceCount = 0;
          tail = charSet[0];
      }else{
        charCount = charCount + 1;
        this._charSquenceCount = charCount;
        tail = charSet[charCount]
      }
    }

    return Number(`0x${mid}${tail}`);
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
     * The desktop will always repond to the event, but other components will only respond when they are in focus.
     * If there is a count of 2 or more(highly unlikely) reponses for a given event, then, ignore the desktop's response
     */
    if(evtRespCount > this._runningProcessService.MAX_RESPONSE_TO_EVENT){
      this._runningProcessService.responseToEventCount = 0
      return;
    }

    this.cntxtMenuStyle = {
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
      'width': '0px', 
      'height': '0px', 
      'transform': 'translate(-100000px, 100000px)',
      'z-index': -1,
      'opacity':0
    }
  }

  viewBy(viewBy:string):void{
    this._fileManagerServices.viewByNotify.next(viewBy);
  }

  autoArrangeIcon():void{
    this.autoArrangeIcons = !this.autoArrangeIcons
    this._fileManagerServices.autoArrangeIconsNotify.next(this.autoArrangeIcons)
  }

  autoAlignIcon():void{
    this.autoAlignIcons = !this.autoAlignIcons
    this._fileManagerServices.alignIconsToGridNotify.next(this.autoAlignIcons)
  }

  sortBy(sortBy:string):void{
    this._fileManagerServices.sortByNotify.next(sortBy);
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