import { AfterViewInit, OnInit,OnDestroy, Component } from '@angular/core';
import { Subscription, takeWhile, tap, timer } from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import WAVES from 'vanta/dist/vanta.waves.min';
import BIRDS from 'vanta/dist/vanta.birds.min';
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
// import HALO from 'vanta/dist/vanta.halo.min';
import * as THREE from 'three';


const VANTAS = [
  WAVES,
  BIRDS,
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
  // HALO
];

@Component({
  selector: 'cos-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit, OnDestroy, AfterViewInit{

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _timerSubscription!: Subscription;

  hasWindow = false;
  icon = '';
  name = 'desktop';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = '';
  private vantaEffect: any;

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
    //this.defaultColor = new WAVES('#vanta',0x274c, 20, 50, 0.5, 0.75);
  }


  ngOnInit():void{
   

      //I'm unable to acccess vanta js effect.
      // const effect = VANTA.WAVES({
      //   el: '#my-background',
      //   color: 0x000000
      // })

    1
          
  }

  ngOnDestroy(): void {
    this._timerSubscription?.unsubscribe();
    this.vantaEffect?.destroy();
  }


  ngAfterViewInit():void{
    const vanta = VANTAS[0];
    this.vantaEffect = vanta({
      el: '#vanta',
      color:0x274c,   
      THREE: THREE,    
    });
  }

  private rotateColors():void{

    let counter = 0;
    const colorSet = [0x284a,0x294c,0x304d,0x314b,0x324c,0x334c,0x344c,0x354c,0x364c,0x374c,0x384c,0x394c,0x404c,0x414c]
     this._timerSubscription = timer(1000, 4000) //Initial delay 1 seconds and interval countdown also 4 second
        .pipe( takeWhile(() => counter < 14 ), tap(() => counter++))
        .subscribe(() => {
          if (counter == 14){
               counter = 0
          }
          //this.defaultColor.color = colorSet[counter];
          //VANTA.WAVES(this.defaultColor)
          //VANTA.color = colorSet[counter];

           //I'm unable to acccess vanta js effect.
          // effect.setOptions({
          //   color: 0xff88cc
          // })
        });
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }


}