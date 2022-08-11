
export class GeneralFunctions{

    private activeProcessIds: number[] = []

    private static instance: GeneralFunctions;

    private constructor(){
        //
     }

     public static getInstance(): GeneralFunctions 
     {
        if (!GeneralFunctions.instance) 
        {
            GeneralFunctions.instance = new GeneralFunctions();
        }
        return GeneralFunctions.instance;
     }

    public getNewProcessId(): number{
        let pid = 0;
        pid = this.generateProcessId();

        while(this.activeProcessIds.includes(pid))
                pid = this.generateProcessId();

        this.activeProcessIds.push(pid);
        return pid;
    }

    private generateProcessId(): number{
       const min = Math.ceil(1000);
       const max = Math.floor(9999);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    public removeProcessId():void{
        //
    }
}