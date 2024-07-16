import { TerminalCommand } from "./model/terminal.command";
import { AppDirectory } from "src/app/system-files/app.directory";
import { TriggerProcessService } from "src/app/shared/system-service/trigger.process.service";
import { FileInfo } from "src/app/system-files/fileinfo";
import { RunningProcessService } from "src/app/shared/system-service/running.process.service";
import { StateManagmentService } from "src/app/shared/system-service/state.management.service";
import { FileService } from "src/app/shared/system-service/file.service";
import { FileEntry } from 'src/app/system-files/fileentry';



export class TerminalCommands{

    private _triggerProcessService:TriggerProcessService;
    private _runningProcessService:RunningProcessService;
    private _fileService:FileService;
    private _directoryFilesEntires!:FileEntry[];
    
    private _appDirctory = new AppDirectory();
    private closingNotAllowed:string[] = ["system", "desktop", "filemanager", "taskbar", "startbutton","clock","taskbarentry"];
    private files:FileInfo[] = [];
    private navHistory:string[] = ['/osdrive/'];
    private readonly defaultDirectoryPath = '/osdrive';
    private currentDirectoryPath = '/osdrive';
    private pathPtr = 0;

    constructor() { 
        this._triggerProcessService = TriggerProcessService.instance;
        this._runningProcessService = RunningProcessService.instance;
        this._fileService = FileService.instace;
    }

    help(arg0:string[], arg1:string[],arg2:string):string{
        const cmdList =  [...arg0, ...arg1];
        const numPerLine = 10;

        if(arg2 == undefined || arg2.length == 0){
            const result:string[] = ['Available commands:'];
            for(let i = 0; i <= cmdList.length - 1; i += numPerLine){
                const chunk = cmdList.slice(i, i + numPerLine);
                result.push(...chunk)
                result.push('\n');
            }

            return result.join(' ');
        }

        if(arg2 == "-verbose"){
            const verbose = `
terminal <command>

Usage:

help                     get a list of available commands
help -verbose            get a detailed list of commands 
open --app  <foo>        opens app <foo>
close --app <pid>        closes app <pid>
clear                    clears the terminal output and all previous command
curl                     query Api's, and transfer data to and from servers
download <uri> <name>    download from the internet by providing a urls
ls                       list files and folder in the present directory
cd                       change directory
list --apps -i           get a list of all installed apps
list --apps -a           get a list of all running apps

All commands:
    clear, close, curl, cd, download, date, ls, list, help, hostname, open, pwd, version, weather
    whoami
        `;
    
            return verbose;
        }

        return `unkown command:${arg2}`;
    }

    clear(arg:TerminalCommand[]):void{
        arg = [];
    }

    date():string{
        return new Date().toLocaleDateString();
    }

    download(uri: string, downloadName: string):void {
        const link = document.createElement("a");
        link.download = downloadName;
        link.href = uri;
        link.click();
        link.remove();
    }

    hostname():string{
        const hostname = window.location.hostname;
        return hostname;
    }

    async weather(arg0:string):Promise<string>{
        const city = arg0;

        if (city == undefined || city == '' || city.length == 0) {
          return 'Usage: weather [city]. Example: weather Indianapolis';
        }
    
        const weather = await fetch(`https://wttr.in/${city}?ATm`);
    
        return weather.text();
    }

    whoami():string{
        return 'guest';
    }

    version(arg:string):string{
        return `Terminal version: ${arg}`;
    }

    list(arg1:string, arg2:string):string{
        const runningProccess = this._runningProcessService.getProcesses();
        if((arg1 == undefined || arg2 == undefined) || (arg1.length == 0 || arg2.length == 0))
            return 'incomplete command, list --apps -i  or list --apps -a';

        if(arg1 !== "--apps")
            return `unkown command: ${arg1}`;

        if(arg2 == "-i"){ // list install apps
            return `Installed Apps: ${this._appDirctory.getAppList().join(', ')}`;
        }

        if(arg2 == "-a"){ // list install apps
            const result:string[] = [];
            const tmpHead = `
+-----------------------+-----------------------+-----------------------+
|      Process Name     |      Process Type     |      Process ID       |
+-----------------------+-----------------------+-----------------------+
            `
            result.push(tmpHead)
            const tmpBottom = `
+-----------------------+-----------------------+-----------------------+`
            for(let i = 0; i <= runningProccess.length - 1; i++){
                const process = runningProccess[i];
                const tmpMid = `
| ${this.addspaces(process.getProcessName)} | ${this.addspaces(process.getType)} | ${this.addspaces(process.getProcessId.toString())} |
            `
                result.push(tmpMid);
            }

            result.push(tmpBottom);
            return result.join(''); // Join with empty string to avoid commas
        }
        return '';
    }

    open(arg0:string, arg1:string):string{

        if((arg0 == undefined || arg0.length == 0))
            return 'incomplete command, open --app <foo>';

        if(arg0 !== "--app")
            return `unkown command: ${arg0}`;

        if(arg1 == undefined || arg1.length == 0)
            return `incomplete command: open --app <foo>, <foo> must be provided`;

        if(this._appDirctory.appExist(arg1)){
            const file = new FileInfo()
            file.setOpensWith = arg1;

            if(this._triggerProcessService){
                this._triggerProcessService.startApplication(file);
            }
            return `opening app ${arg1}`;
        }else{
            return `${arg1}: No matching application found.`
        }

    }

