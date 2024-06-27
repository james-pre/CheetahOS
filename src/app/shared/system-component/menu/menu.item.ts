

export interface DeskTopMenuItem {
    icon:string;
    label: string;
    action: () => void;
    variables?: boolean;
    emptyline:boolean;
    styleOption:string;
}

export interface MenuItem {
    icon:string;
    label: string;
    action: () => void;
  }