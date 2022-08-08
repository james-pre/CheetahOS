import {Component,AfterViewInit,ViewChild, ViewContainerRef} from '@angular/core';
import { ProcessDirectory } from './processDirecotry';

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
  processes:string[] = ['./title/title.component'];
  processDirectory: ProcessDirectory = new ProcessDirectory(this.processes)
  processList:string[] = this.processDirectory.getProcess();

  ngAfterViewInit(){
    this.loadApps()
  }

  async loadApps() {
    this.lazyLoadTitleComponment();
  }

  private async lazyLoadTitleComponment() {
    const {TitleComponent} = await import('./title/title.component');
    this.itemViewContainer.createComponent(TitleComponent);
  }

}


