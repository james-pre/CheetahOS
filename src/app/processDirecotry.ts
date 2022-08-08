export class ProcessDirectory {

    processList: string[] = []
    constructor(processes:string[]){
        this.processList = processes;
    }

    getProcess(): string[]{
            return this.processList;
    }
}