import { Component, OnInit,OnDestroy, AfterViewInit, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { Subject, Subscription, interval, switchMap } from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { SortingInterface } from './sorting.interface';
import { StateManagmentService } from 'src/app/shared/system-service/state.management.service';
import { FileInfo } from 'src/app/system-files/fileinfo';
import { RefreshRates, RefreshRatesIntervals, TableColumns } from './taskmanager.enum';
import { TriggerProcessService } from 'src/app/shared/system-service/trigger.process.service';
// import { ResizableTableColumns } from '@validide/resizable-table-columns';
// import { IStore } from 'resizable-options';


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

  @ViewChild('tskMgrTable') tskMgrTable!: ElementRef;


  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _stateManagmentService: StateManagmentService;
  private _triggerProcessService:TriggerProcessService;
  private _renderer: Renderer2;

  private _processListChangeSub!: Subscription;
  private _taskmgrRefreshIntervalSub!: Subscription;
  private _chnageTaskmgrRefreshIntervalSub!:Subject<number>;
  private _currentSortingOrder!:any;

  private _sorting:SortingInterface ={
    column: '',
    order: 'asc',
  }  

  private sleepNumber = 0;
  private sleepCounter = 0;
  private processNumberToSuspend = 0;
  private refreshRateInterval = 0;
  private processIdToClose = 0;

  statusColumnVisible = true;
  cpuColumnVisible = true;
  memoryColumnVisible = true;
  diskColumnVisible = true;
  networkColumnVisible = true;
  pidColumnVisible = false;
  gpuColumnVisible = true;
  powerColumnVisible = true;
  processNameColumnVisible = false;
  typeColumnVisible = false;

 
  hasWindow = true;
  icon = 'osdrive/icons/taskmanger.png';
  name = 'taskmanager';
  processId = 0;
  type = ComponentType.systemComponent
  displayName = 'Task Manager';

  processes:Process[] =[];
  groupedData: any = {};
  selectedRefreshRate = 0;

  cntxtMenuStyle:Record<string, unknown> = {};
  thStyle:Record<string,unknown> = {};
  thStyle1:Record<string,unknown> = {};
  thStyle2:Record<string,unknown> = {};
  thStyle3:Record<string,unknown> = {};
  thStyle4:Record<string,unknown> = {};
  isActive = false;
  isFocus = false;

  selectedRow = -1;
  showDDList = false;

  cpuUtil = 0;
  memUtil = 0;
  diskUtil = 0;
  networkUtil = 0;
  gpuUtil = 0;
  powerUtil = 'Very low';


  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService,
     stateManagmentService: StateManagmentService,triggerProcessService:TriggerProcessService, renderer: Renderer2) { 

    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._stateManagmentService = stateManagmentService;
    this._triggerProcessService = triggerProcessService;
    this._renderer = renderer;

    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail());
    this._processListChangeSub = this._runningProcessService.processListChangeNotify.subscribe(() =>{this.updateRunningProcess();})
    this._currentSortingOrder = this._sorting.order;

    this._chnageTaskmgrRefreshIntervalSub = new Subject<number>();

    this.refreshRateInterval = RefreshRatesIntervals.NOMRAL;
    this.selectedRefreshRate = RefreshRates.NORMAL;     
  }


  ngOnInit(): void {
   this.processes = this._runningProcessService.getProcesses();
   //this.groupTableBy(); -- work on table grouping...someday
  }

  ngOnDestroy(): void {
    this._processListChangeSub?.unsubscribe();
    this._taskmgrRefreshIntervalSub?.unsubscribe();
    this._chnageTaskmgrRefreshIntervalSub?.unsubscribe();
    
    this.sleepCounter = 0;
    this.processNumberToSuspend = 0;
    this.sleepNumber = 0;
  }

  ngAfterViewInit(): void {

    this.hideContextMenu();

    // const table = this.tskMgrTable.nativeElement as HTMLCollection;
    // new ResizableTableColumns(table, null); table column resize is acting.....not right.

    this.applyDefaultColumnStyle();
    //Initial delay 1 seconds and interval countdown also 2 second
    this._taskmgrRefreshIntervalSub = interval(this.refreshRateInterval).subscribe(() => {
      this.generateLies();
      this.sortTable(this._sorting.column, false);
    });

    this._chnageTaskmgrRefreshIntervalSub.pipe(
      switchMap( newRefreshRate => {
        //un-sub from current interval
        this._taskmgrRefreshIntervalSub?.unsubscribe();   

        //start new interval with newrefreshrate 
        return interval(newRefreshRate);        
    })).subscribe(() => {
      this.generateLies();
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
    this.hideContextMenu();
  }

  closeHeaderList():void{
    this.hideContextMenu();
  }

  updateRunningProcess():void{
    this.processes = this._runningProcessService.getProcesses();

    setTimeout(()=>{
      this.applyDefaultColumnStyle();
    }, 10);
 
  }

  refreshRate(refreshRate:number):void{
    const refreshRatesIntervals:number[] = [RefreshRatesIntervals.PAUSED,RefreshRatesIntervals.LOW,
                                          RefreshRatesIntervals.NOMRAL,RefreshRatesIntervals.HIGH];

    if(refreshRate >= RefreshRates.PAUSED && refreshRate <= RefreshRates.HIGH){
      this.refreshRateInterval = refreshRatesIntervals[refreshRate];
      this.selectedRefreshRate =  refreshRate;
      this._chnageTaskmgrRefreshIntervalSub.next(this.refreshRateInterval);
    }
  }

  sortTable(column: string,  isSortTriggered:boolean): void {

    if(isSortTriggered){
      this._currentSortingOrder = this.isDescSorting(column) ? 'asc' : 'desc';
      this._sorting = {column, order: this._currentSortingOrder };
      this.thStyle = {
        'background-color': '#ffffff'
      }
      this.thStyle1 = {
        'background-color': '#ffffff'
      }
      this.thStyle2 = {
        'background-color': '#ffffff'
      }
      this.thStyle3 = {
        'background-color': '#ffffff'
      }
      this.thStyle4 = {
        'background-color': '#ffffff'
      }
    }
  
    if(column == TableColumns.CPU){
      if(this._currentSortingOrder == 'asc'){
          this.processes = this.processes.sort((objA, objB) => objB.getCpuUsage - objA.getCpuUsage);
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getCpuUsage - objA.getCpuUsage).reverse();
      }
    }else if(column == TableColumns.GPU){
      if(this._currentSortingOrder == 'asc'){
          this.processes = this.processes.sort((objA, objB) => objB.getCpuUsage - objA.getCpuUsage);
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getCpuUsage - objA.getCpuUsage).reverse();
      }
    } else if (column == TableColumns.MEMORY){
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => objB.getMemoryUsage - objA.getMemoryUsage);
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getMemoryUsage - objA.getMemoryUsage).reverse();
      }
    }else if(column == TableColumns.DISK){
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => objB.getDiskUsage - objA.getDiskUsage);
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getDiskUsage - objA.getDiskUsage).reverse();
      }
    }else if(column == TableColumns.NETWORK){
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => objB.getNetworkUsage - objA.getNetworkUsage);
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getNetworkUsage - objA.getNetworkUsage).reverse();
      }
    }else if(column == TableColumns.PID){
      this.thStyle2 = {
        'background-color': 'rgb(224, 224, 139)'
      }
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => objB.getProcessId - objA.getProcessId);
      }else{
        this.processes = this.processes.sort((objA, objB) => objB.getProcessId - objA.getProcessId).reverse();
      }
    }else if(column == TableColumns.NAME){
      this.thStyle = {
        'background-color': 'rgb(224, 224, 139)'
      }
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => {
          return objA.getProcessName < objB.getProcessName ? -1 : 1;
        });
      }else{
        this.processes = this.processes.sort((objA, objB) => {
          return objA.getProcessName < objB.getProcessName ? -1 : 1
        }).reverse();
      }
    }else if(column == TableColumns.PROCESS_NAME){
      this.thStyle3 = {
        'background-color': 'rgb(224, 224, 139)'
      }
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => {
          return objA.getProcessName < objB.getProcessName ? -1 : 1;
        });
      }else{
        this.processes = this.processes.sort((objA, objB) => {
          return objA.getProcessName < objB.getProcessName ? -1 : 1
        }).reverse();
      }
    }else if(column == TableColumns.POWER_USAGE){
      this.thStyle4 = {
        'background-color': 'rgb(224, 224, 139)'
      }
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => {
          return objA.getPowerUsage < objB.getPowerUsage ? -1 : 1;
        });
      }else{
        this.processes = this.processes.sort((objA, objB) => {
          return objA.getPowerUsage < objB.getPowerUsage ? -1 : 1
        }).reverse();
      }
    }else if(column == TableColumns.TYPE){
      this.thStyle1 = {
        'background-color': 'rgb(224, 224, 139)'
      }
      if(this._currentSortingOrder == 'asc'){
        this.processes = this.processes.sort((objA, objB) => {
          return objA.getType < objB.getType ? -1 : 1;
        });
      }else{
        this.processes = this.processes.sort((objA, objB) => {
          return objA.getType < objB.getType ? -1 : 1
        }).reverse();
      }
    }
  }

  showDropDownList():void{
    this.showDDList = ! this.showDDList;
  }



  showContextMenu(evt:MouseEvent):void{

    const rect =  this.tskMgrTable.nativeElement.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    this.cntxtMenuStyle = {
      'width': '180px', 
      'transform':`translate(${x}px, ${y - 65}px)`,
      'z-index': 2,
      'opacity':1
    }

    this._runningProcessService.responseToEventCount++;
    // const evtRespCount = this._runningProcessService.responseToEventCount;
    // console.log('evtRespCount-tskMgr:',evtRespCount);
    evt.preventDefault();
  }

  hideContextMenu():void{
    this.cntxtMenuStyle = {
      'width': '0px', 
      'height': '0px', 
      'transform': 'translate(-100000px, 100000px)',
      'z-index': -1,
      'opacity':0
    }
  }

  generateLies():void{
    const processes:Process[] = this._runningProcessService.getProcesses();
    const powerLevels:string[] = ['Very low','Low','Moderate','High','Very high'];
    const maxUtilNum = 100;
    const minUtilNum = 0;
    const maxNum = 10;
    const minNum = 1;
    const suspended = 'Suspended';

    this.sleepNumber == 0 ? 
      this.sleepNumber = this.getRandomNums(minNum, (maxNum*maxNum)*2) :  this.sleepNumber;

    this.processNumberToSuspend == 0 ? this.processNumberToSuspend =
      processes[this.getRandomNums(minNum-1,processes.length-1)].getProcessId : this.processNumberToSuspend;

    for(let i =0; i < processes.length; i++){
      const tmpProcess = processes[i];
      tmpProcess.setProcessStatus = '';
      tmpProcess.setPowerUsage = powerLevels[0];

      if(tmpProcess.getProcessId == this.processNumberToSuspend){

        if(this.sleepCounter <= this.sleepNumber){

          tmpProcess.setProcessStatus = suspended;
          tmpProcess.setCpuUsage = 0;
          tmpProcess.setDiskUsage = 0;
          tmpProcess.setMemoryUsage = 0;
          tmpProcess.setNetworkUsage = 0;
          tmpProcess.setGpuUsage = 0;
          tmpProcess.setPowerUsage  = powerLevels[0];

          this.sleepCounter++;
        }else{
          this.sleepCounter = 0;
          this.processNumberToSuspend = 0;
          this.sleepNumber = 0;
          tmpProcess.setProcessStatus = '';
          tmpProcess.setPowerUsage = powerLevels[0];
        }
      }else{
        
        if(this.getRandomNums(minNum,maxNum) > 5){
          tmpProcess.setCpuUsage = this.addTrailingZeros(this.getRandomFloatingNums(minUtilNum, maxUtilNum));
        }
        if(this.getRandomNums(minNum,maxNum) <= 1){
          tmpProcess.setDiskUsage = this.addTrailingZeros(this.getRandomFloatingNums(minUtilNum, maxUtilNum));
        }
        if(this.getRandomNums(minNum,maxNum) > 7){
          tmpProcess.setMemoryUsage = this.addTrailingZeros(this.getRandomFloatingNums(minUtilNum, maxUtilNum));
        }
        if(this.getRandomNums(minNum,maxNum) <= 2){
          tmpProcess.setNetworkUsage = this.addTrailingZeros(this.getRandomFloatingNums(minUtilNum, maxUtilNum));
        } 
        if(this.getRandomNums(minNum,maxNum) <= 1){
          tmpProcess.setGpuUsage = this.addTrailingZeros(this.getRandomFloatingNums(minUtilNum, maxUtilNum));
        } 
        if(this.getRandomNums(minNum,maxNum) <= 1){
          tmpProcess.setPowerUsage = powerLevels[this.getRandomNums(0,4)];
        } 
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
    this.gpuUtil = Math.round(processes.reduce((n, {getGpuUsage}) => n + getGpuUsage, 0));
  }

  getRandomFloatingNums(min:number, max:number):number{
    min = Math.floor(min);
    max = Math.ceil(max);
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

  groupTableBy() {
    const groupedData:Record<string, Process[]> = {};
    for (const process of this.processes) {
    
        if(process.getType == ComponentType.systemComponent){

          if(!groupedData[ComponentType.systemComponent]){
            groupedData[ComponentType.systemComponent] = []
          }
          groupedData[ComponentType.systemComponent].push(process)
        }else if(process.getType == ComponentType.userComponent){
          if(!groupedData[ComponentType.userComponent]){
            groupedData[ComponentType.userComponent] = []
          }
          groupedData[ComponentType.userComponent].push(process)
        }
    }
    return groupedData;
  }

  onFewerDetailsBtnClick():void{
    const file:FileInfo = new FileInfo();
    file.setIconPath = '/osdrive/icons/taskmanger.png';
    file.setOpensWith = 'taskmanagermini';
    file.setFileType ='.png';

    const processToClose = this._runningProcessService.getProcess(this.processId);
    this._stateManagmentService.removeState(this.processId);
    this._triggerProcessService.startApplication(file);

    this._runningProcessService.closeProcessNotify.next(processToClose);
  }

  onExitBtnClick():void{
    const processToClose = this._runningProcessService.getProcess(this.processId);
    this._stateManagmentService.removeState(this.processId);
    this._runningProcessService.closeProcessNotify.next(processToClose);
  }

  onEndTaskBtnClick():void{
    const processToClose = this._runningProcessService.getProcess(this.processIdToClose);
    this._stateManagmentService.removeState(this.processId);
    this._runningProcessService.closeProcessNotify.next(processToClose);
  }

  onProcessSelected(rowIndex:number, processId:number):void{
    this.selectedRow = rowIndex;
    this.processIdToClose = processId;
    
    if(this.selectedRow != -1){
      this.isActive = true;
      this.isFocus = true;
    }
  }

  toggleColumnVisibility(column: string) {
    if (column === TableColumns.TYPE) {
      this.typeColumnVisible = !this.typeColumnVisible;
    }else if (column === TableColumns.STATUS) {
      this.statusColumnVisible = !this.statusColumnVisible;
    }else if (column === TableColumns.PID) {
      this.pidColumnVisible = !this.pidColumnVisible;
    }else if (column === TableColumns.PROCESS_NAME) {
      this.processNameColumnVisible = !this.processNameColumnVisible;
    }else if (column === TableColumns.CPU) {
      this.cpuColumnVisible = !this.cpuColumnVisible;
    }else if (column === TableColumns.MEMORY) {
      this.memoryColumnVisible = !this.memoryColumnVisible;
    } else if (column === TableColumns.DISK) {
      this.diskColumnVisible = !this.diskColumnVisible;
    }else if (column === TableColumns.NETWORK) {
      this.networkColumnVisible = !this.networkColumnVisible;
    }else if (column === TableColumns.GPU) {
      this.gpuColumnVisible = !this.gpuColumnVisible;
    }else if (column === TableColumns.POWER_USAGE) {
      this.powerColumnVisible = !this.powerColumnVisible;
    }
 
    this.applyColumnStyles(column);
  }

  applyDefaultColumnStyle():void{
    const tableColumns: string[] = [TableColumns.NAME,TableColumns.TYPE,TableColumns.STATUS,TableColumns.PID,TableColumns.PROCESS_NAME,
      TableColumns.CPU,TableColumns.MEMORY,TableColumns.DISK,TableColumns.NETWORK,TableColumns.GPU,TableColumns.POWER_USAGE];

      for(let i = 0; i < tableColumns.length; i++){
        this.applyColumnStyles(tableColumns[i]);
      }
  }

  applyColumnStyles(column: string) {
    const table = this.tskMgrTable.nativeElement;
    const tableColumns: string[] = [TableColumns.NAME,TableColumns.TYPE,TableColumns.STATUS,TableColumns.PID,TableColumns.PROCESS_NAME,
                                    TableColumns.CPU,TableColumns.MEMORY,TableColumns.DISK,TableColumns.NETWORK,TableColumns.GPU,TableColumns.POWER_USAGE];
    
    const colNum = tableColumns.indexOf(column);

    for( let i = 0; i <= this.processes.length; i++){

      if(column === TableColumns.TYPE){
        this.typeColumnVisible
        ? this._renderer.removeStyle(table.rows[i].cells[colNum], 'display')
        : this._renderer.setStyle(table.rows[i].cells[colNum], 'display', 'none');
      }

      if(column === TableColumns.STATUS){
        this.statusColumnVisible
        ? this._renderer.removeStyle(table.rows[i].cells[colNum], 'display')
        : this._renderer.setStyle(table.rows[i].cells[colNum], 'display', 'none');
      }

      if(column === TableColumns.PID){
        this.pidColumnVisible
        ? this._renderer.removeStyle(table.rows[i].cells[colNum], 'display')
        : this._renderer.setStyle(table.rows[i].cells[colNum], 'display', 'none');
      }

      if(column === TableColumns.PROCESS_NAME){
        this.processNameColumnVisible
        ? this._renderer.removeStyle(table.rows[i].cells[colNum], 'display')
        : this._renderer.setStyle(table.rows[i].cells[colNum], 'display', 'none');
      }

      if(column === TableColumns.CPU){
        this.cpuColumnVisible
        ? this._renderer.removeStyle(table.rows[i].cells[colNum], 'display')
        : this._renderer.setStyle(table.rows[i].cells[colNum], 'display', 'none');
      }

      if(column === TableColumns.MEMORY){
        this.memoryColumnVisible
        ? this._renderer.removeStyle(table.rows[i].cells[colNum], 'display')
        : this._renderer.setStyle(table.rows[i].cells[colNum], 'display', 'none');
      }

      if(column === TableColumns.DISK){
        this.diskColumnVisible
        ? this._renderer.removeStyle(table.rows[i].cells[colNum], 'display')
        : this._renderer.setStyle(table.rows[i].cells[colNum], 'display', 'none');
      }

      if(column === TableColumns.NETWORK){
        this.networkColumnVisible
        ? this._renderer.removeStyle(table.rows[i].cells[colNum], 'display')
        : this._renderer.setStyle(table.rows[i].cells[colNum], 'display', 'none');
      }

      if(column === TableColumns.GPU){
        this.gpuColumnVisible
        ? this._renderer.removeStyle(table.rows[i].cells[colNum], 'display')
        : this._renderer.setStyle(table.rows[i].cells[colNum], 'display', 'none');
      }

      if(column === TableColumns.POWER_USAGE){
        this.powerColumnVisible
        ? this._renderer.removeStyle(table.rows[i].cells[colNum], 'display')
        : this._renderer.setStyle(table.rows[i].cells[colNum], 'display', 'none');
      }

    }
  }

  activeFocus(){
    return{ 
      'active': this.isActive ? 'active' : '',
      'focus': this.isFocus ? 'focus' : ''
    }
  }

  setUtilColoumnColors(cellValue:any){
    let  baseStyle: Record<string, unknown> = {};

    if(typeof cellValue == "number"){
      if(cellValue <= 2.5){
      return baseStyle = {
          'text-align':'right',
          'background-color': '#fff4c4'
        };
      }else if(cellValue > 2.5 && cellValue <= 5){
        return baseStyle = {
          'text-align':'right',
          'background-color': '#ffecac'
        };
      }else if(cellValue > 5.0 && cellValue <= 7.5){
        return baseStyle = {
          'text-align':'right',
          'background-color': '#ffa41c'
        };
      }else if (cellValue > 7.5){
        return baseStyle = {
          'text-align':'right',
          'background-color': '#fc6c30', 
        };
      }
    }else if(typeof cellValue =="string"){
      if(cellValue == 'Very low'){
        return baseStyle = {
            'background-color': '#fff4c4'
          };
        }else if(cellValue == 'Low'){
          return baseStyle = {
            'background-color': '#ffecac'
          };
        }else if(cellValue == 'Moderate'){
          return baseStyle = {
            'background-color': '#ffd464'
          };
        }else if(cellValue == 'High'){
          return baseStyle = {
            'background-color': '#ffa41c'
          };
        }else if (cellValue == 'Very high'){
          return baseStyle = {
            'background-color': '#fc6c30', 
          };
        }       
    }

    return {};
  }

  setUtilHeaderSpan2section1Colors(cellValue:number, cellName:string){
    let baseStyle:Record<string, unknown> = {};
    const sortColoumn = this._sorting.column;

      //acceess before it exists. So Angular is angry      
      // this.cpuId.nativeElement.style.border = (cellValue >= 50)? '1px solid  ##fcc4ac': '';
      // this.memroyId.nativeElement.style.border = (cellValue >= 50)? '1px solid  ##fcc4ac': '';
      // this.diskId.nativeElement.style.border = (cellValue >= 50)? '1px solid  ##fcc4ac': '';
      // this.networkId.nativeElement.style.border = (cellValue >= 50)? '1px solid  ##fcc4ac': '';

      if(cellName == sortColoumn){
        if(cellValue < 10){
          return baseStyle= {
             'height':'50%',
             'background-color':'rgb(224, 224, 139)'
           };
         }else if(cellValue >= 10){
           return baseStyle = {
             'height':'50%',
             'background-color': (cellValue >= 90)?  '##fcc4ac' : 'rgb(224, 224, 139)',
             'border-left':(cellValue >= 90)? ' ##fcc4ac': '',
             'border-right':(cellValue >= 90)?' ##fcc4ac': ''
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
             'background-color': (cellValue >= 90)?  '##fcc4ac' : '#ffffff',
             'border-left':(cellValue >= 90)? ' ##fcc4ac': '',
             'border-right':(cellValue >= 90)?' ##fcc4ac': ''
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
        baseStyle['background-color'] =  (cellValue >= 90) ? '##fcc4ac' : '#ffffff';
        if(sortColoumn == cellName){
          if (cellValue >= 90)
            baseStyle['background-color'] = '##fcc4ac';
          else if (cellValue < 90 )
            baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        baseStyle['border'] =  (cellValue >= 90) ? '##fcc4ac' : '';
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
        baseStyle['background-color'] =  (cellValue >= 90) ? '##fcc4ac' : '#ffffff';
        if(sortColoumn == cellName){
          if (cellValue >= 90)
            baseStyle['background-color'] = '##fcc4ac';
          else if (cellValue < 90 )
            baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        baseStyle['border'] =  (cellValue >= 90) ? '##fcc4ac' : '';
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
        baseStyle['background-color'] =  (cellValue >= 90) ? '##fcc4ac' : '#ffffff';
        if(sortColoumn == cellName){
          if (cellValue >= 90)
            baseStyle['background-color'] = '##fcc4ac';
          else if (cellValue < 90 )
            baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        baseStyle['border'] =  (cellValue >= 90) ? '##fcc4ac' : '';
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
        baseStyle['background-color'] =  (cellValue >= 90) ? '##fcc4ac' : '#ffffff';
        if(sortColoumn == cellName){
          if (cellValue >= 90)
            baseStyle['background-color'] = '##fcc4ac';
          else if (cellValue < 90 )
            baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        baseStyle['border'] =  (cellValue >= 90) ? '##fcc4ac' : '';
        return baseStyle;
       }
    }

    if (cellName == 'GPU'){
      if(cellValue < 10){
        if(sortColoumn == cellName){
          baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        return baseStyle;
       }else if(cellValue >= 10){
        baseStyle['background-color'] =  (cellValue >= 90) ? '##fcc4ac' : '#ffffff';
        if(sortColoumn == cellName){
          if (cellValue >= 90)
            baseStyle['background-color'] = '##fcc4ac';
          else if (cellValue < 90 )
            baseStyle['background-color'] = 'rgb(224, 224, 139)';
        }
        baseStyle['border'] =  (cellValue >= 90) ? '##fcc4ac' : '';
        return baseStyle;
       }
    }

    return {};
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }

}
