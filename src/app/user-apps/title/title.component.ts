import { Component } from '@angular/core';
import { GeneralFunctions } from 'src/app/shared/system-util/general.functions';

@Component({
    selector:'cos-title',
  templateUrl: './title.component.html',
  styleUrls: ["./title.component.css"]
})

export class TitleComponent{

  processId = 0;
  generalFunction: GeneralFunctions = GeneralFunctions.getInstance()


  constructor(){
    this.processId = this.generalFunction.getNewProcessId()
  }
   
}