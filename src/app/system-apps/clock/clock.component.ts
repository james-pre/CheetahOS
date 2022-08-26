import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Clock } from './clock';
import { timer } from 'rxjs';
import { ComponentType } from 'src/app/system-files/component.types';
import { ProcessIDServoce } from 'src/app/shared/system-service/process.id.service';

@Component({
  selector: 'cos-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, AfterViewInit {

  private _processIdService;
  private _taskBarClock:Clock;
  subscribeClock!:string;
  currrentDate!:string


  hasWinow = false;
  icon = '';
  name = 'clock';
  processId = 0;
  type = ComponentType.systemComponent

  constructor(processIdService:ProcessIDServoce) { 
    this._processIdService = processIdService
    this.processId = this._processIdService.getNewProcessId()
    const dateTime = new Date()
    this._taskBarClock = new Clock(dateTime.getSeconds(),dateTime.getMinutes(),dateTime.getHours())
    this.currrentDate = `${dateTime.getMonth()}/${this.padSingleDigits(dateTime.getDay())}/${dateTime.getFullYear()}`
  }

  ngOnInit(): void {
    1 + 1;
  }

  
  ngAfterViewInit(): void {
    this.oberserableTimer();
  }

  oberserableTimer() {
 
    timer(1000, 1000).subscribe(() => {
    
      this._taskBarClock.tick()
      this.subscribeClock = `${this._taskBarClock.getHourStyle('12hr')}:${this.padSingleDigits(this._taskBarClock.getMinutes)} ${this._taskBarClock.getMeridian}`
    });
  }

  padSingleDigits(n:number){
    return n > 9 ? "" + n: "0" + n;
  }

}
