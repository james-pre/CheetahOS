import { AfterViewInit, OnInit,OnDestroy, Component } from '@angular/core';
import { Subscription, timer } from 'rxjs';
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

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _vantaEffect: any;

  private _numSequence = 100;
  private _charSquence = 'a';
  private _charSquenceCount = 0;

  private _timerSubscription!: Subscription;

  hasWindow = false;
  icon = '';
  name = 'desktop';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = '';


  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._numSequence = this.getRandomInt(100, 999)
  }

  ngOnInit():void{
    const vanta = VANTAS[0];
    this._vantaEffect = vanta({
      el: '#vanta',
      color:0x100a,
      waveHeight:20,
      shininess: 50,
      waveSpeed:0.5,
      zoom:0.75,   
      THREE: THREE,    
    });
  }

  ngAfterViewInit():void{
    //Initial delay 10 seconds and interval countdown also 10 second
     this._timerSubscription = timer(10000, 10000) .subscribe(() => {

          //console.log("hexColor:",this.getNextColor());
          this._vantaEffect.setOptions({
            color: this.getNextColor(),
          });

     });
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


  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}