import { AfterViewInit, Component, Input, OnInit, OnDestroy, EventEmitter, Output, ViewChild, ElementRef} from '@angular/core';
import { FileService } from 'src/app/shared/system-service/file.service';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { FileEntry } from 'src/app/system-files/fileentry';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { Subscription } from 'rxjs';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
import { FileManagerService } from 'src/app/shared/system-service/file.manager.services';

@Component({
  selector: 'cos-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements  OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myBounds', {static: true}) myBounds!: ElementRef;
  @Input() folderPath = '';  
  @Output() updateExplorerIconAndName = new EventEmitter<FileInfo>();
  
  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _fileService:FileService
  private _directoryFilesEntires!:FileEntry[];
  private _triggerProcessService:TriggerProcessService;

  private _viewByNotifySub!:Subscription;
  private _sortByNotifySub!:Subscription;
  private _refreshNotifySub!:Subscription;
  private _autoArrangeIconsNotifySub!:Subscription;
  private _autoAlignIconsNotifyBySub!:Subscription;
  private _dirFilesUpdatedSub!: Subscription;

  iconCntxtMenuStyle:Record<string, unknown> = {};

  hasWindow = false;
  icon = 'osdrive/icons/generic-program.ico';
  name = 'filemanager';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = '';
  directory ='/osdrive/desktop';
  files:FileInfo[] = [];

  gridSize = 90;
  private autoAlign = true;
  private autoArrange = false;


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService, fileInfoService:FileService, triggerProcessService:TriggerProcessService, fileManagerService:FileManagerService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._fileService = fileInfoService;
    this._triggerProcessService = triggerProcessService;

    this.processId = this._processIdService.getNewProcessId();
    this._runningProcessService.addProcess(this.getComponentDetail());

    this._dirFilesUpdatedSub = this._fileService.dirFilesUpdateNotify.subscribe(() =>{this.loadFilesInfoAsync()});
    this._viewByNotifySub = fileManagerService.viewByNotify.subscribe((p) =>{this.changeIconsSize(p)});
    this._sortByNotifySub = fileManagerService.sortByNotify.subscribe((p)=>{this.sortIcons(p)});
    this._autoArrangeIconsNotifySub = fileManagerService.autoArrangeIconsNotify.subscribe((p) =>{this.toggleAutoArrangeIcons(p)});
    this._autoAlignIconsNotifyBySub = fileManagerService.alignIconsToGridNotify.subscribe((p) => {this.toggleAutoAlignIconsToGrid(p)});
    this._refreshNotifySub = fileManagerService.refreshNotify.subscribe(()=>{this.refreshIcons()});
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
  }

  ngOnDestroy(): void {
    this._viewByNotifySub?.unsubscribe();
    this._sortByNotifySub?.unsubscribe();
    this._refreshNotifySub?.unsubscribe();
    this._autoArrangeIconsNotifySub?.unsubscribe();
    this._autoAlignIconsNotifyBySub?.unsubscribe();
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

    //console.log('evtRespCount-fileMgr:',evtRespCount);

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

  onDragEnd(evt:any):void{

1
  }


  sortIcons(sortBy:string): void {
    if(sortBy === "Size"){
      this.files = this.files.sort((objA, objB) => objB.getSize - objA.getSize);
    }else if(sortBy === "Date Modified"){
      this.files = this.files.sort((objA, objB) => objB.getDateModified.getTime() - objA.getDateModified.getTime());
    }else if(sortBy === "Name"){
      this.files = this.files.sort((objA, objB) => {
        return objA.getFileName < objB.getFileName ? -1 : 1;
      });
    }else if(sortBy === "Item Type"){
      this.files = this.files.sort((objA, objB) => {
        return objA.getFileType < objB.getFileType ? -1 : 1;
      });
    }
  }

  changeIconsSize(iconSize:string):void{
    //
  }

  toggleAutoAlignIconsToGrid(alignIcon:boolean):void{
    this.autoAlign = alignIcon;
    if(!this.autoAlign){
      this.gridSize = 0;
    }else{
      this.gridSize = 90;
    }
  }

  toggleAutoArrangeIcons(arrangeIcon:boolean):void{

    this.autoArrange = arrangeIcon;

    if(this.autoArrange){
      // clear (x,y) position of icons in memory
      this.refreshIcons();
    }
    
  }

  refreshIcons():void{
    1
  }


  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
  }

}
