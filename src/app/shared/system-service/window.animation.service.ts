import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class WindowAnimationService{
    hideWindowNotify: Subject<void> = new Subject<void>();
    restoreWindowNotify: Subject<void> = new Subject<void>();
    mimizeWindowNotify: Subject<void> = new Subject<void>();
    maximizeNotify: Subject<void> = new Subject<void>();
}