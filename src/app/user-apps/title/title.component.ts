import { Component } from '@angular/core';
import { ProcessIDGenenrator } from 'src/app/system-files/process.id.generator';

@Component({
    selector:'cos-title',
  templateUrl: './title.component.html',
  styleUrls: ["./title.component.css"]
})

export class TitleComponent{

  processId = 0;
  generalFunction: ProcessIDGenenrator = ProcessIDGenenrator.getInstance()


  constructor(){
    this.processId = this.generalFunction.getNewProcessId()
  }
   
}