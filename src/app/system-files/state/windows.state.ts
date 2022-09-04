export class WindowState{
    private _pid:number;
    private _height:number;
    private _width:number;
    private _top:number;
    private _left:number;

    constructor(pid:number,height:number,width:number,top:number,left:number){
        this._pid = pid;
        this._height = height
        this._width = width
        this._top = top
        this._left = left

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

    get getTop(){
        return this._top;
    }
    set setTop(top:number){
        this._top = top;
    }

    get getLeft(){
        return this._left;
    }
    set setLeft(left:number){
        this._left = left;
    }

}