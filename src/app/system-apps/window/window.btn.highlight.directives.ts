import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  color = 'rgb(26,26,26)';
  closeBtnColor = 'rgb(232,17,35)';
  focusedCloseBtnColor = 'rgb(139,10,20)';
  focusedWindowColor = 'blue';                       //'rgb(121, 163, 232)' --- not really feeling this rgb(16, 97, 230)
  unfocusedWindowColor = 'rgb(121, 163, 232)';

  @HostListener('mouseenter') 
  onMouseEnter() {
    this.highlight(this.color, this.closeBtnColor);
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    this.highlight('','');
  }

  @HostListener("focus")
  onFocus(): void {
    if(this.el.nativeElement.id == "closeBtn"){
      this.el.nativeElement.style.backgroundColor = this.focusedCloseBtnColor;
    }
    //this.elementHost.nativeElement.classList.add("has-focus");
    //this.elementHost.nativeElement.classList.remove("has-focus");
  }

  // @HostListener("blur")
  // onBlur(): void {

  //     if(this.el.nativeElement.id == "headerSec"){
  //       console.log('was-up!!!!!')
  //       this.el.nativeElement.style.backgroundColor = this.unfocusedWindowColor;
  //    }
  // }

  // @HostListener("click")
  // onClick(): void {
  //   console.log('hello this is el-Click:',this.el.nativeElement)
  //     if(this.el.nativeElement.id == "headerSec"){
  //       this.el.nativeElement.style.backgroundColor = this.unfocusedWindowColor;
  //    }
  // }


  private highlight(color: string, xBtnColor:string) {
    
    if(this.el.nativeElement.id == "closeBtn"){
      this.el.nativeElement.style.backgroundColor = xBtnColor;
      this.el.nativeElement.style.transition = 'background-color 0.3s ease';
    }
    else if (this.el.nativeElement.id == "hideBtn" || this.el.nativeElement.id == "minMaxBtn"){
      this.el.nativeElement.style.backgroundColor = color;
    }

  }
}
