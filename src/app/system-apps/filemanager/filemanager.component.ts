import { AfterViewInit, Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
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
 
  @Input() folderPath = '';  
  @Output() updateExplorerIconAndName = new EventEmitter<FileInfo>();
  
  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _fileService:FileService
  private _directoryFilesEntires!:FileEntry[];
  private _dirFilesUpdatedSub!: Subscription;
  private _triggerProcessService:TriggerProcessService;

  hasWindow = false;
  icon = 'osdrive/icons/generic-program.ico';
  name = 'filemanager';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = '';
  directory ='/osdrive/desktop';
  files:FileInfo[] = [];


  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService, fileInfoService:FileService, triggerProcessService:TriggerProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._fileService = fileInfoService;
    this._triggerProcessService = triggerProcessService;

    this.processId = this._processIdService.getNewProcessId();
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._dirFilesUpdatedSub = this._fileService.dirFilesUpdateNotify.subscribe(() =>{this.loadFilesInfoAsync();})
  }

  ngOnInit():void{
    if(this.folderPath === '')
        this.directory = '/osdrive/desktop';
    else
      this.directory = `/${this.folderPath}`;
  }

  async ngAfterViewInit():Promise<void>{
    await this.loadFilesInfoAsync();

    setTimeout(()=> {
        const filePaths = this.files;
        if(filePaths != null || filePaths != undefined){
            for(const filePath of filePaths){
              //console.log('revoking url:',filePath.getIcon); //TBD
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
    // console.log('what was clicked:',file.getFileName +'-----' + file.getOpensWith +'---'+ file.getCurrentPath +'----'+ file.getIcon) TBD
    if((file.getOpensWith == 'fileexplorer' && file.getFileName != 'File Explorer') && file.getFileType =='folder'){
        this.updateExplorerIconAndName.emit(file);
        this.directory = file.getCurrentPath;

        await this.loadFilesInfoAsync();
    }else{
        this._triggerProcessService.startApplication(file);
    }
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type);
  }

  private revokeUrl():void{

    for(const file of this.files)
      URL.revokeObjectURL(file.getIcon);
  }
}



