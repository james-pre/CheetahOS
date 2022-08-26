import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';

@Component({
  selector: 'cos-taskbarentries',
  templateUrl: './taskbarentries.component.html',
  styleUrls: ['./taskbarentries.component.css']
})
export class TaskbarentriesComponent implements OnInit, AfterViewInit {

  private _processIdService;
  private _runningProcessService;
  
  runningProcess:Process[] = []

  hasWindow = false;
  icon = '';
  name = 'task bar entry';
  processId = 0;
  type = ComponentType.systemComponent

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());

    this._runningProcessService.subject.subscribe(() =>{this.updateRunningProcess();})
  }


  ngOnInit(): void {
    1
  }
  
  ngAfterViewInit(): void {
    this.runningProcess = this._runningProcessService.getProcess().filter(p => p.getType == ComponentType.userComponent);
    console.log('count of proc:', this._runningProcessService.processCount())
  }

  updateRunningProcess(){
    this.runningProcess = this._runningProcessService.getProcess().filter(p => p.getType == ComponentType.userComponent);
    console.log('updated count of proc:', this._runningProcessService.processCount())
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
