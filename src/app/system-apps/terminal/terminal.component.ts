import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProcessIDService } from 'src/app/shared/system-service/process.id.service';
import { RunningProcessService } from 'src/app/shared/system-service/running.process.service';
import { BaseComponent } from 'src/app/system-base/base/base.component';
import { ComponentType } from 'src/app/system-files/component.types';
import { Process } from 'src/app/system-files/process';
import { TerminalCommand } from './model/terminal.command';
import { TerminalCommands } from './terminal.commands';

@Component({
  selector: 'cos-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements BaseComponent, OnInit, AfterViewInit, OnDestroy{

  @ViewChild('terminalCntnr', {static: true}) terminalCntnr!: ElementRef;
  @ViewChild('terminalOutput', {static: true}) terminalOutput!: ElementRef;

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _maximizeWindowSub!: Subscription;
  private _formBuilder;
  private _terminaCommandsImpl!:TerminalCommands;
  private msgPosCounter = 0;
  private scrollCounter = 0
  private prevPtrIndex = 0;
  private versionNum = '1.0.3';
  private SECONDS_DELAY:number[] = [120,250];
  
  Success = 1;
  Fail = 2;
  Warning = 3;
  Options = 4;

  isBannerVisible = true;
  isWelcomeVisible = true;

  banner = '';
  welcomeMessage = '';
  terminalPrompt = ">";
  commandHistory:TerminalCommand[] = [];
  echoCommands:string[] = ["close", "curl","date", "help","hostname", "list", "open", "version", "whoami", "weather"];
  utilityCommands:string[] = ["clear", "all", "dir", "cd", "download" ];
  allCommands:string[] = [];
  

  terminalForm!: FormGroup;

  hasWindow = true;
  icon = '/osdrive/icons/terminal_48.png';
  name = 'terminal';
  processId = 0;
  type = ComponentType.systemComponent;
  displayName = 'Terminal';

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService, formBuilder:FormBuilder) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._formBuilder = formBuilder;
    this._terminaCommandsImpl = new TerminalCommands();

    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail()); 
    this._maximizeWindowSub = this._runningProcessService.maximizeWindowNotify.subscribe(() =>{this.maximizeWindow();})
  }

  ngOnInit():void{
    this.terminalForm = this._formBuilder.nonNullable.group({
      terminalCmd: '',
    });

    this.banner = this.getTerminalBanner();
    this.allCommands = [...this.echoCommands, ...this.utilityCommands];
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

    const banner = `Simple Terminal, CheetahOS [Version ${this.versionNum}] \u00A9 ${this.getYear()}`
    return banner;
  }

  populateWelecomeMessageField():void{
    const welcomeMessage = "Type 'help', or 'help -verbose' to view a list of available commands.";
    const msgArr :string[] = welcomeMessage.split(" ");

    const interval =  setInterval((msg) => {
      let tmpCounter = 0;
      for(let i = 0; i < msg.length; i++){
        if (tmpCounter < 1){
          this.welcomeMessage +=(this.msgPosCounter == 0)? msg[this.msgPosCounter]:  " " + msg[this.msgPosCounter];
          tmpCounter++;
        }
      }

      if(this.msgPosCounter == msg.length - 1)
        clearInterval(interval);

      this.msgPosCounter++;
    },this.SECONDS_DELAY[0], msgArr);
  }

  onKeyDownOnWindow(evt:KeyboardEvent):void{
    this.focusOnInput();
    if (evt.key === "Tab") {
      // Prevent tab from moving focus
      evt.preventDefault();
    }
  }

  focusOnInput():void{
    const cmdTxtBoxElm= document.getElementById('cmdTxtBox') as HTMLInputElement;
    if(cmdTxtBoxElm){
      cmdTxtBoxElm?.focus();
    }
  }

  private scrollToBottom(): void {

    const interval =  setInterval(() => {
      try {
        console.log('height:',this.terminalOutput.nativeElement.scrollHeight);
        if(this.scrollCounter < 2){
          this.terminalOutput.nativeElement.scrollTop = this.terminalOutput.nativeElement.scrollHeight;
          this.scrollCounter++;
        }
        
      } catch (err) {
        console.error('Error scrolling to bottom:', err);
      }
      if(this.scrollCounter == 2) {
        clearInterval(interval);
        this.scrollCounter = 0;
      }

    },this.SECONDS_DELAY[1]);
  }

  onKeyDownInInputBox(evt:KeyboardEvent):void{
   
    if(evt.key == "Enter"){
      const cmdInput = this.terminalForm.value.terminalCmd as string;
      const terminalCommand = new TerminalCommand(cmdInput, 0, '');

      if(cmdInput !== ''){
        this.processCommand(terminalCommand);
        this.commandHistory.push(terminalCommand);
        this.prevPtrIndex = this.commandHistory.length;
        this.terminalForm.reset();
      }
      evt.preventDefault();
    }

    if(evt.key == "ArrowUp"){
      this.getCommandHistory("backward");
      evt.preventDefault();
    }

    if(evt.key == "ArrowDown"){
      this.getCommandHistory("forward")
      evt.preventDefault();
    }

    if(evt.key == "Tab"){
      const terminalCmd = this.terminalForm.value.terminalCmd as string;
      this.terminalForm.setValue({terminalCmd: this.getAutoCompelete(terminalCmd)});
      evt.preventDefault();
    }
  }

  getCommandHistory(direction:string):void{

    let currPtrIndex = 0;
    if(this.commandHistory.length > 0){
      if(direction === "backward"){
        currPtrIndex = (this.prevPtrIndex === 0)? 0 : this.prevPtrIndex - 1;
      }else if(direction === "forward"){
        currPtrIndex = (this.prevPtrIndex === this.commandHistory.length)? 
          this.commandHistory.length : this.prevPtrIndex + 1
      }

      this.prevPtrIndex = currPtrIndex;
      (currPtrIndex === this.commandHistory.length) ? 
        this.terminalForm.setValue({terminalCmd:''}) : 
        this.terminalForm.setValue({terminalCmd: this.commandHistory[currPtrIndex].getCommand});
    }
  }

  isEchoCommand(arg: string): boolean {
    if(this.echoCommands.includes(arg))
      return true;
    else
    return  false
  }

  isUtilityCommand(arg:string):boolean{
    if(this.utilityCommands.includes(arg))
      return true;
   else
      return false;
  }

  isValidCommand(arg: string): boolean{
    return this.isEchoCommand(arg) || this.isUtilityCommand(arg);
  }

  async processCommand(terminalCmd:TerminalCommand):Promise<void>{
    const cmd_split = terminalCmd.getCommand.split(" ");
    const inputCmd = cmd_split[0].toLowerCase();
    if(this.isValidCommand(inputCmd)){

      if(inputCmd == "clear"){
        this.commandHistory = [];
      } 

      if(inputCmd == "curl"){
        const result = this._terminaCommandsImpl.curl(cmd_split);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = await result;
      } 

      if(inputCmd == "close"){
        const result = this._terminaCommandsImpl.close(cmd_split[1], cmd_split[2]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(inputCmd == "date"){
        const result = this._terminaCommandsImpl.date();
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(inputCmd == "download"){
        this._terminaCommandsImpl.download(cmd_split[1], cmd_split[2]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = 'downloading ..';
      } 

      if(inputCmd == "help"){
        const result = this._terminaCommandsImpl.help(this.echoCommands, this.utilityCommands, cmd_split[1]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(inputCmd == "open"){
        const result = this._terminaCommandsImpl.open(cmd_split[1], cmd_split[2]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(inputCmd == "version"){
        const result = this._terminaCommandsImpl.version(this.versionNum);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(inputCmd == "whoami"){
        const result = this._terminaCommandsImpl.whoami();
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(inputCmd == "weather"){
        const result = this._terminaCommandsImpl.weather(cmd_split[1]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = await result;
      } 

      if(inputCmd == "list"){
        const result = this._terminaCommandsImpl.list(cmd_split[1], cmd_split[2]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 
    }else{
      terminalCmd.setResponseCode = this.Fail;
      terminalCmd.setCommandOutput = `${terminalCmd.getCommand}: command not found. Type 'help', or 'help -verbose' to view a list of available commands.`;
    }

    this.scrollToBottom();
  }

  getAutoCompelete(arg: string): string{
    const matchingCommand = this.allCommands.filter((x) => x.startsWith(arg))
    if(matchingCommand.length == 0)
        return '';
    else {
      return  matchingCommand.join(" ");
    }
  }

  maximizeWindow():void{
    const mainWindow = document.getElementById('vanta');
    this.terminalCntnr.nativeElement.style.height = `${mainWindow?.offsetHeight || 0 - 40}px`;
    this.terminalCntnr.nativeElement.style.width = `${mainWindow?.offsetWidth}px`;
  }

  setTerminalWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }
}
