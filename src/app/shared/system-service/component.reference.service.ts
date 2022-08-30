import { ComponentRef, Injectable, ViewContainerRef } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ComponentReferenceService{

    private _componentsReferences:Map<number, ComponentRef<any>>; 
    private _defaultViewContainer!: ViewContainerRef
    
    constructor(){
        this._componentsReferences = new Map<number, ComponentRef<any>>();
    }

    addComponentReference(processId:number, componentToAdd:ComponentRef<any>): void{
        this._componentsReferences.set(processId,componentToAdd)
    }

    getComponentReference(processId:number):ComponentRef<any>{

        const componentRef = this._componentsReferences.get(processId);
   
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return componentRef!;
    }

    removeComponentReference(processId:number): void{
        this._componentsReferences.delete(processId)
    }


}