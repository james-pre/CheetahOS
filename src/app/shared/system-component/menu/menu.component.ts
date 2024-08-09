import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import {NestedMenu, GeneralMenu } from './menu.item';
import { MenuService } from '../../system-service/menu.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cos-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnChanges, OnDestroy{

  @Input() generalMenu: GeneralMenu[] = [];
  @Input() desktopMenu: NestedMenu[] = [];
  @Input() fileExplorerMenu: NestedMenu[] = [];
  @Input() menuType = '';

  private _menuService:MenuService;
  private _storeDataSub!:Subscription;
  isPasteActive!:boolean;

  menuOption = '';
  fileExplrMngrMenuOption = "file-explorer-file-manager-menu";
  tskBarMenuOption =  "taskbar-menu";
  deskTopMenuOption =  "desktop-menu";
  fileExplrMenuOption =  "file-explorer-menu";
  keys: string[] = [];
  paste = 'Paste';

  constructor(menuService:MenuService) { 
    this._menuService = menuService;

    this.isPasteActive = this._menuService.getPasteState();
    this._storeDataSub = this._menuService.storeData.subscribe(p => {

      const path = p[0];
      const actions = p[1];

      this._menuService.setPath(path);
      this._menuService.setActions(actions);
      this._menuService.setPasteState(true);
    })
  }

  ngOnDestroy(): void {
    this._storeDataSub?.unsubscribe();
  }

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
