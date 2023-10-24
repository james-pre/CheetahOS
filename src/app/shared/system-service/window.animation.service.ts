import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class WindowAnimationService{
    hideOrShowWindowNotify: Subject<void> = new Subject<void>();
    mimizeOrmaximizeWindowNotify: Subject<void> = new Subject<void>();
}