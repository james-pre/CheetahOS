import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProcessIDGenenrator } from 'src/app/system-files/process.id.generator';
import { Clock } from './clock';
import { timer } from 'rxjs';

@Component({
  selector: 'cos-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, AfterViewInit {

  taskBarClock:Clock;
  processId = 0;
  generalFunction: ProcessIDGenenrator = ProcessIDGenenrator.getInstance()
  subscribeClock!:string;
  currrentDate!:string

  constructor() { 
   this.processId = this.generalFunction.getNewProcessId()
    const dateTime = new Date()
    this.taskBarClock = new Clock(dateTime.getSeconds(),dateTime.getMinutes(),dateTime.getHours())
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
    
      this.taskBarClock.tick()
      this.subscribeClock = `${this.taskBarClock.getHourStyle('12hr')}:${this.padSingleDigits(this.taskBarClock.getMinutes)} ${this.taskBarClock.getMeridian}`
    });
  }

  padSingleDigits(n:number){
    return n > 9 ? "" + n: "0" + n;
  }

}
