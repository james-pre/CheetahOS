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
import {dirname,basename} from 'path';

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
  private _dirFilesUpdatedSub!: Subscription;


  public _directoryHops:string[] = ['osdrive'];

  fxIconCntxtMenuStyle:Record<string, unknown> = {};
  iconSizeStyle:Record<string, unknown> = {};
  clearSearchStyle:Record<string, unknown> = {};
  searchStyle:Record<string, unknown> = {};
  btnStyle:Record<string, unknown> = {};
  prevNavBtnStyle:Record<string, unknown> = {};
  nextNavBtnStyle:Record<string, unknown> = {};
  recentNavBtnStyle:Record<string, unknown> = {};
  upNavBtnStyle:Record<string, unknown> = {};
  upNavBtnCntnrStyle:Record<string, unknown> = {};

  hasWindow = true;
  icon = 'osdrive/icons/file_explorer.ico';
  navPathIcon = 'osdrive/icons/my_computer.ico'
  name = 'fileexplorer';
  processId = 0;
  type = ComponentType.systemComponent;
  directory ='/osdrive/';
  displayName = 'File Explorer';
  

  files:FileInfo[] = [];
  prevPathEntries:string[] = [];
  nextPathEntries:string[] = [];
  recentPathEntries:string[] = [];
  upPathEntries:string[] = ['/osdrive/Desktop'];



  isPrevBtnActive = false;
  isNextBtnActive = false;
  isUpBtnActive = true;
  isNavigatedBefore = false;
  isFormSubmitted = false;
  isRenameActive = false;
  isSearchBoxNotEmpty = false;
  showPathHistory = false;
  onClearSearchIconHover = false;
  onSearchIconHover = false;
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
  pathHistory =['/osdrive/icons','/osdrive/Games', '/osdrive/Videos'];


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

    this.setNavButtonsColor();
    this.onHideIconContextMenu();
  }

  async ngAfterViewInit():Promise<void>{
    await this.loadFilesInfoAsync();
  }
  

  setNavButtonsColor(){
    this.prevNavBtnStyle ={
      'fill': '#ccc'
    }

    this.nextNavBtnStyle ={
      'fill': '#ccc'
    }

    this.recentNavBtnStyle ={
      'fill': '#ccc'
    }

    this.upNavBtnStyle ={
      'fill': '#fff'
    }
  }

  colorChevron():void{
    this.recentNavBtnStyle ={
      'fill': 'rgb(18, 107, 240)'
    }
  }

  unColorChevron():void{
    this.recentNavBtnStyle ={
      'fill': '#ccc'
    }
  }

  uncolorUpNavArrow():void{
    this.upNavBtnCntnrStyle ={
      'background-color': ''
    }
  }

  colorUpNavArrow():void{
    if(!this.isUpBtnActive){
      this.upNavBtnCntnrStyle ={
        'background-color': ''
      }
    }else{
      this.upNavBtnCntnrStyle ={
        'background-color': '#3f3e3e',
        'transition':'background-color 0.3s ease'
      }
    }
  }

  async goUpAlevel():Promise<void>{
    if(this.upPathEntries.length > 0){

      this.isNavigatedBefore = true;
      const currentDirPath =  this.directory;
      this.prevPathEntries.push(currentDirPath);
      this.isPrevBtnActive = true;
      this.prevNavBtnStyle ={
        'fill': '#fff'
      }


      this.directory = this.upPathEntries.pop() ?? '';
      const folderName = basename(this.directory);

      if(this.upPathEntries.length == 0){
        this.isUpBtnActive = false;
        this.upNavBtnStyle ={
          'fill': '#ccc'
        }
      }

      this.populateHopsList();
      this.setNavPathIcon(folderName,this.directory);
      await this.loadFilesInfoAsync();
    }
  }


  colorPrevNavArrow():void{
    if(!this.isPrevBtnActive){
      this.prevNavBtnStyle ={
        'fill': '#ccc'
      }
    }else{
      this.prevNavBtnStyle ={
        'fill': 'rgb(18, 107, 240)'
      }
    }
  }

  uncolorPrevNavArrow():void{
    this.prevNavBtnStyle ={
      'fill': '#ccc'
    }
  }

  async goBackAlevel():Promise<void>{
    if(this.prevPathEntries.length > 0){

      const currentDirPath =  this.directory;

      const idx = this.upPathEntries.indexOf(currentDirPath);
      if(idx != -1){
        this.upPathEntries.splice(idx,1);
      }else{
        this.upPathEntries.push(currentDirPath);
      }

      const idx1 = this.prevPathEntries.indexOf(currentDirPath);
      if(idx1 != -1){
        this.prevPathEntries.splice(idx1,1);
      }


      this.nextPathEntries.push(currentDirPath);

      this.isNextBtnActive = true;
      this.isUpBtnActive = true;
      this.nextNavBtnStyle ={
        'fill': '#fff'
      }
      this.upNavBtnStyle ={
        'fill': '#fff'
      }

      this.directory = this.prevPathEntries.pop() ?? '';
      const folderName = basename(this.directory);

      if(this.prevPathEntries.length == 0){
        this.isPrevBtnActive = false;
        this.prevNavBtnStyle ={
          'fill': '#ccc'
        }
      }

      this.populateHopsList();
      this.setNavPathIcon(folderName,this.directory);
      await this.loadFilesInfoAsync();
    }
  }


  colorNextNavArrow():void{
    if(!this.isNextBtnActive){
      this.nextNavBtnStyle ={
        'fill': '#ccc'
      }
    }else{
      this.nextNavBtnStyle ={
        'fill': 'rgb(18, 107, 240)'
      }
    }
  }

  uncolorNextNavArrow():void{
    this.nextNavBtnStyle ={
      'fill': '#ccc'
    }
  }

  async goForwardAlevel():Promise<void>{
    if(this.nextPathEntries.length > 0){

      const currentDirPath =  this.directory;
      this.prevPathEntries.push(currentDirPath);
      this.isPrevBtnActive = true;
      this.prevNavBtnStyle ={
        'fill': '#fff'
      }

      // console.log('currentDirPath:',currentDirPath);
      // // console.log('folderName:',folderName)

      const nextDirPath = this.directory = this.nextPathEntries.pop() ?? '';

      // console.log('nextDirPath:',nextDirPath);

      const idx = this.upPathEntries.indexOf(nextDirPath)
      // console.log('idx:',idx)
      if (idx !== -1) {
           this.upPathEntries.splice(idx, 1);
      }else{
        this.upPathEntries.push(nextDirPath);
      }

      if(this.upPathEntries.length == 0){
        this.isUpBtnActive = false;
        this.upNavBtnStyle ={
          'fill': '#ccc'
        }
      }


      const folderName = basename(this.directory);

      if(this.nextPathEntries.length == 0){
        this.isNextBtnActive = false;
        this.nextNavBtnStyle ={
          'fill': '#ccc'
        }
      }

      this.populateHopsList();
      this.setNavPathIcon(folderName,this.directory);
      await this.loadFilesInfoAsync();
    }
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

      if(!this.isNavigatedBefore){
        this.prevPathEntries.push(this.directory);
        this.isNavigatedBefore = true;
      }

      this.isPrevBtnActive = true;
      this.directory = file.getCurrentPath;
      this.name = file.getFileName;
      this.icon = file.getIconPath;

      this.prevPathEntries.push(this.directory);
      this.upPathEntries.push(this.directory);

      this.populateHopsList();
      this.setNavPathIcon(file.getFileName, file.getCurrentPath);
      await this.loadFilesInfoAsync();
    }else{
        this._triggerProcessService.startApplication(file);
    }
  }

  setNavPathIcon(fileName:string, directory:string){
    if(fileName === 'Desktop' && directory === '/osdrive/Desktop'){
      this.navPathIcon = 'osdrive/icons/desktop.ico';
    }
    else if(fileName === 'Documents' && directory === '/osdrive/Documents'){
      this.navPathIcon = 'osdrive/icons/documents.ico';
    }
    else if(fileName === 'Downloads' && directory === '/osdrive/Downloads'){
      this.navPathIcon = 'osdrive/icons/downloads.ico';
    }
    else if(fileName === 'Music' && directory === '/osdrive/Music'){
      this.navPathIcon = 'osdrive/icons/music.png';
    }
    else if(fileName === 'Pictures' && directory === '/osdrive/Pictures'){
      this.navPathIcon = 'osdrive/icons/pictures.ico';
    }
    else if(fileName === 'Videos' && directory === '/osdrive/Videos'){
      this.navPathIcon = 'osdrive/icons/video.ico';
    }
    else if(fileName === 'Games' && directory === '/osdrive/Games'){
      this.navPathIcon = 'osdrive/icons/games.ico';
    }
    else if((fileName === 'fileexplorer' && directory === '/osdrive/') || fileName === 'osdrive' && directory === '/osdrive/'){
      this.navPathIcon = 'osdrive/icons/my_computer.ico';
    }else{
      this.navPathIcon = 'osdrive/icons/folder.ico';
    }
  }

  onBtnFocus(id:number):void{
    this.prevSelectedElementId = this.selectedElementId 
    this.selectedElementId = id;
    this.removeIconWasInfocusStyle(this.prevSelectedElementId);
    this.setBtnToFocus(id);
  }

  onBtnFocusOut(id:number):void{
    this.prevSelectedElementId = this.selectedElementId 
    this.selectedElementId = id;
    this.removeIconWasInfocusStyle(this.prevSelectedElementId);
    this.setBtnToFocuOut(id);
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

  onMouseEnter(id:number):void{
    const btnElement = document.getElementById(`iconBtn-${this.processId}-${id}`) as HTMLElement;
    if(btnElement){
      btnElement.style.backgroundColor = '#4c4c4c';
      btnElement.style.border = '1px solid #3c3c3c';
    }
  }

  setBtnToFocus(id:number):void{
    const btnElement = document.getElementById(`iconBtn-${this.processId}-${id}`) as HTMLElement;
    if(btnElement){
      btnElement.style.backgroundColor = '#777777';
      btnElement.style.border = '1px solid #3c3c3c';
    }
  }

  setBtnToFocuOut(id:number):void{
    const btnElement = document.getElementById(`iconBtn-${this.processId}-${id}`) as HTMLElement;
    if(btnElement){
      btnElement.style.backgroundColor = 'transparent';
      btnElement.style.border = '0.5px solid white'
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

    this.resetSearchIconHiglight();
    this.resetClearSearchIconHiglight();
  }

  onClearSearchTextBox():void{
    const SearchTxtBox = document.getElementById(`searchTxtBox-${this.processId}`) as HTMLInputElement
    SearchTxtBox.value = '';
    this.isSearchBoxNotEmpty = false;

    this.resetSearchIconHiglight();
    this.resetClearSearchIconHiglight();
  }


  handleClearSearchIconHighlights():void{
    this.onClearSearchIconHover = !this.onClearSearchIconHover;

    if(this.isSearchBoxNotEmpty){
      if(this.onClearSearchIconHover){
        this.clearSearchStyle = {
          'background-color': '#3f3e3e',
          'transition': 'background-color 0.3s ease'
        }
      }else if(!this.onClearSearchIconHover){
        this.clearSearchStyle = {
          'background-color': '#191919',
        }
      }
    }
  }

  resetClearSearchIconHiglight():void{
    this.clearSearchStyle = {
      'background-color': '#191919',
    }

    if(!this.isSearchBoxNotEmpty){
      this.onClearSearchIconHover = false;
    }
  }

  handleSearchIconHighlights():void{
    this.onSearchIconHover = !this.onSearchIconHover;

    if(this.isSearchBoxNotEmpty){
      if(this.onSearchIconHover){
        this.searchStyle = {
          'background-color': 'rgb(18, 107, 240)',
          'transition': 'background-color 0.3s ease'
        }
      }else if(!this.onSearchIconHover){
        this.searchStyle = {
          'background-color': 'blue',
        }
      }
    }
  }

  resetSearchIconHiglight():void{

    if(this.isSearchBoxNotEmpty){
      this.searchStyle = {
        'background-color': 'blue',
      }
    }else{
      this.searchStyle = {
        'background-color': '#191919',
      }

      this.onSearchIconHover = false;
    }
  }

  onSearch():void{
    const searchText = this.searchForm.value.searchInput as string;
  }

  showPathTextBox():void{
    const pathTxtBoxElement = document.getElementById(`pathTxtBox-${this.processId}`) as HTMLInputElement;
    const pathIconBoxElement = document.getElementById(`pathIconBox-${this.processId}`) as HTMLElement;

    if(pathTxtBoxElement){
      pathTxtBoxElement.style.display = 'block';

      if(this.showPathHistory){
        if(this.directory === '/osdrive/'){
          this.pathForm.setValue({
            pathInput:'osdrive'
          })
        }
      }else{
        this.pathForm.setValue({
          pathInput:this.directory
        })
      }
      pathTxtBoxElement?.focus();
      pathTxtBoxElement?.select();
    }

    if(pathIconBoxElement){
      pathIconBoxElement.style.display = 'none';
    }
  }

  hidePathTextBox():void{
    const pathTxtBoxElement = document.getElementById(`pathTxtBox-${this.processId}`) as HTMLElement;
    const pathIconBoxElement = document.getElementById(`pathIconBox-${this.processId}`) as HTMLElement;

    if(pathTxtBoxElement){
      pathTxtBoxElement.style.display = 'none';
    }

    if(pathIconBoxElement){
      pathIconBoxElement.style.display = 'flex';
    }
  }

  populateHopsList():void{
    const tmpArray = this.directory.split('/');
    tmpArray.shift();
    this._directoryHops = tmpArray;
    console.log('this._directoryHops:', this._directoryHops);
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
      btnElement.style.backgroundColor = '#4c4c4c';
      btnElement.style.border = '1px solid #3c3c3c';
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
      btnElement.style.backgroundColor = '#4c4c4c';
      btnElement.style.border = '1px solid #3c3c3c';
      this.isHighlighIconDueToPriorActionActive = true;
    }
  }

  iconWasInfocus():void{
    const btnElement = document.getElementById(`iconBtn-${this.processId}-${this.selectedElementId}`) as HTMLElement;

    if(this.hideCntxtMenuEvtCnt >= 0){
      if(btnElement){
        btnElement.style.backgroundColor = 'transparent';
        btnElement.style.border = '0.5px solid white'
      }
    }
  }

  showSearchHistory():void{
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


  hideshowPathHistory():void{
    const pathHistoryElement = document.getElementById(`pathHistory-${this.processId}`) as HTMLElement;
    const hdrNavPathCntnrElement =  document.getElementById(`hdrNavPathCntnr-${this.processId}`) as HTMLElement; 
    const minus24 = hdrNavPathCntnrElement.offsetWidth - 25;

    this.showPathHistory = !this.showPathHistory;

    if(this.showPathHistory){
      if(pathHistoryElement){
        if(this.pathHistory.length > 0){
          pathHistoryElement.style.display = 'block';
          pathHistoryElement.style.width = `${minus24}px`;
        }
      }
    }else if(!this.showPathHistory){
      pathHistoryElement.style.display = 'none';
    }
  }
  
  hidePathHistory():void{
    const pathHistoryElement = document.getElementById(`pathHistory-${this.processId}`) as HTMLElement;
    pathHistoryElement.style.display = 'none';
    this.showPathHistory = false;
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
  }

}
