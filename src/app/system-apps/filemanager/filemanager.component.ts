import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
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

@Component({
  selector: 'cos-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements  OnInit, AfterViewInit, OnDestroy {
  @ViewChild('myBounds', {static: true}) myBounds!: ElementRef;
  
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
  directory ='/osdrive/Desktop';
  files:FileInfo[] = [];

  gridSize = 90; //column size of grid = 90px
  SECONDS_DELAY = 6000;
  private autoAlign = true;
  private autoArrange = false;
  private showDesktopIcon = true;

  isFormSubmitted = false;
  isRenameActive = false;
  isIconInFocusDueToPriorAction = false;
  private selectedFile!:FileInfo;
  renameForm!: FormGroup;
  selectedElementId = -1;
  prevSelectedElementId = -1;

  hideCntxtMenuEvtCnt = 0; // this is a dirty solution
  renameFileTriggerCnt = 0; // this is a dirty solution
  btnClickCnt = 0; // this is a dirty solution

  isbtnClickEvt= false;
  isHideCntxtMenuEvt= false;


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
      renameInput: '',
    });

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
        await this.loadFilesInfoAsync();
    }else{
        this._triggerProcessService.startApplication(file);
    }
  }

  onBtnClick(id:number):void{
    this.doBtnClickThings(id);
    this.setBtnStyle(id, true);

    console.log('onBtnClick-btnClickCnt:', this.btnClickCnt);
    console.log('onBtnClick-hideCntxtMenuEvtCnt:', this.hideCntxtMenuEvtCnt);
  }

  onTriggerRunProcess():void{
    this.runProcess(this.selectedFile);
  }

  onShowIconContextMenu(evt:MouseEvent, file:FileInfo, id:number):void{
    this._runningProcessService.responseToEventCount++;
    this.selectedFile = file;

    // show IconContexMenu is still a btn click, just a different type
    this.doBtnClickThings(id);

    this.iconCntxtMenuStyle = {
      'display': 'block', 
      'width': '205px', 
      'transform':`translate(${String(evt.clientX)}px, ${String(evt.clientY)}px)`,
      'z-index': 2,
      'opacity':1
    }

    evt.preventDefault();
  }

  doBtnClickThings(id:number):void{
      this.prevSelectedElementId = this.selectedElementId 
      this.selectedElementId = id;
  
      this.isbtnClickEvt = true;
      this.btnClickCnt++;
      this.isHideCntxtMenuEvt = false;
      this.hideCntxtMenuEvtCnt = 0;
  
      if(this.prevSelectedElementId != id){
        this.removeBtnStyle(this.prevSelectedElementId);
      }
  }

  hideIconContextMenu():void{
    this.iconCntxtMenuStyle = {
      'display': 'none', 
    }
  }
  onHideIconContextMenu():void{
    this.iconCntxtMenuStyle = {
      'display': 'none', 
    }

    //First case - I'm clicking only on the desktop icons
    if((this.isbtnClickEvt && this.btnClickCnt >= 1) && (!this.isHideCntxtMenuEvt && this.hideCntxtMenuEvtCnt == 0)){

      console.log('1st-onHideIconContextMenu-btnClickCnt:', this.btnClickCnt);
      console.log('1st-onHideIconContextMenu-hideCntxtMenuEvtCnt:', this.hideCntxtMenuEvtCnt);
  
      if(this.isRenameActive){
        this.isFormDirty();
      }
      if(this.isIconInFocusDueToPriorAction){
        if(this.hideCntxtMenuEvtCnt >= 0)
          this.setBtnStyle(this.selectedElementId,false);

        this.isIconInFocusDueToPriorAction = false;
      }
      if(!this.isRenameActive){
        this.isbtnClickEvt = false;
        this.btnClickCnt = 0;
      }

    }else{
        this.hideCntxtMenuEvtCnt++;
        this.isHideCntxtMenuEvt = true;
        //Second case - I was only clicking on the desktop
        if((this.isHideCntxtMenuEvt && this.hideCntxtMenuEvtCnt >= 1) && (!this.isbtnClickEvt && this.btnClickCnt == 0)){
          console.log('2nd-onHideIconContextMenu-btnClickCnt:', this.btnClickCnt);
          console.log('2nd-onHideIconContextMenu-hideCntxtMenuEvtCnt:', this.hideCntxtMenuEvtCnt);
          this.btnStyleAndValuesReset();
        }

        //Third case - I was clicking on the desktop icons, then i click on the desktop.
        //clicking on the desktop triggers a hideContextMenuEvt
        if((this.isbtnClickEvt && this.btnClickCnt >= 1) && (this.isHideCntxtMenuEvt && this.hideCntxtMenuEvtCnt > 1)){
          console.log('3rd-onHideIconContextMenu-btnClickCnt:', this.btnClickCnt);
          console.log('3rd-onHideIconContextMenu-hideCntxtMenuEvtCnt:', this.hideCntxtMenuEvtCnt);
          this.btnStyleAndValuesReset();
        }
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
    this.setBtnStyle(id, true);
  }

  onMouseLeave(id:number):void{
    if(id != this.selectedElementId){
      this.removeBtnStyle(id);
    }
    else if((id == this.selectedElementId) && !this.isIconInFocusDueToPriorAction){
      this.setBtnStyle(id,false);
    }
  }

  btnStyleAndValuesReset():void{
    this.isbtnClickEvt = false;
    this.btnClickCnt = 0;
    this.removeBtnStyle(this.selectedElementId);
    this.removeBtnStyle(this.prevSelectedElementId);
    this.selectedElementId = -1;
    this.prevSelectedElementId = -1;
    this.btnClickCnt = 0;
    this.isIconInFocusDueToPriorAction = false;
  }

  removeBtnStyle(id:number):void{
    const btnElement = document.getElementById(`iconBtn${id}`) as HTMLElement;
    if(btnElement){
      btnElement.style.backgroundColor = 'transparent';
      btnElement.style.border = 'none'
    }
  }

  setBtnStyle(id:number, isMouseHover:boolean):void{
    const btnElement = document.getElementById(`iconBtn${id}`) as HTMLElement;
    if(btnElement){
      btnElement.style.backgroundColor = 'hsl(206deg 77% 70%/20%)';
      btnElement.style.border = '2px solid hsla(0,0%,50%,25%)'

      if(this.selectedElementId == id){
        (isMouseHover)? btnElement.style.backgroundColor ='#607c9c' : 
          btnElement.style.backgroundColor = 'hsl(206deg 77% 70%/20%)';
      }
    }
  }

  sortIcons(sortBy:string):void {
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

  async refreshIcons():Promise<void>{
    this.isIconInFocusDueToPriorAction = false;
    await this.loadFilesInfoAsync();
  }

  onDeleteFile():void{
    this._fileService.deleteFileAsync(this.selectedFile.getCurrentPath)
  }

  onInputChange(evt:any):boolean{
    const regexStr = '^[a-zA-Z0-9_.]+$';
    const res = new RegExp(regexStr).test(evt.key)
    if(res){
      this.hideInvalidCharsToolTip();
      return res
    }else{
      this.showInvalidCharsToolTip();

      setTimeout(()=>{ // hide after 6 secs
        this.hideInvalidCharsToolTip();
      },this.SECONDS_DELAY) 

      return res;
    }
  }

  showInvalidCharsToolTip():void{
    // get the position of the textbox
    const toolTipID = 'invalidChars';
    const invalidCharToolTipElement = document.getElementById(toolTipID) as HTMLElement;
    const renameContainerElement= document.getElementById(`renameContainer${this.selectedElementId}`) as HTMLElement;

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

  isFormDirty():void{
    if (this.renameForm.dirty == true){
        this.onTriggerRenameFileStep2();
    }else if(this.renameForm.dirty == false){
      this.renameFileTriggerCnt ++;
      if(this.renameFileTriggerCnt > 1){
        this.untriggerRenameFile();
        this.renameFileTriggerCnt = 0;
      }
    }
  }

  onTriggerRenameFileStep1():void{
    this.isRenameActive = !this.isRenameActive;

    const figCapElement= document.getElementById(`figCap${this.selectedElementId}`) as HTMLElement;
    const renameContainerElement= document.getElementById(`renameContainer${this.selectedElementId}`) as HTMLElement;
    const renameTxtBoxElement= document.getElementById(`renameTxtBox${this.selectedElementId}`) as HTMLInputElement;
    this.removeBtnStyle(this.selectedElementId);
    
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

  async onTriggerRenameFileStep2():Promise<void>{
    this.isRenameActive = !this.isRenameActive;

    const figCapElement= document.getElementById(`figCap${this.selectedElementId}`) as HTMLElement;
    const renameContainerElement= document.getElementById(`renameContainer${this.selectedElementId}`) as HTMLElement;
    const renameText = this.renameForm.value.renameInput as string;

    if(renameText !== '' || renameText.length !== 0){
      await this._fileService.renameFileAsync(this.selectedFile.getCurrentPath, renameText);

      // renamFileAsync, doesn't trigger a reload of the file directory, so to give the user the impression that the file has been updated, the code below
      const fileIdx = this.files.findIndex(f => (f.getCurrentPath == this.selectedFile.getContentPath) && (f.getFileName == this.selectedFile.getFileName));
      this.selectedFile.setFileName = renameText;
      this.selectedFile.setDateModified = Date.now();
      this.files[fileIdx] = this.selectedFile;

      // this.renameForm.controls['renameInput'].setValue('');
      // this.renameForm.reset;
      // await this.loadFilesInfoAsync();
    }

    this.setBtnStyle(this.selectedElementId, false);
   
    if(figCapElement){
      figCapElement.style.display = 'block';
    }

    if(renameContainerElement){
      renameContainerElement.style.display = 'none';
    }
  }

  untriggerRenameFile():void{
    this.isRenameActive = !this.isRenameActive;

    const figCapElement= document.getElementById(`figCap${this.selectedElementId}`) as HTMLElement;
    const renameContainerElement= document.getElementById(`renameContainer${this.selectedElementId}`) as HTMLElement;

    if(figCapElement){
      figCapElement.style.display = 'block';
    }
    if(renameContainerElement){
      renameContainerElement.style.display = 'none';
    }

    this.isIconInFocusDueToPriorAction = true;
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
  }

}
