import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  color = 'rgb(26,26,26)';
  closeBtnColor = 'rgb(232,17,35)';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.color, this.closeBtnColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('','');
  }

  private highlight(color: string, xBtnColor:string) {
    
    if(this.el.nativeElement.id == "closeBtn"){
      this.el.nativeElement.style.backgroundColor = xBtnColor;
      this.el.nativeElement.style.transition = 'background-color 0.3s ease';
    }
    else
      this.el.nativeElement.style.backgroundColor = color;
  }
}
