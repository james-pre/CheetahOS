import { AfterViewInit, Component, Input, OnInit, OnDestroy, EventEmitter, Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FileService } from 'src/app/shared/system-service/file.service';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { FileEntry } from 'src/app/system-files/fileentry';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { Subscription } from 'rxjs';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';

@Component({
  selector: 'cos-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements  OnInit, AfterViewInit, OnDestroy {

  @ViewChild('myBounds', {static: true}) myBounds!: ElementRef;
  @ViewChild('iconBtn', {static: false}) iconBtn!: ElementRef;

 
  @Input() folderPath = '';  
  @Output() updateExplorerIconAndName = new EventEmitter<FileInfo>();
  
  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _fileService:FileService
  private _directoryFilesEntires!:FileEntry[];
  private _dirFilesUpdatedSub!: Subscription;
  private _triggerProcessService:TriggerProcessService;

  private _renderer:Renderer2;


  showCntxtMenu = false;
  iconCntxtMenuStyle:Record<string, unknown> = {};

  hasWindow = false;
  icon = 'osdrive/icons/generic-program.ico';
  name = 'filemanager';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = '';
  directory ='/osdrive/desktop';
  files:FileInfo[] = [];

  gridSize = 0;
  autoAlign = false;
  autoArrange = false;


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService, fileInfoService:FileService, triggerProcessService:TriggerProcessService,renderer: Renderer2) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._fileService = fileInfoService;
    this._triggerProcessService = triggerProcessService;
    this._renderer = renderer;

    this.processId = this._processIdService.getNewProcessId();
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._dirFilesUpdatedSub = this._fileService.dirFilesUpdateNotify.subscribe(() =>{this.loadFilesInfoAsync();})
  }

  ngOnInit():void{
    if(this.folderPath === '')
        this.directory = '/osdrive/desktop';
    else
      this.directory = `/${this.folderPath}`;

    this.hideIconContextMenu();
  }

  async ngAfterViewInit():Promise<void>{
    await this.loadFilesInfoAsync();

    setTimeout(()=> {
        const filePaths = this.files;
        if(filePaths != null || filePaths != undefined){
            for(const filePath of filePaths){
              URL.revokeObjectURL(filePath.getIcon);
            }
        }
    }, 5000);
  }

  ngOnDestroy(): void {
    this._dirFilesUpdatedSub?.unsubscribe();
  }

  onDragOver(event:DragEvent):void{
    event.stopPropagation();
    event.preventDefault();
  }

  async onDrop(event:DragEvent):Promise<void>{
    event.preventDefault();
    let droppedFiles:File[] = [];
    if(event?.dataTransfer?.files){
        // eslint-disable-next-line no-unsafe-optional-chaining
        droppedFiles  = [...event?.dataTransfer?.files];
    }
    
    if(droppedFiles.length >= 1)
        await this._fileService.writeFilesAsync(this.directory, droppedFiles)

  }

  private async loadFilesInfoAsync():Promise<void>{
    this.files = [];
    this._fileService.resetDirectoryFiles();
    //console.log('I was called-loadFilesInfo')TBD
    const dirFileEntries  = await this._fileService.getFilesFromDirectoryAsync(this.directory) as [];
    this._directoryFilesEntires = this._fileService.getFileEntriesFromDirectory(dirFileEntries,this.directory);

    //console.log("this is file entry count:", dirFileEntries)//TBD
    //console.log("this is file entry count:", this._directoryFilesEntires)//TBD
    for(let i = 0; i < dirFileEntries.length; i++){
      const fileEntry = this._directoryFilesEntires[i];
      const fileInfo = await this._fileService.getFileInfoAsync(fileEntry.getPath);
      //console.log("this is fmgr. fileInfo:", fileInfo)//TBD
      this.files.push(fileInfo)
    }
  }

  async runProcess(file:FileInfo):Promise<void>{

    console.log('runProcess:',file)
    // console.log('what was clicked:',file.getFileName +'-----' + file.getOpensWith +'---'+ file.getCurrentPath +'----'+ file.getIcon) TBD
    if((file.getOpensWith == 'fileexplorer' && file.getFileName != 'File Explorer') && file.getFileType =='folder'){
        this.updateExplorerIconAndName.emit(file);
        this.directory = file.getCurrentPath;

        await this.loadFilesInfoAsync();
    }else{
        this._triggerProcessService.startApplication(file);
    }
  }


  showIconContextMenu(evt:MouseEvent, file:FileInfo):void{
    this._runningProcessService.responseToEventCount++;
    const evtRespCount = this._runningProcessService.responseToEventCount;

    console.log('evtRespCount-fileMgr:',evtRespCount);

    this.iconCntxtMenuStyle = {
      'width': '250px', 
      'transform':`translate(${String(evt.clientX)}px, ${String(evt.clientY)}px)`,
      'z-index': 2,
      'opacity':1
    }

  
    evt.preventDefault();
  }

  hideIconContextMenu():void{
    this.iconCntxtMenuStyle = {
      'width': '0px', 
      'height': '0px', 
      'transform': 'translate(-100000px, 100000px)',
      'z-index': -1,
      'opacity':0
    }
  }

  onDragStart(evt:any):void{
    // const rect =  this.myBounds.nativeElement.getBoundingClientRect(); 
    // console.log('start:',evt.id )


    // const btnTransform = window.getComputedStyle(evt)
    // const matrix = new DOMMatrixReadOnly(btnTransform.transform)

    // const transform = {
    //   translateX: matrix.m41,
    //   translateY: matrix.m42
    // }

    // // const transX = matrix.m41;
    // // const transY = matrix.m42;


    // console.log('start-transform:', transform)
    // console.log('rect:',rect )
  }

  onDragEnd(evt:any, evt1:MouseEvent):void{

    const btnTransform = window.getComputedStyle(evt)
    const matrix = new DOMMatrixReadOnly(btnTransform.transform)
    let x = 0;
    let y = 0;

    const transform = {
      translateX: matrix.m41,
      translateY: matrix.m42
    }

    console.log('clientX:',evt.getBoundingClientRect());

    console.log('end-transform:', transform)
    const xRemainder = (transform.translateX % 90);
    const yRemainder = (transform.translateY % 90);

    // 45 is 50% of 90. so i round up to 90 else round down  to 0
    if(xRemainder > 45){ 
      const diff = 90 - xRemainder;
      x = transform.translateX + diff;
      console.log('x >45:', x)
    }else{
      x = transform.translateX - xRemainder; 
      console.log('x <45:', x)
    }

    if(yRemainder > 45){ 
      const diff = 90 - yRemainder;
      y = transform.translateY + diff;
      console.log('y >45:', y)
    }else{
      y = transform.translateY - yRemainder; 
      console.log('y <45:', y)
    }

    const btnElement = document.getElementById(evt.id) as HTMLElement;
    if(btnElement){
      console.log('btnElement:',btnElement)
      console.log('set button to:',`translate(${x}px, ${y}px)`)
      btnElement.style.transform = `translate(${x}px, ${y}px)`;
    }
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
  }

}



