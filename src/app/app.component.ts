import {Component,AfterViewInit,ViewChild, ViewContainerRef, OnInit} from '@angular/core';
import { ProcessDirectory } from './processDirecotry';
import { ProcessIDGenenrator } from './system-files/process.id.generator';
import { FileSystem } from './system-files/filessystem';

@Component({
  selector: 'cos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

/**
 *  This is the main app component
 */
export class AppComponent implements AfterViewInit, OnInit {
 
  @ViewChild('processContainerRef', { read: ViewContainerRef, static: true })
  public readonly itemViewContainer!: ViewContainerRef

  title = 'CheetahOS';
  processId = 0;
  processDirectory!: ProcessDirectory
  processList:string[] 
  generalFunction: ProcessIDGenenrator = ProcessIDGenenrator.getInstance()
  oneFileSytem:FileSystem;

  constructor(){
    this.processDirectory = new ProcessDirectory()
    this.processList = this.processDirectory.getProcess();
    this.processId = this.generalFunction.getNewProcessId()
    this.oneFileSytem = new FileSystem();
  }

  ngOnInit(): void {
    1 + 1
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

  simpleReadWriteTest(){
    const test = this.oneFileSytem.fileSystem;

    test?.writeFile('/test.txt', 'Cool, I can do this in the browser!', function(err) {
      test?.readFile('/test.txt', function(err, contents) {
        console.log(contents?.toString());
      });
    });
  }

}


