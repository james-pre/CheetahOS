import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {DesktopMenu, GeneralMenu } from './menu.item';

@Component({
  selector: 'cos-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnChanges {

  @Input() generalMenu: GeneralMenu[] = [];

  @Input() desktopMenu: DesktopMenu[] = [];

  @Input() menuType = '';

  menuOption = '';
  fileExplrMngrMenuOption = "file-explorer-file-manager-menu";
  tskBarMenuOption =  "taskbar-menu";
  deskTopMenuOption =  "desktop-menu";
  keys: string[] = [];

  ngOnChanges(changes: SimpleChanges):void{
    this.menuOption = this.menuType;
  }

  onMenuItemClick(action: () => void): void {
    action();
  }

  getKeys(obj: any):void{
    this.keys = Object.keys(obj);
  }

}
