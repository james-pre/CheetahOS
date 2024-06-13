import { Component, Input } from '@angular/core';

@Component({
  selector: 'cos-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @Input() menuItems: { label: string, action: () => void }[] = [];



  onMenuItemClick(action: () => void): void {
    action();
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

}
