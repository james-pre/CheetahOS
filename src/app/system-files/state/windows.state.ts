export class WindowState{
    private _pid:number;
    private _height:number;
    private _width:number;
    private _x_axis:number;
    private _y_axis:number;
    private _z_index:number;


    constructor(pid:number,height:number,width:number){
        this._pid = pid;
        this._height = height;
        this._width = width;
        this._x_axis = 0;
        this._y_axis = 0;
        this._z_index = 0;
    }

    get getPid(){
        return this._pid;
    }
    set setPid(pid:number){
        this._pid = pid;
    }

    get getHeight(){
        return this._height;
    }
    set setHeight(height:number){
        this._height = height;
    }

    get getWidth(){
        return this._width;
    }
    set setWidth(width:number){
        this._width = width;
    }

    get getYAxis(){
        return this._y_axis;
    }
    set setYAxis(y_axis:number){
        this._y_axis = y_axis;
    }

    get getXAxis(){
        return this._x_axis;
    }
    set setXAxis(x_axis:number){

        this._x_axis = x_axis;
    }

    get getZIndex(){
        return this._z_index;
    }
    set setZIndex(z_index:number){
        this._z_index = z_index;
    }

}