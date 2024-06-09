import { TerminalCommand } from "./model/terminal.command";




export class TerminalCommands{

    help(arg0:string[], arg1:string[],arg2:string):string{
        const cmdList =  [...arg0, ...arg1]

        if(arg2 == undefined || arg2.length == 0)
            return  'Available commands:' + cmdList.join(', ');


        if(arg2 == "verbose"){
            const verbose = `
            terminal <command>

            Usage:
    
            help               get a list of available commands
            help -verbose      get a detailed list of commands 
            open -app  <foo>   opens app <foo>
            close -app <pid>   closes app <pid>
            open -apps         get a list of all running apps
            clear              clears the terminal output and all previous command
            curl               query apis, and transfer data to and from servers
            download           display usage info for all commands
            dir                list files and folder in the present directory
            cd                 change directory
            list -apps         get a list of all installed apps
        
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
}