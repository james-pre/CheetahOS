import {Component} from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { Process } from 'src/app/system-files/process';

@Component({
  selector: 'cos-fileexplorer',
  templateUrl: './fileexplorer.component.html',
  styleUrls: ['./fileexplorer.component.css']
})
export class FileexplorerComponent implements BaseComponent {

  private _processIdService;
  private _runningProcessService;


  hasWindow = true;
  icon = 'osdrive/icons/file_explorer.ico';
  name = 'File Explorer';
  processId = 0;
  type = ComponentType.systemComponent
  directory ='/osdrive/';

  constructor( processIdService:ProcessIDService, runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
  }

  updateIconAndName(updatedData:FileInfo):void{
    console.log('updatedData:',updatedData);
    this.directory = updatedData.getPath;
    this.name = updatedData.getFileName;
    this.icon = updatedData.getIcon;
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
