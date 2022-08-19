import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cos-taskbarentries',
  templateUrl: './taskbarentries.component.html',
  styleUrls: ['./taskbarentries.component.css']
})
export class TaskbarentriesComponent implements OnInit {

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
