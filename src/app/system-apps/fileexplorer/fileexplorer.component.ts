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
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewOptions } from './fileexplorer.enums';

@Component({
  selector: 'cos-fileexplorer',
  templateUrl: './fileexplorer.component.html',
  styleUrls: ['./fileexplorer.component.css']
})

export class FileexplorerComponent implements  OnInit, AfterViewInit, OnDestroy {
  @ViewChild('fileExplorerContainer', {static: true}) fileExplorerContainer!: ElementRef;
 
  
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

  fxIconCntxtMenuStyle:Record<string, unknown> = {};
  iconSizeStyle:Record<string, unknown> = {};
  btnStyle:Record<string, unknown> = {};

  hasWindow = true;
  icon = 'osdrive/icons/file_explorer.ico';
  name = 'fileexplorer';
  processId = 0;
  type = ComponentType.systemComponent;
  directory ='/osdrive/';
  displayName = 'File Explorer';


  files:FileInfo[] = [];

  private showDesktopIcon = true;

  isFormSubmitted = false;
  isRenameActive = false;
  isSearchBoxNotEmpty = false;
  isHighlighIconDueToPriorActionActive = false;
  private selectedFile!:FileInfo;
  selectedElementId = -1;
  prevSelectedElementId = -1;

  hideCntxtMenuEvtCnt = 0; // this is a dirty solution
  renameFileTriggerCnt = 0; // this is a dirty solution

  viewOptions = ViewOptions.MEDIUM_ICON_VIEW;

  readonly smallIconsView = ViewOptions.SMALL_ICON_VIEW;
  readonly mediumIconsView = ViewOptions.MEDIUM_ICON_VIEW;
  readonly largeIconsView = ViewOptions.LARGE_ICON_VIEW;
  readonly listView = ViewOptions.LIST_VIEW;
  readonly detailsView = ViewOptions.DETAILS_VIEW;
  readonly contentView = ViewOptions.CONTENT_VIEW;
  readonly titleView = ViewOptions.TITLE_VIEW;

  renameForm!: FormGroup;
  pathForm!: FormGroup;
  searchForm!: FormGroup;

