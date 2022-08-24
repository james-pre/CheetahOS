import { Component, OnInit } from '@angular/core';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'cos-startbutton',
  templateUrl: './startbutton.component.html',
  styleUrls: ['./startbutton.component.css']
})
export class StartbuttonComponent implements OnInit {

  faWindows = faWindows;
  hover = false;

  constructor() { 
    //
  }

  ngOnInit(): void {
    1 + 1;
  }
  
}
