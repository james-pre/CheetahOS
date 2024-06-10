
export interface BaseState{
    pid: number
}


export interface WindowState extends BaseState{
    width:number,
    height:number,
    x_axis:number,
    y_axis:number,
    z_index:number,
    is_visible:boolean,
}


export interface AppState extends BaseState{
    app_data:unknown
    app_name:string
    unique_id:string
}