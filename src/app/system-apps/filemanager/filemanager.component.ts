import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class FilemanagerComponent implements OnInit, OnDestroy {


  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _fileService:FileService
  private _directoryFilesEntires!:FileEntry[];
  private _dirFilesReadySub!: Subscription;
  private _startProcessService:StartProcessService;

  hasWindow = true;
  icon = '';
  name = 'file manager';
  processId = 0;
  type = ComponentType.systemComponent
  directory ='/desktop';
  files:FileInfo[] = [];


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService, fileInfoService:FileService, startProcessService:StartProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._fileService = fileInfoService;
    this._startProcessService = startProcessService;

    this.processId = this._processIdService.getNewProcessId();
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._dirFilesReadySub = this._fileService.dirFilesReadyNotify.subscribe(() =>{this.loadFilesInfo();})
  
  }

  ngOnInit(){
    this._fileService.getFilesFromDirectory(this.directory);
  }

  ngOnDestroy(): void {
    this._dirFilesReadySub?.unsubscribe();
  }
  private  loadFilesInfo(){
    const dirFileEntries =  this._fileService.directoryFiles;
    this._directoryFilesEntires = this._fileService.getFileEntriesFromDirectory(dirFileEntries,this.directory);
 
      for(let i = 0; i < this._directoryFilesEntires .length; i++){
        const fileEntry = this._directoryFilesEntires[i];
        const fileInfo = this._fileService.getFileInfo(fileEntry.getPath);
        this.files.push(fileInfo)
      }
  }


  // private async loadFilesInfo(){
  //   this._directoryFilesEntires = await this._fileService.getFileEntriesFromDirectory(this.directory);
  //   const dirFileEntries = this._directoryFilesEntires;
  //   console.log("this is file entry count:", this._directoryFilesEntires.length)
    
  //     for(let i = 0; i < dirFileEntries.length; i++){
  //       const fileEntry = dirFileEntries[i];
  //       console.log("this is file entry", fileEntry)
  //       // const fileInfo = this._fileService.getFileInfo(fileEntry.getPath);
  //       // this.files.push(fileInfo)
  //     }
  // }


  runProcess(appName:string):void{

    this._startProcessService.startApplication(appName);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
  }
}


