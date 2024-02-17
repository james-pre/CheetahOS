import { DOCUMENT } from "@angular/common";
import { Directive, ElementRef, Inject, Output } from "@angular/core";
import {
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
  tap
} from "rxjs/operators";
import { fromEvent } from "rxjs";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[resizable]"
})
export class ResizableDirective {
  @Output()
  readonly resizable = fromEvent<MouseEvent>(
    this.elementRef.nativeElement,
    "mousedown"
  ).pipe(
    tap(e => e.preventDefault()),
    switchMap(() => {
        
     // const { width, right } = this.elementRef.nativeElement.closest("th").getBoundingClientRect();
        let width =  0;
        let right = 0;

      if(this.elementRef.nativeElement){
        const ntvElmnt = this.elementRef.nativeElement;
        if(ntvElmnt){
            const ntvElmnt1 = ntvElmnt.closest("th")?.getBoundingClientRect();
             width =  ntvElmnt1?.width || 0;
             right = ntvElmnt1?.right || 0;
        }
      }

      return fromEvent<MouseEvent>(this.documentRef, "mousemove").pipe(
        map(({ clientX }) => width + clientX - right),
        distinctUntilChanged(),
        takeUntil(fromEvent(this.documentRef, "mouseup"))
      );
    })
  );

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(ElementRef)
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}
}
