import { AfterViewInit, Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FileService } from 'src/app/shared/system-service/file.service';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { FileEntry } from 'src/app/system-files/fileentry';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { Subscription } from 'rxjs';
import { StartProcessService } from 'src/app/shared/system-service/start.process.service';

@Component({
  selector: 'cos-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements  OnInit, AfterViewInit, OnDestroy {
 
  @Input() folderPath = '';  
  @Output() updateExplorerIconAndName = new EventEmitter<FileInfo>();
  
  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _fileService:FileService
  private _directoryFilesEntires!:FileEntry[];
  private _dirFilesUpdatedSub!: Subscription;
  private _startProcessService:StartProcessService;

  hasWindow = false;
  icon = '';
  name = 'filemanager';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = '';
  directory ='/osdrive/desktop';
  files:FileInfo[] = [];


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService, fileInfoService:FileService, startProcessService:StartProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._fileService = fileInfoService;
    this._startProcessService = startProcessService;

    this.processId = this._processIdService.getNewProcessId();
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._dirFilesUpdatedSub = this._fileService.dirFilesUpdateNotify.subscribe(() =>{this.loadFilesInfoAsync();})
  }

  ngOnInit(): void {
    if(this.folderPath === '')
        this.directory = '/osdrive/desktop';
    else
      this.directory = `/${this.folderPath}`;
  }


  ngAfterViewInit(){
   this.loadFilesInfoAsync();
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
    const dataTransfer = event.dataTransfer;
    const droppedfile:File = dataTransfer?.files[0] || new File([],'');

    if(droppedfile){
      //console.log('droppedfile:', droppedfile) TBD;
      await this._fileService.writeFileAsync(this.directory, droppedfile)
    }

  }

  private async loadFilesInfoAsync(){
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
    // console.log('what was clicked:',file.getFileName +'-----' + file.getOpensWith +'---'+ file.getPath +'----'+ file.getIcon) TBD
    if((file.getOpensWith == 'fileexplorer' && file.getFileName != 'File Explorer') && file.getFileType =='folder'){
        this.updateExplorerIconAndName.emit(file);
        this.directory = file.getPath;

        await this.loadFilesInfoAsync();
    }else{
        this._startProcessService.startApplication(file.getOpensWith);
    }
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
  }
}



