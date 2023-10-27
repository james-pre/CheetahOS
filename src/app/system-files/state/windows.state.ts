export class WindowState{
    private _pid:number;
    private _height:number;
    private _width:number;
    private _x_axis:number;
    private _y_axis:number;
    private _z_index:number;
    private _is_visible:boolean;


    constructor(pid:number,height:number,width:number){
        this._pid = pid;
        this._height = height;
        this._width = width;
        this._x_axis = 0;
        this._y_axis = 0;
        this._z_index = 0;
        this._is_visible = true;
    }

    public get getPid(){
        return this._pid;
    }
    public set setPid(pid:number){
        this._pid = pid;
    }

    public get getHeight(){
        return this._height;
    }
    public set setHeight(height:number){
        this._height = height;
    }

    public get getWidth(){
        return this._width;
    }
    public set setWidth(width:number){
        this._width = width;
    }

    public get getYAxis(){
        return this._y_axis;
    }
    public set setYAxis(y_axis:number){
        this._y_axis = y_axis;
    }

    public get getXAxis(){
        return this._x_axis;
    }
    public set setXAxis(x_axis:number){

        this._x_axis = x_axis;
    }

    public get getZIndex(){
        return this._z_index;
    }
    public set setZIndex(z_index:number){
        this._z_index = z_index;
    }

    public get getIsVisible(){
        return this._is_visible;
    }
    public set setIsVisible(is_visible:boolean){
        this._is_visible = is_visible;
    }

}