import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cos-taskbarentry',
  templateUrl: './taskbarentry.component.html',
  styleUrls: ['./taskbarentry.component.css']
})
export class TaskbarentryComponent implements OnInit {

  @Input() taskBarIconImgUrl = 'favicon.ico'
  @Input() title = 'test'
  constructor() { 
    //
  }

  ngOnInit(): void {
    1 + 1
  }
}
