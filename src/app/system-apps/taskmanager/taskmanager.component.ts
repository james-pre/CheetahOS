import { Component, OnInit,OnDestroy, AfterViewInit} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { SortingInterface } from './sorting.interface';

@Component({
  selector: 'cos-taskmanager',
  templateUrl: './taskmanager.component.html',
  styleUrls: ['./taskmanager.component.css']
})
export class TaskmanagerComponent implements BaseComponent,OnInit,OnDestroy,AfterViewInit {

   //acceess before it exists. So Angular is angry
  // @ViewChild('cpuId',{ static: true }) cpuId!: ElementRef;
  // @ViewChild('memroyId',{ static: true }) memroyId!: ElementRef;
  // @ViewChild('diskId',{ static: true }) diskId!: ElementRef;
  // @ViewChild('networkId',{ static: true }) networkId!: ElementRef;

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _processListChangeSub!: Subscription;
  private _taskmgrTimerSubscription!: Subscription;
  private _currentSortingOrder!:any;
  private _sorting:SortingInterface ={
    column: '',
    order: 'asc',
  }

  processes:Process[] =[];

  hasWindow = true;
  icon = 'osdrive/icons/taskmanger.png';
  name = 'taskmanager';
  processId = 0;
  type = ComponentType.systemComponent
  displayName = 'Task Manager';
  thStyle:Record<string,unknown> = {};

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
      this.thStyle = {
        'background-color': '#f0f0f0'
      }
    }
  
    if(column == 'CPU'){
      if(this._currentSortingOrder == 'asc'){
          this.processes = this.processes.sort((objA, objB) => objB.getCpuUsage - objA.getCpuUsage);
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getCpuUsage - objA.getCpuUsage).reverse();
      }
    } else if (column == 'Memory'){
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => objB.getMemoryUsage - objA.getMemoryUsage);
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getMemoryUsage - objA.getMemoryUsage).reverse();
      }
    }else if(column == 'Disk'){
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => objB.getDiskUsage - objA.getDiskUsage);
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getDiskUsage - objA.getDiskUsage).reverse();
      }
    }else if(column == 'Network'){
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => objB.getNetworkUsage - objA.getNetworkUsage);
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getNetworkUsage - objA.getNetworkUsage).reverse();
      }
    }else if(column == 'PID'){
      this.thStyle = {
        'background-color': 'rgb(224, 224, 139)'
      }
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => objB.getProcessId - objA.getProcessId);
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getProcessId - objA.getProcessId).reverse();
      }
    }else if(column == 'Name'){
      this.thStyle = {
        'background-color': 'rgb(224, 224, 139)'
      }
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => {
          return objA.getProcessName < objB.getProcessName ? -1 : 1
        });
      }else{
        this.processes = this.processes.sort((objA, objB) => {
          return objA.getProcessName < objB.getProcessName ? -1 : 1
        }).reverse();
      }
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
    this.sumRowValues(processes);
  }

  sumRowValues(processes:Process[]):void{
    this.cpuUtil = Math.round(processes.reduce((n, {getCpuUsage}) => n + getCpuUsage, 0));
    this.memUtil = Math.round(processes.reduce((n, {getMemoryUsage}) => n + getMemoryUsage, 0));
    this.diskUtil = Math.round(processes.reduce((n, {getDiskUsage}) => n + getDiskUsage, 0));
    this.networkUtil = Math.round(processes.reduce((n, {getNetworkUsage}) => n + getNetworkUsage, 0));
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

  setUtilColoumnColors(cellValue:number){
    let  baseStyle: Record<string, unknown> = {};
    if(cellValue <= 2.5){
     return baseStyle = {
        'text-align':'right',
        'background-color': 'rgb(224, 224, 139)'
      };
    }else if(cellValue > 2.5 && cellValue <= 5){
      return baseStyle = {
        'text-align':'right',
        'background-color': 'orange'
      };
    }else if(cellValue > 5.0 && cellValue <= 7.5){
      return baseStyle = {
        'text-align':'right',
        'background-color': 'orangered'
      };
    }else if (cellValue > 7.5){
      return baseStyle = {
        'text-align':'right',
        'background-color': 'red', 
      };
    }
    return {};
  }

  setUtilHeaderSpan2section1Colors(cellValue:number, cellName:string){
    let baseStyle:Record<string, unknown> = {};
    const sortColoumn = this._sorting.column;

      //acceess before it exists. So Angular is angry      
      // this.cpuId.nativeElement.style.border = (cellValue >= 50)? '1px solid  #e18888f8': '';
      // this.memroyId.nativeElement.style.border = (cellValue >= 50)? '1px solid  #e18888f8': '';
      // this.diskId.nativeElement.style.border = (cellValue >= 50)? '1px solid  #e18888f8': '';
      // this.networkId.nativeElement.style.border = (cellValue >= 50)? '1px solid  #e18888f8': '';

      if(cellName == sortColoumn){
        if(cellValue < 10){
          return baseStyle= {
             'height':'50%',
             'background-color':'rgb(224, 224, 139)'
           };
         }else if(cellValue >= 10){
           return baseStyle = {
             'height':'50%',
             'background-color': (cellValue >= 90)?  '#e18888f8' : 'rgb(224, 224, 139)',
             'border-left':(cellValue >= 90)? ' #e18888f8': '',
             'border-right':(cellValue >= 90)?' #e18888f8': ''
           };
         }

      }else{
        if(cellValue < 10){
          return baseStyle= {
             'height':'50%',
           };
         }else if(cellValue >= 10){
           return baseStyle = {
             'height':'50%',
             'background-color': (cellValue >= 90)?  '#e18888f8' : '#f0f0f0',
             'border-left':(cellValue >= 90)? ' #e18888f8': '',
             'border-right':(cellValue >= 90)?' #e18888f8': ''
           };
         }
      }
    return {};
  }

  setUtilHeaderSpan2section2Colors(cellValue:number){
    let baseStyle:Record<string, unknown> = {}

    if(cellValue < 10){
     return baseStyle= {
        'padding-left':'22%',
        'display':'inline-block',
        'height':'50%',
        'font-size':'large',
        'width':'65%'
      };
    }else if(cellValue >= 10){
      return baseStyle = {
        'padding-left':'9%',
        'display':'inline-block',
        'height':'50%',
        'font-size':'large',
        'width':'65%'
      };
    }
    return {};
  }

  setUtilHeaderSpan3Colors(cellValue:number, cellName:string){
    
    const baseStyle:Record<string, unknown> =  {
        'padding-left':'55%',
        'height':'50%',
        'padding-top':'5px',
        'font-size':'14px',
        'padding-right':'5px'
     };

     const sortColoumn = this._sorting.column;

    if (cellName == 'CPU'){
      if(cellValue < 10){
        if(sortColoumn == cellName){
          baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        return baseStyle;
       }else if(cellValue >= 10){
        baseStyle['background-color'] =  (cellValue >= 90) ? '#e18888f8' : '#f0f0f0';
        if(sortColoumn == cellName){
          if (cellValue >= 90)
            baseStyle['background-color'] = '#e18888f8';
          else if (cellValue < 90 )
            baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        baseStyle['border'] =  (cellValue >= 90) ? '#e18888f8' : '';
        return baseStyle;
       }
    }

    if (cellName == 'Memory'){
      if(cellValue < 10){
        baseStyle['padding-left'] = '25%';
        if(sortColoumn == cellName){
          baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        return baseStyle;
       }else if(cellValue >= 10){

        baseStyle['padding-left'] = '25%';
        if(sortColoumn == cellName){
          if (cellValue >= 90)
            baseStyle['background-color'] = '#e18888f8';
          else if (cellValue < 90 )
            baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        baseStyle['border'] =  (cellValue >= 90) ? '#e18888f8' : '';
        return baseStyle;
       }
    }

    if (cellName == 'Disk'){
      if(cellValue < 10){
        if(sortColoumn == cellName){
          baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        return baseStyle;
       }else if(cellValue >= 10){
        if(sortColoumn == cellName){
          if (cellValue >= 90)
            baseStyle['background-color'] = '#e18888f8';
          else if (cellValue < 90 )
            baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        baseStyle['border'] =  (cellValue >= 90) ? '#e18888f8' : '';
        return baseStyle;
       }
    }

    if (cellName == 'Network'){
      if(cellValue < 10){
        baseStyle['padding-left'] = '24%';
        if(sortColoumn == cellName){
          baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        return baseStyle;
       }else if(cellValue >= 10){

        baseStyle['padding-left'] = '24%';
        if(sortColoumn == cellName){
          if (cellValue >= 90)
            baseStyle['background-color'] = '#e18888f8';
          else if (cellValue < 90 )
            baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        baseStyle['border'] =  (cellValue >= 90) ? '#e18888f8' : '';
        return baseStyle;
       }
    }

    return {};
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
