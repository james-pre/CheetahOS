import {Component,AfterViewInit,ViewChild, ViewContainerRef, ComponentRef, ViewRef} from '@angular/core';
import { FileSystem } from './system-files/filessystem';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { ComponentType } from './system-files/component.types';
import { RunningProcessService } from './shared/system-service/running.process.service';
import { Process } from './system-files/process';

@Component({
  selector: 'cos-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

/**
 *  This is the main app component
 */
export class AppComponent implements AfterViewInit {
 
  @ViewChild('processContainerRef',  { read: ViewContainerRef })
  private itemViewContainer!: ViewContainerRef

  private _processIdService:ProcessIDService;
  private _runningProcessService;
  private _fileSytem:FileSystem;
  private _componentsReferences = Array<ComponentRef<any>>();
  private _componentRefView!:ViewRef;


  hasWindow = false;
  icon = '';
  name = 'CheetahOS';
  processId = 0;
  //I know, I'm cheeting here
  type = ComponentType.systemComponent;
  _files!:string[];


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService ){
    this._processIdService = processIdService
    this.processId = this._processIdService.getNewProcessId()
    this._fileSytem = new FileSystem();

    this._runningProcessService = runningProcessService;
    this._runningProcessService.addProcess(this.getComponentDetail());
  }


  ngAfterViewInit(){ 
    1
    //this.simpleReadWriteTest();

    // const dirPath = '/desktop';

    //  const result = await this.simpleReadWriteTestAsync2(dirPath);
    //  console.log('this is result:',result);
  }


  simpleReadWriteTestAsync2(dirPath:string){
    const test = this._fileSytem.fileSystem;

      // eslint-disable-next-line prefer-const
      let arr:string[] = [];
      const res = new Promise(function(resolve, reject) {

        const interval = setInterval(() => {

            test.readdir(dirPath, function(err, contents = []) {
              if(err){
                  console.log('Getting Directory List:', err)
                  reject(err); 
              }else{

                arr = contents;
                console.log('this is content:',arr);
                clearInterval(interval);
                resolve(arr);
              }
            });

        }, 50);

      })

    return res;
  }


  simpleReadTest(){
    const test = this._fileSytem.fileSystem;
    const dirPath = '/picture';
    //const filePath = '/desktop/heat.txt';
    const filePath = '/picture/favicon.ico';
    //const filePath = '../favicon.ico'; // this worked

    test.readdir(dirPath, function(err, contents = []) {
      if(err){
          console.log('Getting Directory List:', err)
      }else{
        console.log('this is dir content:',contents);
      }
    });

    test.readFile(filePath, function(err, contents) {
      if(err)
          console.log('Oops!:',err)

      console.log('content:',contents);
    });

  }


  async loadApps() {
    this.lazyLoadTitleComponment();
  }

  private async lazyLoadTitleComponment() {
     const {TitleComponent} = await import('./user-apps/title/title.component');
     const componentRef =this.itemViewContainer.createComponent(TitleComponent);
     this._componentsReferences.push(componentRef)

     componentRef.instance.closeBtnClicked.subscribe(evt =>{
          const evtData = evt;
          this.onCloseBtnClicked(evtData);
     });

    //alert subscribers
    this._runningProcessService.subject.next('')
  }



  onCloseBtnClicked(eventData:Process){
   
    const componentToDelete = this._componentsReferences.filter(x => x.instance.processId == eventData.getProcessId)[0];
    this._componentRefView = componentToDelete.hostView;

    // eslint-disable-next-line prefer-const
    let iVCntr  = this.itemViewContainer.indexOf(this._componentRefView);
    this.itemViewContainer.remove(iVCntr);

    this._runningProcessService.removeProcess(eventData)
    this._processIdService.removeProcessId(eventData.getProcessId);

    //alert subscribers
    this._runningProcessService.subject.next('')
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
