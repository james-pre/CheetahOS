import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import {DesktopMenu, GeneralMenu } from './menu.item';
import { MenuService } from '../../system-service/menu.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cos-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnChanges, OnDestroy{

  @Input() generalMenu: GeneralMenu[] = [];
  @Input() desktopMenu: DesktopMenu[] = [];
  @Input() menuType = '';

  private _menuService:MenuService;
  private _storeDataSub!:Subscription;

  menuOption = '';
  fileExplrMngrMenuOption = "file-explorer-file-manager-menu";
  tskBarMenuOption =  "taskbar-menu";
  deskTopMenuOption =  "desktop-menu";
  keys: string[] = [];
  data = 'NOPATH';
  paste = 'Paste';
  actions:string[]=[];

  isPasteActive = false;

  constructor(menuService:MenuService) { 
    this._menuService = menuService;
    this._storeDataSub = this._menuService.storeData.subscribe(p => {
      this.data = p[0];
      p.shift();
      this.actions = [...p]

      this.isPasteActive = this.activatePaste();
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

  activatePaste():boolean{
    return (this.data === 'NOPATH')? false: true;
  }

}
