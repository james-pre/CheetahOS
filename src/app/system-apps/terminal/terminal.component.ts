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
import { AppState, BaseState } from 'src/app/system-files/state/state.interface';
import { StateType } from 'src/app/system-files/state/state.type';
import { StateManagmentService } from 'src/app/shared/system-service/state.management.service';
import { SessionManagmentService } from 'src/app/shared/system-service/session.management.service';
import * as htmlToImage from 'html-to-image';
import { TaskBarPreviewImage } from '../taskbarpreview/taskbar.preview';

@Component({
  selector: 'cos-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements BaseComponent, OnInit, AfterViewInit, OnDestroy{

  @ViewChild('terminalCntnr', {static: true}) terminalCntnr!: ElementRef;
  @ViewChild('terminalOutputCntnr', {static: true}) terminalOutputCntnr!: ElementRef;
  @ViewChild('terminalHistoryOutput', {static: true}) terminalHistoryOutput!: ElementRef;

  private _processIdService:ProcessIDService;
  private _runningProcessService:RunningProcessService;
  private _maximizeWindowSub!: Subscription;
  private _minimizeWindowSub!: Subscription;
  private _formBuilder;
  private _terminaCommandsImpl!:TerminalCommands;
  private _stateManagmentService:StateManagmentService;
  private _sessionManagmentService: SessionManagmentService;
  private _appState!:AppState;

  private msgPosCounter = 0;
  private scrollCounter = 0
  private prevPtrIndex = 0;
  private versionNum = '1.0.3';
  private SECONDS_DELAY:number[] = [120,250];
  private doesDirExist = true;
  
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
  echoCommands:string[] = ["close", "curl","date", "help","hostname", "list", "open", "version", "whoami", "weather","pwd"];
  utilityCommands:string[] = ["clear", "all", "dir", "cd","ls", "download" ];
  generatedArguments:string[] = [];
  allCommands:string[] = [];
  haveISeenThisRootArg = '';
  haveISeenThisAutoCmplt = '';

  terminalForm!: FormGroup;

  hasWindow = true;
  icon = '/osdrive/icons/terminal_48.png';
  name = 'terminal';
  processId = 0;
  type = ComponentType.System;
  displayName = 'Terminal';

  constructor( processIdService:ProcessIDService,runningProcessService:RunningProcessService, formBuilder:FormBuilder,
               stateManagmentService: StateManagmentService, sessionManagmentService: SessionManagmentService) { 
    this._processIdService = processIdService;
    this._runningProcessService = runningProcessService;
    this._formBuilder = formBuilder;
    this._stateManagmentService = stateManagmentService;
    this._sessionManagmentService = sessionManagmentService;
    this._terminaCommandsImpl = new TerminalCommands();

    this.retrievePastSessionData();

    this.processId = this._processIdService.getNewProcessId()
    this._runningProcessService.addProcess(this.getComponentDetail()); 
    this._maximizeWindowSub = this._runningProcessService.maximizeWindowNotify.subscribe(() =>{this.maximizeWindow()})
    this._minimizeWindowSub = this._runningProcessService.minimizeWindowNotify.subscribe((p) =>{this.minimizeWindow(p)})
  }

  ngOnInit():void{
    this.terminalForm = this._formBuilder.nonNullable.group({
      terminalCmd: '',
    });

    this.banner = this.getTerminalBanner();
    this.allCommands = [...this.echoCommands, ...this.utilityCommands];
  }

  ngAfterViewInit():void{
    this.setTerminalWindowToFocus(this.processId); 
    this.populateWelecomeMessageField();

    setTimeout(()=>{
      this.captureComponentImg();
    },this.SECONDS_DELAY[1]) 
  }
  
  ngOnDestroy():void{
    this._maximizeWindowSub?.unsubscribe();
    this._minimizeWindowSub?.unsubscribe();
  }

  captureComponentImg():void{
    htmlToImage.toPng(this.terminalCntnr.nativeElement).then(htmlImg =>{
      //console.log('img data:',htmlImg);

      const cmpntImg:TaskBarPreviewImage = {
        pid: this.processId,
        imageData: htmlImg
      }
      this._runningProcessService.addProcessImage(this.name, cmpntImg);
    })
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
        //console.log('height:',this.terminalOutputCntnr.nativeElement.scrollHeight);
        if(this.scrollCounter < 2){
          this.terminalOutputCntnr.nativeElement.scrollTop = this.terminalOutputCntnr.nativeElement.scrollHeight;
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

  async onKeyDoublePressed(evt: KeyboardEvent): Promise<void> {
    console.log(`${evt.key} Key pressed  rapidly.`);
    // Handle the rapid key presses here
    if(evt.key == "Tab"){
      const cmdString = this.terminalForm.value.terminalCmd as string;
      const cmdStringArr = cmdString.split(" ");

      const rootCmd = cmdStringArr[0];
      const rootArg = cmdStringArr[1];

      console.log('rootCmd:',rootCmd);

      /**
       * the command part of the command string, can not be undefined, must have a length greater than 0, and cannot contain space
       */
      if(rootCmd !== undefined && rootCmd.length > 0 && !rootCmd.includes(" ")){
        if(!this.allCommands.includes(rootCmd)){

          const autoCmpltReslt = this.getAutoCompelete(rootCmd, this.allCommands);

          if(autoCmpltReslt.length <= 1){
            this.terminalForm.setValue({terminalCmd: autoCmpltReslt[0]});
          }else{
            const terminalCommand = new TerminalCommand(cmdString, 0, " ");
            terminalCommand.setResponseCode = this.Options;
            terminalCommand.setCommandOutput = autoCmpltReslt.join(" ");
            this.commandHistory.push(terminalCommand);
          }

        }
      }

      if(rootCmd === "cd"){
        console.log('rootArg:',rootArg);

        const terminalCommand = new TerminalCommand(cmdString, 0, " ");
        await this.processCommand(terminalCommand).then(() =>{
  
          const autoCmpltReslt = this.getAutoCompelete(rootArg, this.generatedArguments);
  
          console.log('autoCmpltReslt:',autoCmpltReslt);
          console.log('this.generatedArguments:',this.generatedArguments);

          if(rootArg){
            if(this.doesDirExist){
              if(autoCmpltReslt.length === 1){
                this.terminalForm.setValue({terminalCmd: `${rootCmd} ${autoCmpltReslt[0]}`});
              }else{
                terminalCommand.setResponseCode = this.Options;
                terminalCommand.setCommandOutput = autoCmpltReslt.join(" ") || this.generatedArguments.join(" ");
                this.commandHistory.push(terminalCommand);
              }  
            }

          }else{
            terminalCommand.setResponseCode = this.Options;
            terminalCommand.setCommandOutput = this.generatedArguments.join(" ");
            this.commandHistory.push(terminalCommand);
          }
    
  
        });
      }

      
      evt.preventDefault();
    }
  }


  onKeyDownInInputBox(evt:KeyboardEvent):void{
   
    if(evt.key == "Enter"){
      const cmdInput = this.terminalForm.value.terminalCmd as string;
      const terminalCommand = new TerminalCommand(cmdInput, 0, '');

      if(cmdInput !== ''){
        this.processCommand(terminalCommand, "Enter");
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
      const cmdString = this.terminalForm.value.terminalCmd as string;
      const cmdStringArr = cmdString.split(" ");

      const rootCmd = cmdStringArr[0];
      const rootArg = cmdStringArr[1];

      console.log('rootCmd:',rootCmd);

      /**
       * the command part of the command string, can not be undefined, must have a length greater than 0, and cannot contain space
       */
      if(rootCmd !== undefined && rootCmd.length > 0 && !rootCmd.includes(" ")){
        if(!this.allCommands.includes(rootCmd)){

          const autoCmpltReslt = this.getAutoCompelete(rootCmd, this.allCommands);

          if(autoCmpltReslt.length === 1){
            this.terminalForm.setValue({terminalCmd: autoCmpltReslt[0]});
          }if(autoCmpltReslt.length > 1){
            const terminalCommand = new TerminalCommand(cmdString, 0, " ");
            terminalCommand.setResponseCode = this.Options;
            terminalCommand.setCommandOutput = autoCmpltReslt.join(" ");
            this.commandHistory.push(terminalCommand);
          }

        }
      }

      console.log('rootArg:',rootArg);
      /**
       * the argument part of the command string, can not be undefined, must have a length greater than 0, and cannot contain space
       */
      if(rootArg !== undefined && rootArg.length > 0 && !rootArg.includes(" ")){

        // if(!this.generatedArguments.includes(rootArg)){
        //   this.terminalForm.setValue({terminalCmd:`${rootCmd} ${this.getAutoCompelete(rootArg, this.generatedArguments)}`});
        // }

        const alteredRootArg = this.alterRootArg(rootArg);
        console.log('alteredRootArg:',alteredRootArg);


        if(!this.generatedArguments.includes(alteredRootArg)){

          const autoCmpltReslt = this.getAutoCompelete(alteredRootArg, this.generatedArguments);

          if(autoCmpltReslt.length === 1){
            if((rootArg.includes('/') && rootArg !== this.haveISeenThisRootArg) &&  (this.haveISeenThisAutoCmplt !== autoCmpltReslt[0])){

              this.terminalForm.setValue({terminalCmd: `${rootCmd} ${this.formatRootArg(rootArg)}${autoCmpltReslt[0]}`});
              this.haveISeenThisRootArg = `${this.formatRootArg(rootArg)}${autoCmpltReslt[0]}`
              this.haveISeenThisAutoCmplt = autoCmpltReslt[0];

            }else if(!rootArg.includes('/')){
              this.haveISeenThisAutoCmplt = autoCmpltReslt[0];
              this.terminalForm.setValue({terminalCmd: `${rootCmd} ${autoCmpltReslt[0]}`});
            }
          }else if(autoCmpltReslt.length > 1){
            const terminalCommand = new TerminalCommand(cmdString, 0, " ");
            terminalCommand.setResponseCode = this.Options;
            terminalCommand.setCommandOutput = autoCmpltReslt.join(" ");
            this.commandHistory.push(terminalCommand);
          }

        }
      }

      
      evt.preventDefault();
    }
  }



  formatRootArg(arg0:string):string{
    let result = '';

    if(arg0.includes('/')) {
      const argSplit = arg0.split('/');
      const res:string[] = [];

      for(let i = 0; i <= argSplit.length - 2; i++){
        res.push(`${argSplit[i]}/`);
      }

      result = res.toString();
      console.log('formatAlteredRootArg-result:',result);
    }

    return result.replace(",","");
  }

  alterRootArg(arg0:string):string{
    const rootArgs = arg0.split('/');
    let rootArg = '';

    if(rootArgs.length === 1) {
      rootArg =  rootArgs[0];
    }else if (rootArgs.length >1){

      if(rootArgs.slice(-1)[0] !== ''){
         rootArg = rootArgs.slice(-1)[0];
      }else{
        rootArg = rootArgs.slice(-2)[0];
      }
    }

    return rootArg;
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

  isInAllCommands(arg: string): boolean {
    if(this.allCommands.includes(arg))
      return true;
    else
    return  false
  }

  isValidCommand(arg: string): boolean{
    return this.isInAllCommands(arg)
  }

  async processCommand(terminalCmd:TerminalCommand, key=""):Promise<void>{
    const cmdStringArr = terminalCmd.getCommand.split(" ");
    const rootCmd = cmdStringArr[0].toLowerCase();
    if(this.isValidCommand(rootCmd)){

      if(rootCmd == "clear"){
        this.commandHistory = [];
        this.isBannerVisible = false;
        this.isWelcomeVisible = false;
      } 

      if(rootCmd == "curl"){
        const result = await this._terminaCommandsImpl.curl(cmdStringArr);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(rootCmd == "close"){
        const result = this._terminaCommandsImpl.close(cmdStringArr[1], cmdStringArr[2]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(rootCmd == "date"){
        const result = this._terminaCommandsImpl.date();
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(rootCmd == "download"){
        this._terminaCommandsImpl.download(cmdStringArr[1], cmdStringArr[2]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = 'downloading ..';
      } 

      if(rootCmd == "help"){
        const result = this._terminaCommandsImpl.help(this.echoCommands, this.utilityCommands, cmdStringArr[1]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(rootCmd == "open"){
        const result = this._terminaCommandsImpl.open(cmdStringArr[1], cmdStringArr[2]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(rootCmd == "version"){
        const result = this._terminaCommandsImpl.version(this.versionNum);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(rootCmd == "whoami"){
        const result = this._terminaCommandsImpl.whoami();
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(rootCmd == "weather"){
        const result = await this._terminaCommandsImpl.weather(cmdStringArr[1]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(rootCmd == "list"){
        const result = this._terminaCommandsImpl.list(cmdStringArr[1], cmdStringArr[2]);
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(rootCmd == "pwd"){
        const result = this._terminaCommandsImpl.pwd();
        terminalCmd.setResponseCode = this.Success;
        terminalCmd.setCommandOutput = result;
      } 

      if(rootCmd == "cd"){
        const str = 'string';
        const strArr = 'string[]';
        const result = await this._terminaCommandsImpl.cd(cmdStringArr[1], key);
        terminalCmd.setResponseCode = this.Success;

        if(result.type === str){
          terminalCmd.setCommandOutput = result.result;
          this.doesDirExist = false;
        }
        else if(result.type === strArr){
          this.generatedArguments = [];
          this.generatedArguments = [...result.result as string[]];
          this.doesDirExist = true;
        }
      } 

      if(rootCmd == "ls"){
        const result = await this._terminaCommandsImpl.ls(cmdStringArr[1]);
        terminalCmd.setResponseCode = this.Success;

        console.log('ls result:', result)
        terminalCmd.setCommandOutput = result.join(' ');
        this.generatedArguments = [];
        this.generatedArguments = [...result];
      } 
      
    }else{
      terminalCmd.setResponseCode = this.Fail;
      terminalCmd.setCommandOutput = `${terminalCmd.getCommand}: command not found. Type 'help', or 'help -verbose' to view a list of available commands.`;
    }

    this.scrollToBottom();
    this.storeAppState();
  }

  /***
   * arg0: what is being searched for
   * arg1: Where x is being search in
   */
  getAutoCompelete(arg0:string, arg1:string[]): string[]{
    // eslint-disable-next-line prefer-const
    let matchingCommand =  arg1.filter((x) => x.startsWith(arg0.trim()));

    return (matchingCommand.length > 0) ? matchingCommand : [];
  }

  maximizeWindow():void{
    const uid = `${this.name}-${this.processId}`;
    const evtOriginator = this._runningProcessService.getEventOrginator();

    if(uid === evtOriginator){
      this._runningProcessService.removeEventOriginator();
      const mainWindow = document.getElementById('vanta');
      //window title and button bar, terminal input section, windows taskbar height 
      let pixelTosubtract = 30 + 25 + 40;
      this.terminalOutputCntnr.nativeElement.style.width = `${mainWindow?.offsetWidth}px`;
      this.terminalOutputCntnr.nativeElement.style.height = `${(mainWindow?.offsetHeight || 0) - pixelTosubtract}px`;

      if(this.isBannerVisible && this.isWelcomeVisible){
        // bannerVisible (28) + welcomeVisible(27)
        pixelTosubtract += 55;
      }
      this.terminalHistoryOutput.nativeElement.style.width = `${mainWindow?.offsetWidth}px`;
      this.terminalHistoryOutput.nativeElement.style.height = `${(mainWindow?.offsetHeight || 0) - pixelTosubtract}px`;

    }
  }

  minimizeWindow(arg:number[]):void{
    const uid = `${this.name}-${this.processId}`;
    const evtOriginator = this._runningProcessService.getEventOrginator();

    if(uid === evtOriginator){
      this._runningProcessService.removeEventOriginator();

      this.terminalOutputCntnr.nativeElement.style.width = `${arg[0]}px`;
      this.terminalOutputCntnr.nativeElement.style.height = `${arg[1]}px`;

      this.terminalHistoryOutput.nativeElement.style.width = `${arg[0]}px`;
      this.terminalHistoryOutput.nativeElement.style.height = `${arg[1]}px`;
    }
  }


  setTerminalWindowToFocus(pid:number):void{
    this._runningProcessService.focusOnCurrentProcessNotify.next(pid);
  }

  storeAppState():void{
    const cmdHistory = this.commandHistory;
    const cmdList:string[] = [];
    const uid = `${this.name}-${this.processId}`;

    for(let i = 0; i < cmdHistory.length; i++){
      cmdList.push(cmdHistory[i].getCommand);
    }
  
    this._appState = {
      pid: this.processId,
      app_data: cmdList,
      app_name: this.name,
      unique_id: uid
    }

    this._stateManagmentService.addState(uid, this._appState, StateType.App);
  }

  retrievePastSessionData():void{
    const pickUpKey = this._sessionManagmentService._pickUpKey;
    if(this._sessionManagmentService.hasTempSession(pickUpKey)){
      const tmpSessKey = this._sessionManagmentService.getTempSession(pickUpKey) || ''; 
      const retrievedSessionData = this._sessionManagmentService.getSession(tmpSessKey) as BaseState[];

      if(retrievedSessionData !== undefined){
        const appSessionData = retrievedSessionData[0] as AppState;
        if(appSessionData !== undefined  && appSessionData.app_data != ''){
  
          const terminalCmds =  appSessionData.app_data as string[];
          for(let i = 0; i < terminalCmds.length; i++){
            const cmd = new TerminalCommand(terminalCmds[i], 0, '');
            this.commandHistory.push(cmd);
          }
        }
      }
    }
  }

  private getComponentDetail():Process{
    return new Process(this.processId, this.name, this.icon, this.hasWindow, this.type)
  }
}
