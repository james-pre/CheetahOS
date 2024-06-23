import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cos-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnChanges {

  @Input() menuItems: {icon: string, label: string, action: () => void }[] = [];
  @Input() menuDictionary: { [key: string]: { name: string, action: () => void }[] } = {};

  @Input() menuType = '';


  menuOption = '';
  fileExplrMngrMenuOption = "file-explorer-file-manager-menu";
  tskBarMenuOption =  "taskbar-menu";



  ngOnChanges(changes: SimpleChanges):void{
    //console.log('DIALOG onCHANGES:',changes);
    this.menuOption = this.menuType;
    console.log('this.menuOption:',this.menuOption);
  }


  onMenuItemClick(action: () => void): void {
    action();
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

}
