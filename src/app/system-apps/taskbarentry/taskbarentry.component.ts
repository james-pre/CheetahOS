import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cos-taskbarentry',
  templateUrl: './taskbarentry.component.html',
  styleUrls: ['./taskbarentry.component.css']
})
export class TaskbarentryComponent implements OnInit {

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