    close(arg0:string, arg1:string):string{

        if((arg0 == undefined || arg0.length == 0))
            return 'incomplete command, close --app <pid>';

        if(arg0 !== "--app")
            return `unkown command: ${arg0}`;

        if(arg1 == undefined || arg1.length == 0)
            return `incomplete command: close --app <pid>, <pid> must be provided`;


        const pid = Number(arg1);
        const processToClose = this._runningProcessService.getProcess(pid);
        if(processToClose){
            if(this.closingNotAllowed.includes(processToClose.getProcessName)){
                return `The app: ${processToClose.getProcessName} is not allowed to be closed`;
            }else{
                this._runningProcessService.closeProcessNotify.next(processToClose);
                return `closing app, app name: ${processToClose.getProcessName}  app id: ${processToClose.getProcessId}`;
            }

        }else{
            return `${arg1}: No active process with pid:${arg1} found.`
        }
    }

    async curl (args: string[]):Promise<string> {
        if (args.length === 0 || (args[1] === undefined || args[1].length === 0)){
          return 'curl: no URL provided';
        }
        let url = args[1];

        if(!url.includes('https://')){
           const tmpUrl = `https://${url}`;
           url = tmpUrl;
        }
    
        try {
          const response = await fetch(url);
          const data = await response.text();
          return data;
        } catch (error) {
          return `curl: could not fetch URL ${url}. Details: ${error}`;
        }
    }

    addspaces(arg:string):string{
        const maxSpace = 21;
        const argLen = arg.length;
        const diff = maxSpace - argLen;
        const strArr = arg.split("");
        let counter = 0;

        while(counter < diff){
            strArr.push(" ");
            //strArr.unshift(" ");
            counter++;
        }
        return strArr.join("");
    }

    pwd():string{
        return this.currentDirectoryPath;
    }

    async ls(arg0:string):Promise<string[]>{

        console.log('arg0:',arg0);

        const result = await this.loadFilesInfoAsync(this.currentDirectoryPath).then(()=>{

            if(arg0 == undefined || arg0 == ''){
                const result:string[] = [];

                this.files.forEach(file => {

                    console.log('file.getFileName:',file.getFileName);
                    result.push(file.getFileName);
                });

                //console.log('result.join(\'\'):',result.join(' '));
                return result;
            }

            if(arg0 == ' -l' || arg0 == ' -lr' || arg0 == ' -lrt' || arg0 == ' -lt') {
                console.log('hello world');
                return ''
            }
            return '';
        })
        return result || [];
    }

    async cd(arg0:string, key='dft'):Promise<{type: string;  result: any;}>{

        console.log('arg0:',arg0);
        let directory = ''
        const filePathRegex = /^(\.\.\/)+([a-zA-Z0-9_-]+\/?)*$|^(\.\/|\/)([a-zA-Z0-9_-]+\/?)+$|^\.\.$|^\.\.\/$/;

        if(filePathRegex.test(arg0)){

           const cmdArg = arg0.split('/');
           const moveUps = (cmdArg.length > 1)? cmdArg.filter(x => x == "..") : ['..'] ;
           const impliedPath = this.cd_move_up(moveUps);
           const explicitPath = arg0.split("../").filter(x => x !== "");

           
           directory = `${impliedPath}/${explicitPath}`;

           console.log('impliedPath:',impliedPath);
           console.log('explicitPath:',explicitPath);
           console.log('directory:',directory);
        }else{
            if(!arg0.includes(this.defaultDirectoryPath))
                directory = `${this.currentDirectoryPath}/${arg0}`;
            console.log('directory:',directory);
        }

        const result = await this._fileService.checkIfFileOrFolderExistsAsync(directory);


        if(key == 'Tab'){

        }else if(key == 'Enter'){

        }

        if(result){
            this.navHistory.push(directory);
            this.pathPtr++;

            console.log('this.navHistory:',this.navHistory);
            this.currentDirectoryPath = directory;

            const fetchedFiles = await this.loadFilesInfoAsync(this.currentDirectoryPath).then(()=>{
                const files:string[] = [];
                this.files.forEach(file => {
                    files.push(file.getFileName);
                });

                return {type:'string[]', result:files}
            })
            return fetchedFiles
        }else{
            return {type:'string', result:'No such file or directory'}
        }

    }

    cd_move_up(arg0:string[]):string{
        let directory = '';
        let curPathPtr = 0;
        if(this.navHistory.length == 1){
            directory = this.navHistory[0];
         }else if(this.navHistory.length > 1){
             //simply go up a level
             curPathPtr = this.pathPtr;
             arg0.forEach(() => {
                let priorPath = this.navHistory[curPathPtr] || '';
                if(priorPath === this.currentDirectoryPath){
                   curPathPtr = curPathPtr - 1;
                   if(curPathPtr <= 0)
                        directory = this.navHistory[0];
                   else{
                        priorPath= this.navHistory[curPathPtr] || '';
                        console.log('priorPath:',priorPath);
                        directory = priorPath;
                    }

                }
            });
        }

        return directory;
    }



    async mkdir(arg0:string):Promise<void>{
        1
    }

    async mv(arg0:string):Promise<void>{
        1
    }

    async cp(arg0:string):Promise<void>{
        1
    }


    private async loadFilesInfoAsync(directory:string):Promise<void>{
        this.files = [];
        this._fileService.resetDirectoryFiles();
        const dirFileEntries  = await this._fileService.getFilesFromDirectoryAsync(directory) as [];
        this._directoryFilesEntires = this._fileService.getFileEntriesFromDirectory(dirFileEntries,directory);
    
        for(let i = 0; i < dirFileEntries.length; i++){
          const fileEntry = this._directoryFilesEntires[i];
          const fileInfo = await this._fileService.getFileInfoAsync(fileEntry.getPath);
    
          this.files.push(fileInfo)
        }
      }
    
}