import { AfterViewInit, OnInit,OnDestroy, Component,ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subscription, interval} from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import WAVES from 'vanta/dist/vanta.waves.min';
//import BIRDS from 'vanta/dist/vanta.birds.min';
// import FOG from 'vanta/dist/vanta.fog.min';
// import CLOUDS from 'vanta/dist/vanta.clouds.min';
// import CLOUDS2 from 'vanta/dist/vanta.clouds2.min';
// import GLOBE from 'vanta/dist/vanta.globe.min';
// import NET from 'vanta/dist/vanta.net.min';
// import CELLS from 'vanta/dist/vanta.cells.min';
// import TRUNK from 'vanta/dist/vanta.trunk.min';
// import TOPOLOGY from 'vanta/dist/vanta.topology.min';
// import DOTS from 'vanta/dist/vanta.dots.min';
// import RINGS from 'vanta/dist/vanta.rings.min';
//import HALO from 'vanta/dist/vanta.halo.min';
import * as THREE from 'three';


const VANTAS = [
  WAVES,
  //BIRDS,
  // FOG,
  // CLOUDS,
  // CLOUDS2,
  // GLOBE,
  // NET,
  // CELLS,
  // TRUNK,
  // TOPOLOGY,
  // DOTS,
  // RINGS,
   //HALO
];

@Component({
  selector: 'cos-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild('cntxtMenu') cntxtMenu!: ElementRef;

  private _renderer: Renderer2;

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _timerSubscription!: Subscription;

  private _vantaEffect: any;
  private _numSequence = 0;
  private _charSquence = 'a';
  private _charSquenceCount = 0;


  showCntxtMenu = false
  cntxtMenuStyle:Record<string, unknown> = {};

  hasWindow = false;
  icon = 'osdrive/icons/generic-program.ico';
  name = 'desktop';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = '';


  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService, renderer: Renderer2) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._numSequence = this.getRandomInt(100, 999);

    this._renderer = renderer;
  }

  ngOnInit():void{
    const vanta = VANTAS[0];
    this._vantaEffect = vanta({
      el: '#vanta',
      color:this._numSequence,
      waveHeight:20,
      shininess: 50,
      waveSpeed:0.5,
      zoom:0.75,   
      THREE: THREE,    
    });
  }

  ngAfterViewInit():void{
    //interval countdown also 15 second
     this._timerSubscription = interval(15000) .subscribe(() => {

          //console.log("hexColor:",this.getNextColor());
          this._vantaEffect.setOptions({
            color: this.getNextColor(),
          });
     });

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

    const x = evt.clientX;
    const y = evt.clientY;
   
    this.cntxtMenuStyle = {
      'width': '200px', 
      'height': 'fit-content', 
      'transform':`translate(${String(x)}px, ${String(y)}px)`,
      'z-index': 2,
      'opacity':1
    }

    // //this.cntxMenu.nativeElement.style.transform = `translate(${String(x)}px, ${String(y)}px)`, 
    
    // this._renderer.setStyle(this.cntxtMenu.nativeElement,'transform',`translate(${String(x)}px, ${String(y)}px)`);
    // //this.showCntxtMenu = !this.showCntxtMenu;

    evt.preventDefault();
  }

  hideContextMenu():void{
    
    this.cntxtMenuStyle = {
      'width': '0px', 
      'height': '0px', 
      'transform': 'translate(-100000px, 100000px)',
      'z-index': -2,
      'opacity':0
    }
  }


  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}