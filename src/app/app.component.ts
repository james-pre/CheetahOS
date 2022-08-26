import {Component,AfterViewInit,ViewChild, ViewContainerRef, OnInit} from '@angular/core';
import { FileSystem } from './system-files/filessystem';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { ComponentType } from './system-files/component.types';

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

  private _processIdService;
  private _oneFileSytem:FileSystem;


  hasWindow = false;
  icon = '';
  name = 'CheetahOS';
  processId = 0;
  //I know, I'm cheeting here
  type = ComponentType.systemComponent

  constructor( processIdService:ProcessIDService ){
    this._processIdService = processIdService
    this.processId = this._processIdService.getNewProcessId()
    this._oneFileSytem = new FileSystem();
  }


  ngOnInit(): void {
    1 
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
    const test = this._oneFileSytem.fileSystem;

    test?.writeFile('/test.txt', 'Cool, I can do this in the browser!', function(err) {
      test?.readFile('/test.txt', function(err, contents) {
        console.log(contents?.toString());
      });
    });
  }

}


