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
  private _currentSortingOrder!:any;

  private _sorting:SortingInterface ={
    column: 'CPU',
    order: 'asc',
  }


  processes:Process[] =[];
  columns: Array<keyof UserInterface> = ['Name','Status','CPU','Memory','Disk','Network','PID'];
  
  hasWindow = true;
  icon = 'osdrive/icons/taskmanger.png';
  name = 'taskmanager';
  processId = 0;
  type = ComponentType.systemComponent
  displayName = 'Task Manager';

  cpuUtil = 0;
  memUtil = 0;
  diskUtil = 0;
  networkUtil = 0;


  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._processListChangeSub = this._runningProcessService.processListChangeNotify.subscribe(() =>{this.updateRunningProcess();})
    this._currentSortingOrder = this._sorting.order;
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
    this._taskmgrTimerSubscription = timer(1000, 2000).subscribe(() => {
      this.generateNumber();
      this.sortTable(this._sorting.column, false);
    });
  }

  isDescSorting(column: string): boolean {
    return this._sorting.column === column && this._sorting.order === 'desc';
  }

  isAscSorting(column: string): boolean {
    return this._sorting.column === column && this._sorting.order === 'asc';
  }

  setTaskMangrWindowToFocus(pid: number):void {
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  updateRunningProcess():void{
    this.processes = this._runningProcessService.getProcesses();
  }

  sortTable(column: string,  isSortTriggered:boolean): void {

    if(isSortTriggered){
      this._currentSortingOrder = this.isDescSorting(column) ? 'asc' : 'desc';
      this._sorting = {column, order: this._currentSortingOrder };
    }
    // const sortedprocesses:Process[] = this._runningProcessService.getProcesses();
    console.log('sorting col:', column);
   
    console.log(' this.sorting :',  this._sorting );

    if(column == 'CPU'){
      if(this._currentSortingOrder == 'asc'){
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
        if(this.getRandomNums(1,10) > 5){
          tmpProcess.setCpuUsage = this.addTrailingZeros(this.getRandomFloatingNums(0, 100));
        }
        if(this.getRandomNums(1,10) <= 1){
          tmpProcess.setDiskUsage = this.addTrailingZeros(this.getRandomFloatingNums(0, 100));
        }
        if(this.getRandomNums(1,10) > 7){
          tmpProcess.setMemoryUsage = this.addTrailingZeros(this.getRandomFloatingNums(0, 100));
        }
        if(this.getRandomNums(1,10) <= 2){
          tmpProcess.setNetworkUsage = this.addTrailingZeros(this.getRandomFloatingNums(0, 100));
        } 
    }
    this.processes = processes;
  }

  getRandomFloatingNums(min:number, max:number):number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + 10) / 10;
  }

  getRandomNums(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  addTrailingZeros(num:number):number {
    const totalLength = 3;
    const strNum = String(num);

    if(num != 0){
      if(strNum.length == 1)
      return parseFloat(strNum.padEnd(totalLength, '.1'));
    }

    return num;
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
