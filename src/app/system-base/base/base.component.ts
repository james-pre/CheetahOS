import { ComponentType } from "src/app/system-files/component.types";

export interface BaseComponent {

  name:string,
  hasWindow:boolean,
  icon:string
  processId:number;
  type: ComponentType;
  displayName: string;
}
