import {Component,AfterViewInit,ViewChild, ViewContainerRef, OnInit} from '@angular/core';
import { ProcessDirectory } from './processDirecotry';
import { GeneralFunctions } from './shared/system-util/general.functions';
//import { FSModule } from 'browserfs/dist/node/core/FS';
//import * as BrowserFS from 'browserfs';

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
  // ngOnInit(){

  //   BrowserFS.install(window);
  //     // Configures BrowserFS to use the IndexedDb file system.
  //   BrowserFS.configure({
  //     fs: "IndexedDb"
  //   }, ()=>{
  //     BrowserFS.BFSRequire('fs')
  //   });
  // }

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


