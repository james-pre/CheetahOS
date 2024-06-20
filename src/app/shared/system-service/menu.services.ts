import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class MenuService{
    pinToTaskBar: Subject<object> = new Subject<object>();
    unPinToTaskBar: Subject<object> = new Subject<object>();

}