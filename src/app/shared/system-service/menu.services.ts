import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { FileInfo } from "src/app/system-files/fileinfo";


@Injectable({
    providedIn: 'root'
})

export class MenuService{
    pinToTaskBar: Subject<FileInfo> = new Subject<FileInfo>();
    unPinToTaskBar: Subject<FileInfo> = new Subject<FileInfo>();

}