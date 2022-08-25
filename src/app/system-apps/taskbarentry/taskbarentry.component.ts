import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cos-taskbarentry',
  templateUrl: './taskbarentry.component.html',
  styleUrls: ['./taskbarentry.component.css']
})
export class TaskbarentryComponent implements OnInit {

  @Input() taskBarIconImgUrl = ''
  @Input() taskBarIconTitle = ''
  constructor() { 
    //
  }

  ngOnInit(): void {
    1 + 1
  }
}
