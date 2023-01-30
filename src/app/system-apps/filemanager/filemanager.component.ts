import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
export class FilemanagerComponent implements OnInit,AfterViewInit,  OnDestroy {


  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _fileService:FileService
  private _directoryFilesEntires!:FileEntry[];
  private _dirFilesReadySub!: Subscription;
  private _startProcessService:StartProcessService;

  hasWindow = true;
  icon = '';
  name = 'filemanager';
  processId = 0;
  type = ComponentType.systemComponent
  directory ='/osdrive/desktop';
  files:FileInfo[] = [];


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService, fileInfoService:FileService, startProcessService:StartProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._fileService = fileInfoService;
    this._startProcessService = startProcessService;

    this.processId = this._processIdService.getNewProcessId();
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._dirFilesReadySub = this._fileService.dirFilesUpdateNotify.subscribe(() =>{this.loadFilesInfoAsync();})
  
  }

  ngOnInit(){
    //this._fileService.getFilesFromDirectory(this.directory);
    1
  }

  ngAfterViewInit(){
   this.loadFilesInfoAsync();
  }

  ngOnDestroy(): void {
    this._dirFilesReadySub?.unsubscribe();
  }

  onDragOver(event:DragEvent):void{
    event.stopPropagation();
    event.preventDefault();
  }

  onDrop(event:DragEvent):void{

    event.preventDefault();
    const dataTransfer = event.dataTransfer;
    const droppedfile:File = dataTransfer?.files[0] || new File([],'');

    console.log('droppedfile:', droppedfile);
    this._fileService.writeFileAsync(this.directory, droppedfile)
  }

  private async loadFilesInfoAsync(){

    console.log('I was called-loadFilesInfo')
    const dirFileEntries  = await this._fileService.getFilesFromDirectoryAsync(this.directory) as [];
    this._directoryFilesEntires = this._fileService.getFileEntriesFromDirectory(dirFileEntries,this.directory);

    console.log("this is file entry count:", dirFileEntries)
    
      for(let i = 0; i < dirFileEntries.length; i++){
        const fileEntry = this._directoryFilesEntires[i];
        console.log("this is file entry", fileEntry)
        const fileInfo = await this._fileService.getFileInfoAsync(fileEntry.getPath);
        this.files.push(fileInfo)
      }
  }

  runProcess(appName:string):void{

    this._startProcessService.startApplication(appName);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
  }

  // private loadFilesInfo(){
 
  //   const dirFileEntries =  this._fileService.directoryFiles;
  //   this._directoryFilesEntires = this._fileService.getFileEntriesFromDirectory(dirFileEntries,this.directory);

  //   if(this.files.length > 0)
  //     this.files = []
 
  //   for(let i = 0; i < this._directoryFilesEntires .length; i++){
  //     const fileEntry = this._directoryFilesEntires[i];
  //     const fileInfo = this._fileService.getFileInfo(fileEntry.getPath);
  //     this.files.push(fileInfo);
  //   }
  // }
}



