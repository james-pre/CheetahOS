export class WAVES {

    el!: string;
    color!: number;
    waveHeight!: number;
    shininess!: number;
    waveSpeed!: number;
    zoom!: number;

    constructor(el:string, color:number, waveHeight:number, shininess:number, waveSpeed: number, zoom: number ) { 
        this.el = el 
        this.color = color
        this.waveHeight = waveHeight
        this.shininess = shininess
        this.waveSpeed = waveSpeed
        this.zoom = zoom
    }  

    WAVES( arg0:WAVES) : void{

        this.el = arg0.el 
        this.color = arg0.color
        this.waveHeight = arg0.waveHeight
        this.shininess = arg0.shininess
        this.waveSpeed = arg0.waveSpeed
        this.zoom = arg0.zoom
    }
}


