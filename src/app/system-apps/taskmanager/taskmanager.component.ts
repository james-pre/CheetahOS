import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { SortingInterface } from './sorting.interface';
import { UserInterface } from './user.interface';

@Component({
  selector: 'cos-taskmanager',
  templateUrl: './taskmanager.component.html',
  styleUrls: ['./taskmanager.component.css']
})
export class TaskmanagerComponent implements BaseComponent,OnInit,OnDestroy {

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _processListChangeSub!: Subscription;

  processes:Process[] =[];
  columns: Array<keyof UserInterface> = ['name','type','process_id','has_window','cpu','memory'];
  
  hasWindow = true;
  icon = 'osdrive/icons/taskmanger.png';
  name = 'taskmanager';
  processId = 0;
  type = ComponentType.systemComponent
  displayName = 'Task Manager'
  sorting:SortingInterface ={
    column: 'id',
    order: 'asc',
  }

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
  

    this._processListChangeSub = this._runningProcessService.processListChangeNotify.subscribe(() =>{this.updateRunningProcess();})
  }


  ngOnInit(): void {
   this.processes = this._runningProcessService.getProcesses();
  }

 ngOnDestroy(): void {
  this._processListChangeSub?.unsubscribe();
 }

  isDescSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'desc';
  }

  isAscSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'asc';
  }

  setTaskMangrWindowToFocus(pid: number):void {
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  updateRunningProcess():void{
    this.processes = this._runningProcessService.getProcesses();
  }

  sortTable(column: string): void {
    const futureSortingOrder = this.isDescSorting(column) ? 'asc' : 'desc';
    this.sorting = {
      column,
      order: futureSortingOrder,
    };
    if(column == 'cpu'){
      this.processes = this._runningProcessService.getProcesses().sort((objA, objB) => objB.getCpuUsage - objA.getCpuUsage)
    } else if (column == 'memory'){
      this.processes = this._runningProcessService.getProcesses().sort((objA, objB) => objB.getMemoryUsage - objA.getMemoryUsage)
    }else if(column == 'process_id'){
      this.processes = this._runningProcessService.getProcesses().sort((objA, objB) => objB.getProcessId - objA.getProcessId)
    }

  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
