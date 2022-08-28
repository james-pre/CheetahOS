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

    const dirPath = '/desktop';

    this.simpleReadWriteTestAsync2(dirPath);
  }


  simpleReadWriteTestAsync2(dirPath:string){
    const test = this._fileSytem.fileSystem;

    // eslint-disable-next-line prefer-const
    let arr:string[] = [];
      new Promise(function(resolve, reject) {

        const interval = setInterval(async () => {

            test.readdir(dirPath, function(err, contents = []) {
              if(err){
                  console.log('Getting Directory List:', err)
                  reject(err); 
              }else{
                console.log('this is content:',contents);
                arr = contents;
                clearInterval(interval);
                resolve(contents);
              }
            });

        }, 50);

      }).then((arr) => { 
        this._files = arr as string[];
      }).then(() => { 
        
        console.log('whats in files',this._files) 
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


  simpleReadWriteTestAsync(){
    const test = this._fileSytem.fileSystem;
    const dirPath = '/desktop';

    // eslint-disable-next-line prefer-const, no-var
    var result:string[] =  [];
    // eslint-disable-next-line prefer-const
    const checkExist = setInterval(function(){

        test.readdir(dirPath, function(err, contents = []) {
          if(err){
              console.log('Getting Directory List:', err)
          }else{
            result = contents;
            console.log('this is content:',contents);
            clearInterval(checkExist);
          }
        });
    }, 80); 

    if(result.length > 0)
        console.log('this is result:',result);

  }


  simpleReadWriteTestAsync3(dirPath:string){
    const test = this._fileSytem.fileSystem;


    new Promise(function(resolve, reject) {
      test.readdir(dirPath, function(err, contents = []) {
        if(err){
            console.log('Getting Directory List:', err)
            reject(err); 
        }else{
          console.log('this is content:',contents);
          resolve(contents);
        }
      });

    })

  }



  simpleReadWriteTest(){
    const test = this._fileSytem.fileSystem;
    const dirPath = '/desktop';

    // eslint-disable-next-line prefer-const, no-var
    var result:string[] =  [];
    // eslint-disable-next-line prefer-const
    const checkExist = setInterval(function(){

        test.readdir(dirPath, function(err, contents = []) {
          if(err){
              console.log('Getting Directory List:', err)
          }else{
            result = contents;
            console.log('this is content:',contents);
            clearInterval(checkExist);
          }
        });
    }, 80); 

    if(result.length > 0)
        console.log('this is result:',result);

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
