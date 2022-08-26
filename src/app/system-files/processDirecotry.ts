export class ProcessDirectory {

    systemProcessList: string[]
    userProcessList: string[] = []

    constructor(){
        this.systemProcessList = this.fetchProcessesList();
    }

    getProcess(): string[]{
            return this.systemProcessList;
    }

    private fetchProcessesList(): string[]{
        this.systemProcessList = ['./system-apps/title/title.component'];
        return this.systemProcessList;
    }
}