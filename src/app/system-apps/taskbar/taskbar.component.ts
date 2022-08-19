import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cos-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {

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
