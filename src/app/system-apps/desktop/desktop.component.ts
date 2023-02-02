import { AfterViewInit, OnInit, Component } from '@angular/core';
import { takeWhile, tap, timer } from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import {WAVES} from './vanta-object/wave';
declare const VANTA:WAVES 

@Component({
  selector: 'cos-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit, AfterViewInit{

  private _processIdService;
  private _runningProcessService;

  hasWindow = false;
  icon = '';
  name = 'desktop';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = '';
  defaultColor!:WAVES;

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
    this.defaultColor = new WAVES('#vanta',0x274c, 20, 50, 0.5, 0.75);
  }


  ngOnInit():void{
    VANTA.WAVES(this.defaultColor)

      //I'm unable to acccess vanta js effect.
      // const effect = VANTA.WAVES({
      //   el: '#my-background',
      //   color: 0x000000
      // })
          
  }


  ngAfterViewInit():void{
    1
    //this.rotateColors();
  }

  private rotateColors():void{

    let counter = 0;
    const colorSet = [0x284a,0x294c,0x304d,0x314b,0x324c,0x334c,0x344c,0x354c,0x364c,0x374c,0x384c,0x394c,0x404c,0x414c]
      timer(1000, 4000) //Initial delay 1 seconds and interval countdown also 4 second
        .pipe( takeWhile(() => counter < 14 ), tap(() => counter++))
        .subscribe(() => {
          if (counter == 14){
               counter = 0
          }
          this.defaultColor.color = colorSet[counter];
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