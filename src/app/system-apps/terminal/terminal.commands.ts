import { Process } from "src/app/system-files/process";
import { TerminalCommand } from "./model/terminal.command";
import { AppDirectory } from "src/app/system-files/app.directory";



export class TerminalCommands{

    help(arg0:string[], arg1:string[],arg2:string):string{
        const cmdList =  [...arg0, ...arg1]

        if(arg2 == undefined || arg2.length == 0)
            return  'Available commands:' + cmdList.join(', ');


        if(arg2 == "-verbose"){
            const verbose = `
    terminal <command>

    Usage:

    help               get a list of available commands
    help -verbose      get a detailed list of commands 
    open -app  <foo>   opens app <foo>
    close -app <pid>   closes app <pid>
    clear              clears the terminal output and all previous command
    curl               query apis, and transfer data to and from servers
    download           display usage info for all commands
    dir                list files and folder in the present directory
    cd                 change directory
    list -apps -i      get a list of all installed apps
    list -apps -a      get a list of all running apps

    All commands:
        clear, close, curl, cd, download, dir, list, help, version, open, weaather
        whoami
            `;
    
            return verbose;
        }

        return `unkown command:${arg2}`;
    }

    clear(arg:TerminalCommand[]):void{
        arg = [];
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

    list(arg:Process[],arg1:string, arg2:string):string{

        if((arg1 == undefined || arg2 == undefined) || (arg1.length == 0 || arg2.length == 0))
            return 'incomplete command, list -apps -i  or list -apps -a';

        if(arg1 !== "-apps")
            return `unkown command: ${arg1}`;

        if(arg2 == "-i"){ // list install apps
            const appDir = new AppDirectory();
            return `Installed Apps: ${appDir.getAppList().join(', ')}`;
        }

        if(arg2 == "-i"){ // list install apps
            const appDir = new AppDirectory();
            return `Installed Apps: ${appDir.getAppList().join(', ')}`;
        }

        if(arg2 == "-a"){ // list install apps
            const result:string[] = [];
            const tmpHead = `
    .
    +---------------------------+---------------------------+---------------------------+
    |        Process Name       |        Process Type       |        Process Type       |
    +---------------------------+---------------------------+---------------------------+
    `
            result.push(tmpHead)
            const tmpBottom = `
    +---------------------------+---------------------------+---------------------------+
    `
            for(let i = 0; i <= arg.length - 1; i++){
                const process = arg[i];
                const tmpMid = `
    | ${this.addspaces(process.getProcessName)} | ${this.addspaces(process.getType)} | ${this.addspaces(process.getProcessId.toString())} |
    `
                result.push(tmpMid);
            }

            result.push(tmpBottom);
            return result.toString();
        }
        return '';
    }

    addspaces(arg:string):string{
        const maxSpace = 25;
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
}