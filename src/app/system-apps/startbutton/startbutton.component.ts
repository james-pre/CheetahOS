import { Component, OnInit } from '@angular/core';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'cos-startbutton',
  templateUrl: './startbutton.component.html',
  styleUrls: ['./startbutton.component.css']
})
export class StartbuttonComponent implements OnInit {

  faWindows = faWindows;
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
