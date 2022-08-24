import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[startbtnhlight]'
})
export class StartbuttonHighlightDirective {

  constructor(private el: ElementRef) { }

  @Input() defaultColor = '';

  @Input() startbtnhlight = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.startbtnhlight || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/