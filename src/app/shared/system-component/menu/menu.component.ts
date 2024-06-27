import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DeskTopMenuItem, MenuItem } from './menu.item';

@Component({
  selector: 'cos-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnChanges {

  @Input() menuItems: {icon: string, label: string, action: () => void }[] = [];

  @Input() desktopMenuItems: {icon1: string, icon2: string, label: string, nest:DeskTopMenuItem[], action: () => void }[] = [];

  @Input() menuDictionary: { [key:string]: DeskTopMenuItem[] } = {};

  @Input() menuType = '';

  menuOption = '';
  fileExplrMngrMenuOption = "file-explorer-file-manager-menu";
  tskBarMenuOption =  "taskbar-menu";
  deskTopMenuOption =  "desktop-menu";
  keys: string[] = [];

  ngOnChanges(changes: SimpleChanges):void{
    //console.log('DIALOG onCHANGES:',changes);
    this.menuOption = this.menuType;

    // if(this.menuType === this.deskTopMenuOption){
    //   this.getKeys(this.menuDictionary);
    // }
    console.log('this.menuOption:',this.menuOption);
  }


  onMenuItemClick(action: () => void): void {
    action();
  }

  getKeys(obj: any):void{
    console.log('obj:',obj);

    console.log(' Object.keys(obj):', Object.keys(obj));
    this.keys = Object.keys(obj);
  }

}
