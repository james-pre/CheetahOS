import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cos-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  simpleNum = 0;
  simpleSqr = 0;

  constructor() { 
    //
    this.simpleNum = 2;
  }

  ngOnInit(): void {
   
    this.simpleSqr = this.simpleNum * this.simpleNum;
  }

}
