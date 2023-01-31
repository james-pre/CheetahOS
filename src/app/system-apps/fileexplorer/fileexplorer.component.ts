import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from 'src/app/shared/system-service/file.service';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { FileEntry } from 'src/app/system-files/fileentry';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { Process } from 'src/app/system-files/process';
import { Subscription } from 'rxjs';
import { StartProcessService } from 'src/app/shared/system-service/start.process.service';

@Component({
  selector: 'cos-fileexplorer',
  templateUrl: './fileexplorer.component.html',
  styleUrls: ['./fileexplorer.component.css']
})
export class FileexplorerComponent implements OnInit, AfterViewInit, OnDestroy, BaseComponent {

  private _processIdService;
  private _runningProcessService;
  private _fileService:FileService;
  private _directoryFilesEntires!:FileEntry[];

  private _dirFilesUpdatedSub!: Subscription;
  private _startProcessService:StartProcessService;

  hasWindow = true;
  icon = 'osdrive/icons/file_explorer.ico';
  name = 'fileexplorer';
  processId = 0;
  type = ComponentType.systemComponent
  directory ='/osdrive/';
  files:FileInfo[] = [];

  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService,  fileInfoService:FileService, startProcessService:StartProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._fileService = fileInfoService;
    this._startProcessService = startProcessService;

    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._dirFilesUpdatedSub = this._fileService.dirFilesUpdateNotify.subscribe(() =>{this.loadFilesInfoAsync();})
  }


  ngOnInit(): void {
   1
  }

  ngAfterViewInit():void{
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

    console.log("this is file entry count:", dirFileEntries)//TBD
    console.log("this is file entry count:", this._directoryFilesEntires)//TBD
    for(let i = 0; i < dirFileEntries.length; i++){
      const fileEntry = this._directoryFilesEntires[i];
      console.log('',)
      const fileInfo = await this._fileService.getFileInfoAsync(fileEntry.getPath);
      this.files.push(fileInfo)
    }
  }

  runProcess(appName:string):void{
    this._startProcessService.startApplication(appName);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
