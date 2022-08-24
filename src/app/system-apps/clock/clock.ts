export class Clock{

    private _seconds:number;
    private _minutes:number;
    private _hours:number;

    constructor(second:number, minute:number, hour:number){
        this._seconds = second;
        this._minutes = minute;
        this._hours = hour;
    }

    public get getSeconds(){
        return this._seconds;
    }

    public set setSeconds( secs:number){
        if(secs< 0 || secs > 60)
            this._seconds = 0;
    }

    public get getMinutes(){
        return this._minutes;
    }

    public set setMinutes(mins:number){
        if(mins < 0 || mins > 60)
            this._minutes = 0;
    }

    public get getHours(){
        return this._hours;
    }

    public getHourStyle(hourType:string):number{

        if(hourType == '12hr'){
            if(this._hours == 0)
                this._hours = 12
        else if(this._hours > 12)
                this._hours = this._hours - 12
        }
        return this._hours
    }

    public set setHours(hrs:number){
        if(hrs< 0 || hrs > 24)
            this._hours = 0;
    }

    public tick():void{
        
        this._seconds = this._seconds + 1;

        if(this._seconds >= 60){

            this._minutes++;
            this._seconds = 0
        }

        if(this._minutes >= 60){

            this._hours++;
            this._minutes = 0
        }

        if(this._hours >= 24){

            this._hours = 0
        }
    }
    
}