import {Component,AfterViewInit,ViewChild, ViewContainerRef} from '@angular/core';
import { ProcessDirectory } from './processDirecotry';
import { GeneralFunctions } from './shared/system-util/general.functions';

@Component({
  selector: 'cos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

/**
 *  This is the main app component
 */
export class AppComponent implements AfterViewInit {
 
  @ViewChild('processContainerRef', { read: ViewContainerRef, static: true })
  public readonly itemViewContainer!: ViewContainerRef

  title = 'CheetahOS';
  processId = 0;
  processDirectory!: ProcessDirectory
  processList:string[] 
  generalFunction: GeneralFunctions = GeneralFunctions.getInstance()

  constructor(){
    this.processDirectory = new ProcessDirectory()
    this.processList = this.processDirectory.getProcess();
    this.processId = this.generalFunction.getNewProcessId()
  }

  ngAfterViewInit(){
    this.loadApps()
  }

  async loadApps() {
    this.lazyLoadTitleComponment();
  }

  private async lazyLoadTitleComponment() {

     const {TitleComponent} = await import('./user-apps/title/title.component');
     this.itemViewContainer.createComponent(TitleComponent);
  }

}


