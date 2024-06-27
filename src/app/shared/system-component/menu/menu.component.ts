import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DeskTopMenuItem } from './menu.item';

@Component({
  selector: 'cos-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnChanges {

  @Input() menuItems: {icon: string, label: string, action: () => void }[] = [];

  @Input() desktopMenuItems: {icon1: string, icon2: string, label: string, nest:DeskTopMenuItem[], action: () => void, emptyline:boolean }[] = [];

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
