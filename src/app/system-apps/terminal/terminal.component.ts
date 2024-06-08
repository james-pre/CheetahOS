import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';

@Component({
  selector: 'cos-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements BaseComponent, OnInit, AfterViewInit, OnDestroy{

  @ViewChild('terminalCntnr', {static: true}) terminalCntnr!: ElementRef;

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _maximizeWindowSub!: Subscription;
  private _formBuilder;
  private msg_pos_counter = 0;
  private ptr_tail = 0;
  private ptr_head = 0;
  private down_arr_press_counter = 0;
  private state = '';


  banner = '';
  welcomeMessage = '';
  terminalPrompt = ' >';
  commandHistory:string[] = [];
  

  terminalForm!: FormGroup;

  hasWindow = true;
  icon = '/osdrive/icons/terminal-2_48.png';
  name = 'terminal';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = 'Terminal';

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService, formBuilder:FormBuilder) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._formBuilder = formBuilder;

    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail()); 
    this._maximizeWindowSub = this._runningProcessService.maximizeWindowNotify.subscribe(() =>{this.maximizeWindow();})
  }

  ngOnInit():void{
    this.terminalForm = this._formBuilder.nonNullable.group({
      terminalCmd: '',
    });

    this.banner = this.getTerminalBanner();
  }

  ngAfterViewInit():void{
    this.populateWelecomeMessageField();
  }
  
  ngOnDestroy():void{
    this._maximizeWindowSub?.unsubscribe();
  }

  getYear():number {
    return new Date().getFullYear();
  }
  
  getTerminalBanner():string{
    // const banner = `
    //   ██████   █████  ███████ ██  ██████     ████████ ███████ ██████  ███    ███ ██ ███    ██  █████  ██      
    //   ██   ██ ██   ██ ██      ██ ██             ██    ██      ██   ██ ████  ████ ██ ████   ██ ██   ██ ██      
    //   ██████  ███████ ███████ ██ ██             ██    █████   ██████  ██ ████ ██ ██ ██ ██  ██ ███████ ██      
    //   ██   ██ ██   ██      ██ ██ ██             ██    ██      ██   ██ ██  ██  ██ ██ ██  ██ ██ ██   ██ ██      
    //   ██████  ██   ██ ███████ ██  ██████        ██    ███████ ██   ██ ██      ██ ██ ██   ████ ██   ██ ███████ 
    //                                                                                                                 \u00A9 ${this.getYear()}
    // `

    const banner = `Simple Terminal, CheetahOS [Version 0.0.1] \u00A9 ${this.getYear()}`
    return banner;
  }

  populateWelecomeMessageField():void{
    const welcomeMessage = "Type 'help' to view a list of available commands";
    const msgArr :string[] = welcomeMessage.split(" ");

    const interval =  setInterval((msg) => {
      let tmpCounter = 0;
      for(let i = 0; i < msg.length; i++){
        if (tmpCounter < 1){
          this.welcomeMessage +=(this.msg_pos_counter == 0)? msg[this.msg_pos_counter]:  " " + msg[this.msg_pos_counter];
          tmpCounter++;
        }
      }

      if(this.msg_pos_counter == msg.length - 1)
        clearInterval(interval);

      this.msg_pos_counter++;
    },125, msgArr);

  }


  onkeyDown(evt:KeyboardEvent):void{
    const inputKey = evt.key;
    // console.log('inputKey--:', inputKey);

    if(inputKey == "Enter"){
      const terminalCmd = this.terminalForm.value.terminalCmd as string;
      console.log('inputKey:', inputKey);
      console.log('terminalCmd:', terminalCmd);

      this.commandHistory.push(terminalCmd);
      this.ptr_head = this.commandHistory.length - 1;
      this.ptr_tail = 0;

      this.terminalForm.reset();

      evt.preventDefault();
    }

    if(inputKey == "ArrowUp"){

      //Both ptrs are at the end
      if(this.ptr_tail == this.commandHistory.length - 1 && this.ptr_head == this.commandHistory.length - 1) {
        this.terminalForm.setValue({terminalCmd: this.commandHistory[this.ptr_tail]});
        this.down_arr_press_counter = 0;
      }

      //Both ptrs are at the begining
      if(this.ptr_tail == 0 && this.ptr_head == 0){
        this.terminalForm.setValue({terminalCmd: this.commandHistory[this.ptr_head]});
        return;
      }
         
      // mid-point
      if(this.ptr_tail > 0 && this.ptr_head == this.commandHistory.length - 1){
        this.ptr_head = this.ptr_tail - 1;
        this.terminalForm.setValue({terminalCmd: this.commandHistory[this.ptr_head]});
        this.ptr_tail = 0;
        return;
      }

      while(this.ptr_head >= this.ptr_tail){  

        this.terminalForm.setValue({terminalCmd: this.commandHistory[this.ptr_head]});

        this.ptr_head --;

        if(this.ptr_head < this.ptr_tail)
          this.ptr_head = this.ptr_tail
       
        break;
      }

      evt.preventDefault();
    }

    if(inputKey == "ArrowDown"){
      const terminalCmd = this.terminalForm.value.terminalCmd as string;
      console.log('inputKey:', inputKey);
      console.log('terminalCmd:', terminalCmd);
    
      //Both ptrs are at the end
      if(this.ptr_tail == this.commandHistory.length - 1 && this.ptr_head == this.commandHistory.length - 1) {
        this.terminalForm.setValue({terminalCmd: this.commandHistory[this.ptr_tail]});
        if(this.down_arr_press_counter >= 1){
          this.terminalForm.setValue({terminalCmd:''});
          return;
        }
        this.down_arr_press_counter++;
        return;
      }

      //Both ptrs are at the begining
      if(this.ptr_tail == 0 && this.ptr_head == 0) {
        this.ptr_head = this.commandHistory.length - 1;
        this.ptr_tail = this.ptr_tail + 1;
        this.terminalForm.setValue({terminalCmd: this.commandHistory[this.ptr_tail]});
        return;
      }

      //mid point
      if(this.ptr_tail == 0 && this.ptr_head < this.commandHistory.length - 1){
        this.ptr_tail = this.ptr_head + 1;
        this.ptr_head =  this.commandHistory.length - 1;
        this.terminalForm.setValue({terminalCmd: this.commandHistory[this.ptr_tail]});
        return;
      }

      while(this.ptr_tail  <= this.ptr_head){  
        this.ptr_tail++;

        if(this.ptr_tail > this.ptr_head)
          this.ptr_tail = this.ptr_head

        this.terminalForm.setValue({terminalCmd: this.commandHistory[this.ptr_tail]});
        break;
      }

      evt.preventDefault();
    }

    if(inputKey == "Tab"){
      const terminalCmd = this.terminalForm.value.terminalCmd as string;
      console.log('inputKey:', inputKey);
      console.log('terminalCmd:', terminalCmd);

      evt.preventDefault();
    }

  }


  processCommand(inputStr:string):void{
1
  }

  maximizeWindow():void{
    console.log('maximize');
    this.terminalCntnr.nativeElement.style.height = '1000px';
  }

  setTerminalWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }
}
