import { Component, OnInit,OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
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
export class TaskmanagerComponent implements BaseComponent,OnInit,OnDestroy,AfterViewInit {

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _processListChangeSub!: Subscription;
  private _taskmgrTimerSubscription!: Subscription;

  processes:Process[] =[];
  columns: Array<keyof UserInterface> = ['Name','Status','CPU','Memory','Disk','Network','PID'];
  
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
    this._taskmgrTimerSubscription?.unsubscribe()
  }

  ngAfterViewInit(): void {
    //Initial delay 1 seconds and interval countdown also 2 second
    this._taskmgrTimerSubscription = timer(1000, 2000) .subscribe(() => {
      this.generateNumber()
    });
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
    const sortedprocesses:Process[] = this._runningProcessService.getProcesses();
    this.sorting = {
      column,
      order: futureSortingOrder,
    };
    if(column == 'CPU'){
      if(futureSortingOrder == 'asc'){
          this.processes = this.processes.sort((objA, objB) => objB.getCpuUsage - objA.getCpuUsage)
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getCpuUsage - objA.getCpuUsage).reverse();
      }
    } else if (column == 'Memory'){
      this.processes = this._runningProcessService.getProcesses().sort((objA, objB) => objB.getMemoryUsage - objA.getMemoryUsage)
    }else if(column == 'Disk'){
      this.processes = this._runningProcessService.getProcesses().sort((objA, objB) => objB.getDiskUsage - objA.getDiskUsage)
    }else if(column == 'Network'){
      this.processes = this._runningProcessService.getProcesses().sort((objA, objB) => objB.getNetworkUsage - objA.getNetworkUsage)
    }
  }


  generateNumber(){
    const processes:Process[] = this._runningProcessService.getProcesses();
    for(let i =0; i < processes.length; i++){
        const tmpProcess = processes[i];
          tmpProcess.setCpuUsage = this.getRandommNums(0.1, 100);
          tmpProcess.setDiskUsage = this.getRandommNums(0.1, 100);
          tmpProcess.setMemoryUsage = this.getRandommNums(0.1, 100);
          tmpProcess.setNetworkUsage = this.getRandommNums(0.1, 100);
    }
    this.processes = processes;
  }

  getRandommNums(min:number, max:number):number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + 10) / 10;
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
