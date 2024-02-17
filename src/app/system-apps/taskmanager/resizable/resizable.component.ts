import { Component, ElementRef, HostBinding } from "@angular/core";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "th[resizable]",
  templateUrl: "./resizable.template.html",
  styleUrls: ["./resizable.style.css"],
})
export class ResizableComponent {
  @HostBinding("style.width.px")
  width: number | null = null;

  onResize(width: number) {
    this.width = width;
  }
}
