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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from './file.manager.validator';

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
  private _fileService:FileService;
  private _directoryFilesEntires!:FileEntry[];
  private _triggerProcessService:TriggerProcessService;
  private _formBuilder;

  private _viewByNotifySub!:Subscription;
  private _sortByNotifySub!:Subscription;
  private _refreshNotifySub!:Subscription;
  private _autoArrangeIconsNotifySub!:Subscription;
  private _autoAlignIconsNotifyBySub!:Subscription;
  private _showDesktopIconNotifySub!:Subscription;
  private _dirFilesUpdatedSub!: Subscription;

  iconCntxtMenuStyle:Record<string, unknown> = {};
  iconSizeStyle:Record<string, unknown> = {};
  btnStyle:Record<string, unknown> = {};

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
  private showDesktopIcon = true;

  isFormSubmitted = false;
  isRenameActive = false;
  isIconHighlightActive = false;
  private selectedFile!:FileInfo;
  renameForm!: FormGroup;
  elementId = -1;

  hideCntxtMenuEvtCnt = 0; // this is a dirty solution
  renameFileTriggerCnt = 0; // this is a dirty solution


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService, fileInfoService:FileService, triggerProcessService:TriggerProcessService, fileManagerService:FileManagerService, formBuilder: FormBuilder,) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._fileService = fileInfoService;
    this._triggerProcessService = triggerProcessService;
    this._formBuilder = formBuilder;

    this.processId = this._processIdService.getNewProcessId();
    this._runningProcessService.addProcess(this.getComponentDetail());

    this._dirFilesUpdatedSub = this._fileService.dirFilesUpdateNotify.subscribe(() =>{this.loadFilesInfoAsync()});
    this._viewByNotifySub = fileManagerService.viewByNotify.subscribe((p) =>{this.changeIconsSize(p)});
    this._sortByNotifySub = fileManagerService.sortByNotify.subscribe((p)=>{this.sortIcons(p)});
    this._autoArrangeIconsNotifySub = fileManagerService.autoArrangeIconsNotify.subscribe((p) =>{this.toggleAutoArrangeIcons(p)});
    this._autoAlignIconsNotifyBySub = fileManagerService.alignIconsToGridNotify.subscribe((p) => {this.toggleAutoAlignIconsToGrid(p)});
    this._refreshNotifySub = fileManagerService.refreshNotify.subscribe(()=>{this.refreshIcons()});
    this._showDesktopIconNotifySub = fileManagerService.showDesktopIconsNotify.subscribe((p) =>{this.toggleDesktopIcons(p)});
  }

  ngOnInit():void{

    this.renameForm = this._formBuilder.nonNullable.group({
      renameInput: ['',[Validators.required, CustomValidator.invalidCharacters()]],
    });

    if(this.folderPath === '')
        this.directory = '/osdrive/desktop';
    else
      this.directory = `/${this.folderPath}`;

    this.onHideIconContextMenu();
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
    this._showDesktopIconNotifySub?.unsubscribe();
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
    const dirFileEntries  = await this._fileService.getFilesFromDirectoryAsync(this.directory) as [];
    this._directoryFilesEntires = this._fileService.getFileEntriesFromDirectory(dirFileEntries,this.directory);

    for(let i = 0; i < dirFileEntries.length; i++){
      const fileEntry = this._directoryFilesEntires[i];
      const fileInfo = await this._fileService.getFileInfoAsync(fileEntry.getPath);

      this.files.push(fileInfo)
    }
  }

  async runProcess(file:FileInfo):Promise<void>{

    console.log('runProcess:',file)
    // console.log('what was clicked:',file.getFileName +'-----' + file.getOpensWith +'---'+ file.getCurrentPath +'----'+ file.getIcon) TBD
    if((file.getOpensWith === 'fileexplorer' && file.getFileName !== 'File Explorer') && file.getFileType ==='folder'){
        this.updateExplorerIconAndName.emit(file);
        this.directory = file.getCurrentPath;

        await this.loadFilesInfoAsync();
    }else{
        this._triggerProcessService.startApplication(file);
    }
  }

  onTriggerRunProcess():void{
    this.runProcess(this.selectedFile);
  }


  onShowIconContextMenu(evt:MouseEvent, file:FileInfo, id:number):void{
    this.elementId = id;
    this._runningProcessService.responseToEventCount++;
    this.selectedFile = file;

    this.iconCntxtMenuStyle = {
      'width': '205px', 
      'transform':`translate(${String(evt.clientX)}px, ${String(evt.clientY)}px)`,
      'z-index': 2,
      'opacity':1
    }

    evt.preventDefault();
  }

  onHideIconContextMenu():void{
    this.iconCntxtMenuStyle = {
      'width': '0px', 
      'height': '0px', 
      'transform': 'translate(-100000px, 100000px)',
      'z-index': -1,
      'opacity':0
    }

    this.hideCntxtMenuEvtCnt++;

    if(this.isRenameActive){
      //this.isFormDirty();
    }
    if(this.isIconHighlightActive){
      this.iconWasInfocus();
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

  onMouseEnter(id:number):void{
    const btnElement = document.getElementById(`iconBtn${id}`) as HTMLElement;
    if(btnElement){
      btnElement.style.backgroundColor = 'hsl(206deg 77% 70%/20%)';
      btnElement.style.border = '2px solid hsla(0,0%,50%,25%)'
    }
  }

  onMouseLeave(id:number):void{
    const btnElement = document.getElementById(`iconBtn${id}`) as HTMLElement;
    if(id != this.elementId){
      if(btnElement){
        btnElement.style.backgroundColor = 'transparent';
        btnElement.style.border = 'none'
      }
    }else if((id == this.elementId) && this.isIconHighlightActive){
      this.iconWasInfocus();
    }
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
    if(iconSize === 'Large Icons'){
      this.iconSizeStyle = {
        'width': '45px', 
        'height': '45px'
      }
    }

    if(iconSize === 'Medium Icons'){
      this.iconSizeStyle = {
        'width': '35px', 
        'height': '35px'
      }
    }

    if(iconSize === 'Small Icons'){
      this.iconSizeStyle = {
        'width': '30px', 
        'height': '30px'
      }
    }
  }

  toggleDesktopIcons(showIcons:boolean):void{
    this.showDesktopIcon = showIcons;
    if(!this.showDesktopIcon){
      this.btnStyle ={
        'display': 'none',
      }
    }else{
      this.btnStyle ={
        'display': 'block',
      }
    }
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

  onDeleteFile():void{
    this._fileService.deleteFileAsync(this.selectedFile.getCurrentPath)
  }

  isFormDirty(): void {
    // form is not dirty and not submitted

    console.log('this.isFormSubmitted :',this.isFormSubmitted);
    console.log('this.renameForm.dirty  :',this.renameForm.dirty );
    console.log('this.renameForm.valid  :',this.renameForm.valueChanges );

    if (this.renameForm.dirty == true && this.renameForm.valid){
      console.log('nothing changed')
    } else if (this.renameForm.dirty == false){
      this.renameFileTriggerCnt ++;

      if(this.renameFileTriggerCnt > 1){
        // the first trigger is a false 
        console.log('nothing changed 2')
        // hide renameText box and show figCaption
        this.untriggerRenameFile();

        this.renameFileTriggerCnt = 0;
        this.hideCntxtMenuEvtCnt = 0;
      }

      //return false;
    }
    

    // form is dirty and not submitted
    //return true;


  }

  onTriggerRenameFileStep1():void{
    this.isRenameActive = !this.isRenameActive;

    const figCapElement= document.getElementById(`figCap${this.elementId}`) as HTMLElement;
    const renameContainerElement= document.getElementById(`renameContainer${this.elementId}`) as HTMLElement;
    const renameTxtBoxElement= document.getElementById(`renameTxtBox${this.elementId}`) as HTMLInputElement;

    if(figCapElement){
      figCapElement.style.display = 'none';
    }

    if(renameContainerElement){
      renameContainerElement.style.display = 'block';

      this.renameForm.setValue({
        renameInput:this.selectedFile.getFileName
      })

      renameTxtBoxElement?.focus();
      renameTxtBoxElement?.select();
    }
  }

  onTriggerRenameFileStep2():void{

    const btnElement = document.getElementById(`iconBtn${this.elementId}`) as HTMLElement;
    const figCapElement= document.getElementById(`figCap${this.elementId}`) as HTMLElement;
    const renameContainerElement= document.getElementById(`renameContainer${this.elementId}`) as HTMLElement;

    const renameText = this.renameForm.value.renameInput as string
    if( renameText === '' || renameText.length == 0)
      return;

    this._fileService.renameFileAsync(this.selectedFile.getCurrentPath, renameText);

    if(btnElement){
      btnElement.style.backgroundColor = 'hsl(206deg 77% 70%/20%)';
      btnElement.style.border = '2px solid hsla(0,0%,50%,25%)'
    }

    if(figCapElement){
      figCapElement.style.display = 'block';
    }

    if(renameContainerElement){
      renameContainerElement.style.display = 'none';
    }

    //this.elementId = -1;
  }

  untriggerRenameFile():void{
    this.isRenameActive = !this.isRenameActive;

    const btnElement = document.getElementById(`iconBtn${this.elementId}`) as HTMLElement;
    const figCapElement= document.getElementById(`figCap${this.elementId}`) as HTMLElement;
    const renameContainerElement= document.getElementById(`renameContainer${this.elementId}`) as HTMLElement;

    if(figCapElement){
      figCapElement.style.display = 'block';
    }
    if(renameContainerElement){
      renameContainerElement.style.display = 'none';
    }
    if(btnElement){
      btnElement.style.backgroundColor = 'hsl(206deg 77% 70%/20%)';
      btnElement.style.border = '2px solid hsla(0,0%,50%,25%)'
      this.isIconHighlightActive = true;
    }
  }

  iconWasInfocus():void{
    const btnElement = document.getElementById(`iconBtn${this.elementId}`) as HTMLElement;

    if(this.hideCntxtMenuEvtCnt >= 1){
      if(btnElement){
        btnElement.style.backgroundColor = 'transparent';
        btnElement.style.border = '1px dotted white'
      }
    }
  }


  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
  }

}
