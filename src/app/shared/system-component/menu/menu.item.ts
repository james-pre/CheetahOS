
export interface MenuItemVariable{
    name:string
    value:boolean
}

export interface DeskTopMenuItem {
    icon:string;
    label: string;
    action: () => void;
    variables?: MenuItemVariable;
    emptyline:boolean;
    styleOption:string;
}

export interface MenuItem {
    icon:string;
    label: string;
    action: () => void;
  }