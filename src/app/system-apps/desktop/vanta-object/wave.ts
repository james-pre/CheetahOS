export class WAVES {

    el!: string;
    color!: number;
    waveHeight!: number;
    shininess!: number;
    waveSpeed!: number;
    zoom!: number;
    mouseControls: boolean | undefined = true;
    touchControls: boolean | undefined= true;
    

    constructor(el:string, color:number, waveHeight:number, shininess:number, waveSpeed: number, zoom: number, mouseControls?:boolean, touchControls?:boolean) { 
        this.el = el 
        this.color = color
        this.waveHeight = waveHeight
        this.shininess = shininess
        this.waveSpeed = waveSpeed
        this.zoom = zoom
        this.mouseControls = mouseControls
        this.touchControls = touchControls
    }  

    WAVES( arg0:WAVES) : void{

        this.el = arg0.el 
        this.color = arg0.color
        this.waveHeight = arg0.waveHeight
        this.shininess = arg0.shininess
        this.waveSpeed = arg0.waveSpeed
        this.zoom = arg0.zoom
    }

     destroy():void {
        throw new Error("Function not implemented.");
    }

}




// export interface WAVES {
//     el?: string;
//     color: number;
//     waveHeight: number;
//     shininess: number;
//     waveSpeed: number;
//     zoom: number;
//     mouseControls: boolean;
//     touchControls: boolean;
// }

