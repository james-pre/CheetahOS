import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GeneralFunctions } from 'src/app/shared/system-util/general.functions';
import { Clock } from './clock';
//import { timer,Subscription } from 'rxjs';

@Component({
  selector: 'cos-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, AfterViewInit {

  currentTime = '';
  taskBarClock:Clock;
  processId = 0;
  generalFunction: GeneralFunctions = GeneralFunctions.getInstance()
  //subscribeClock!:number;

  constructor() { 
   this.processId = this.generalFunction.getNewProcessId()
    const dateTime = new Date()
    this.taskBarClock = new Clock(dateTime.getSeconds(),dateTime.getMinutes(),dateTime.getHours())
  }

  ngOnInit(): void {
    1 + 1;
  }

  // oberserableTimer() {
  //   const source = timer(1000, 1000);
  //   const abc = source.subscribe(val => {
  //     console.log(val, '-');
  //     this.subscribeClock = this.timeLeft - val;
  //   });
  // }

  ngAfterViewInit(): void {
    this.startTimer();
  }


  startTimer() {
    setInterval(() => {
      this.taskBarClock.tick()
      this.currentTime = `${this.taskBarClock.getHours}:${this.taskBarClock.getMinutes}`
      console.log('this is current tuime:',this.currentTime)
    }, 1000);
  }

  // run(ticker:number):void{
          
  //   while(this.taskBarClock.getSeconds <= 60){

  //       if(this.taskBarClock.getSeconds == 60){

  //           this.taskBarClock.setMinutes++;
  //           this.taskBarClock.setSeconds = 0
  //       }

  //       if(this.taskBarClock.getMinutes >= 60){

  //           this.taskBarClock.setHours++;
  //           this.taskBarClock.setMinutes = 0
  //       }

  //       if(this.taskBarClock.getHours >= 24){

  //           this.taskBarClock.setHours = 0
  //       }

  //     this.currentTime = `${this.taskBarClock.getMinutes}:${this.taskBarClock.getHours}`
  //   }

  // }

}