  searchHistory =['Java','ProgramFile', 'Perenne'];
  pathHistory =['/osdrive/icons','/osdrive/games', '/osdrive/video'];


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService, fileInfoService:FileService, triggerProcessService:TriggerProcessService, fileManagerService:FileManagerService, formBuilder: FormBuilder) { 
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
    this._refreshNotifySub = fileManagerService.refreshNotify.subscribe(()=>{this.refreshIcons()});
    this._showDesktopIconNotifySub = fileManagerService.showDesktopIconsNotify.subscribe((p) =>{this.toggleDesktopIcons(p)});
  }

  ngOnInit():void{
    this.renameForm = this._formBuilder.nonNullable.group({
      renameInput: '',
    });
    this.pathForm = this._formBuilder.nonNullable.group({
      pathInput: '',
    });
    this.searchForm = this._formBuilder.nonNullable.group({
      searchInput: '',
    });

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
    if((file.getOpensWith === 'fileexplorer' && file.getFileName !== 'fileexplorer') && file.getFileType ==='folder'){
        this.directory = file.getCurrentPath;
        this.name = file.getFileName;
        this.icon = file.getIconPath;
        await this.loadFilesInfoAsync();
    }else{
        this._triggerProcessService.startApplication(file);
    }
  }

  onBtnClick(id:number):void{
    this.prevSelectedElementId = this.selectedElementId 
    this.selectedElementId = id;
    this.removeIconWasInfocusStyle(this.prevSelectedElementId);

  }

  onTriggerRunProcess():void{
    this.runProcess(this.selectedFile);
  }

  onShowIconContextMenu(evt:MouseEvent, file:FileInfo, id:number):void{
    const rect =  this.fileExplorerContainer.nativeElement.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    
    this.selectedElementId = id;
    this._runningProcessService.responseToEventCount++;
    this.selectedFile = file;
    this.isHighlighIconDueToPriorActionActive = false;

    this.fxIconCntxtMenuStyle = {
      'width': '205px', 
      'transform':`translate(${String(x)}px, ${String(y)}px)`,
      'z-index': 2,
      'opacity':1
    }

    evt.preventDefault();
  }

  onHideIconContextMenu():void{
    this.fxIconCntxtMenuStyle = {
      'width': '0px', 
      'height': '0px', 
      'transform': 'translate(-100000px, 100000px)',
      'z-index': -1,
      'opacity':0,
    }

    this.hideCntxtMenuEvtCnt++;

    if(this.isRenameActive){
      this.isFormDirty();
    }
    if(this.isHighlighIconDueToPriorActionActive){
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

  onMouseEnter1(id:number):void{
    console.log('mouseEnter1');
    const btnElement = document.getElementById(`iconBtn-${this.processId}-${id}`) as HTMLElement;
    if(btnElement){
      btnElement.style.backgroundColor = 'hsl(206deg 77% 70%/20%)';
      btnElement.style.border = '2px solid hsla(0,0%,50%,25%)'
    }
  }

  onMouseLeave(id:number):void{
    const btnElement = document.getElementById(`iconBtn-${this.processId}-${id}`) as HTMLElement;
    if(id != this.selectedElementId){
      if(btnElement){
        btnElement.style.backgroundColor = 'transparent';
        btnElement.style.border = 'none'
      }
    }else if((id == this.selectedElementId) && this.isHighlighIconDueToPriorActionActive){
      this.iconWasInfocus();
    }
  }

  removeIconWasInfocusStyle(id:number):void{
    const btnElement = document.getElementById(`iconBtn-${this.processId}-${id}`) as HTMLElement;
    if((this.isHighlighIconDueToPriorActionActive) && (id != this.selectedElementId )){
      if(btnElement){
        btnElement.style.backgroundColor = 'transparent';
        btnElement.style.border = 'none'
      }
      this.isHighlighIconDueToPriorActionActive = false;
    }else if((!this.isHighlighIconDueToPriorActionActive) && (id != this.selectedElementId )){
      if(btnElement){
        btnElement.style.backgroundColor = 'transparent';
        btnElement.style.border = 'none'
      }
    }
    this.prevSelectedElementId = -1;
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

  async refreshIcons():Promise<void>{
    this.isHighlighIconDueToPriorActionActive = false;
    await this.loadFilesInfoAsync();
  }

  onDeleteFile():void{
    this._fileService.deleteFileAsync(this.selectedFile.getCurrentPath)
  }

  onKeyPress(evt:any):boolean{
    const regexStr = '^[a-zA-Z0-9_]+$';
    const res = new RegExp(regexStr).test(evt.key)

    if(res){
      this.hideInvalidCharsToolTip();
      return res
    }else{
      this.showInvalidCharsToolTip();

      setTimeout(()=>{ // hide after 6 secs
        this.hideInvalidCharsToolTip();
      },6000) 

      return res;
    }
  }

  onInputChange():void{
    const SearchTxtBox = document.getElementById(`searchTxtBox-${this.processId}`) as HTMLInputElement
    const charLength = SearchTxtBox.value.length
    if( charLength > 0){
      this.isSearchBoxNotEmpty = true;
    }else if( charLength <= 0){
      this.isSearchBoxNotEmpty = false;
    }

  }

  showInvalidCharsToolTip():void{
    // get the position of the textbox
    const toolTipID = 'invalidChars';
    const invalidCharToolTipElement = document.getElementById(toolTipID) as HTMLElement;
    const renameContainerElement= document.getElementById(`renameContainer-${this.processId}-${this.selectedElementId}`) as HTMLElement;

    const rect = renameContainerElement.getBoundingClientRect();

    if(invalidCharToolTipElement){
      invalidCharToolTipElement.style.transform =`translate(${rect.x + 2}px, ${rect.y + 2}px)`;
      invalidCharToolTipElement.style.zIndex = '3';
      invalidCharToolTipElement.style.opacity = '1';
      invalidCharToolTipElement.style.transition = 'opacity 0.5s ease';
    }
  }

  hideInvalidCharsToolTip():void{
    const toolTipID = 'invalidChars';
    const invalidCharToolTipElement = document.getElementById(toolTipID) as HTMLElement;

    if(invalidCharToolTipElement){
      invalidCharToolTipElement.style.transform =`translate(${-100000}px, ${100000}px)`;
      invalidCharToolTipElement.style.zIndex = '-1';
      invalidCharToolTipElement.style.opacity = '0';
      invalidCharToolTipElement.style.transition = 'opacity 0.5s ease 1';
    }
  }

  isFormDirty(): void {
    if (this.renameForm.dirty == true){
        this.onTriggerRenameFileStep2();
        this.hideCntxtMenuEvtCnt = 0;
    }else if(this.renameForm.dirty == false){
      this.renameFileTriggerCnt ++;

      if(this.renameFileTriggerCnt > 1){
        this.untriggerRenameFile();

        this.renameFileTriggerCnt = 0;
        this.hideCntxtMenuEvtCnt = 0;
      }
    }
  }

  onTriggerRenameFileStep1():void{
    this.isRenameActive = !this.isRenameActive;

    const figCapElement= document.getElementById(`figCap-${this.processId}-${this.selectedElementId}`) as HTMLElement;
    const renameContainerElement= document.getElementById(`renameContainer-${this.processId}-${this.selectedElementId}`) as HTMLElement;
    const renameTxtBoxElement= document.getElementById(`renameTxtBox${this.processId}-${this.selectedElementId}`) as HTMLInputElement;

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
    this.isRenameActive = !this.isRenameActive;

    const btnElement = document.getElementById(`iconBtn-${this.processId}-${this.selectedElementId}`) as HTMLElement;
    const figCapElement= document.getElementById(`figCap-${this.processId}-${this.selectedElementId}`) as HTMLElement;
    const renameContainerElement= document.getElementById(`renameContainer-${this.processId}-${this.selectedElementId}`) as HTMLElement;

    const renameText = this.renameForm.value.renameInput as string;

    if(renameText !== '' || renameText.length !== 0){
      this._fileService.renameFileAsync(this.selectedFile.getCurrentPath, renameText);

      // renamFileAsync, doesn't trigger a reload of the file directory, so to give the user the impression that the file has been updated, the code below
      const fileIdx = this.files.findIndex(f => (f.getCurrentPath == this.selectedFile.getContentPath) && (f.getFileName == this.selectedFile.getFileName));
      this.selectedFile.setFileName = renameText;
      this.selectedFile.setDateModified = Date.now();
      this.files[fileIdx] = this.selectedFile;
    }

    if(btnElement){
      btnElement.style.backgroundColor = 'hsl(206deg 77% 70%/20%)';
      btnElement.style.border = '2px solid hsla(0,0%,50%,25%)'
      this.isHighlighIconDueToPriorActionActive = true;
    }

    if(figCapElement){
      figCapElement.style.display = 'block';
    }

    if(renameContainerElement){
      renameContainerElement.style.display = 'none';
    }
  }

  untriggerRenameFile():void{
    this.isRenameActive = !this.isRenameActive;

    const btnElement = document.getElementById(`iconBtn-${this.processId}-${this.selectedElementId}`) as HTMLElement;
    const figCapElement= document.getElementById(`figCap-${this.processId}-${this.selectedElementId}`) as HTMLElement;
    const renameContainerElement= document.getElementById(`renameContainer-${this.processId}-${this.selectedElementId}`) as HTMLElement;

    if(figCapElement){
      figCapElement.style.display = 'block';
    }
    if(renameContainerElement){
      renameContainerElement.style.display = 'none';
    }
    if(btnElement){
      btnElement.style.backgroundColor = 'hsl(206deg 77% 70%/20%)';
      btnElement.style.border = '2px solid hsla(0,0%,50%,25%)'
      this.isHighlighIconDueToPriorActionActive = true;
    }
  }

  iconWasInfocus():void{
    const btnElement = document.getElementById(`iconBtn-${this.processId}-${this.selectedElementId}`) as HTMLElement;

    if(this.hideCntxtMenuEvtCnt >= 0){
      if(btnElement){
        btnElement.style.backgroundColor = 'transparent';
        btnElement.style.border = '1px dotted white'
      }
    }
  }




  showSearchHistory():void{
    console.log('whats up');
    const searchHistoryElement = document.getElementById(`searchHistory-${this.processId}`) as HTMLElement;

    if(searchHistoryElement){
      if(this.searchHistory.length > 0){
        searchHistoryElement.style.display = 'block';
      }
    }
    
  }


  hideSearchHistory():void{
    // this.isSearchBoxinFocus = !this.isSearchBoxinFocus ;
    const searchHistoryElement = document.getElementById(`searchHistory-${this.processId}`) as HTMLElement;
    searchHistoryElement.style.display = 'none';
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
  }

}
