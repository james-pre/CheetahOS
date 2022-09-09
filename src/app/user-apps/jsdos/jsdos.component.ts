import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DosPlayer as Instance, DosPlayerFactoryType } from "js-dos";
import {Emulators} from "emulators"
import { FileService } from 'src/app/shared/system-service/file.service';
declare const Dos: DosPlayerFactoryType;
declare const emulators:Emulators

@Component({
  selector: 'cos-jsdos',
  templateUrl: './jsdos.component.html',
  styleUrls: ['./jsdos.component.css']
})
export class JsdosComponent implements OnInit, AfterViewInit {
  @ViewChild('doswindow') dosWindow!: ElementRef; 


  private _fileService:FileService

  constructor(fileService:FileService) { 
    this._fileService = fileService
  }

  ngOnInit(): void {
    1
  }

  ngAfterViewInit() {


    setTimeout(() => {

      console.log('doswindow:',this.dosWindow)
      //emulators.pathPrefix = 'https://cdn.jsdelivr.net/npm/js-dos@7.4.7/dist/'
      emulators.pathPrefix= '/'
      console.log('emulator:',emulators)
  
      // eslint-disable-next-line prefer-const
      //let data = this._fileService.getFile('/desktop/test.jsdos');
      //console.log('data:',data)
  
      Dos(this.dosWindow.nativeElement).run("https://doszone-uploads.s3.dualstack.eu-central-1.amazonaws.com/original/2X/2/24b00b14f118580763440ecaddcc948f8cb94f14.jsdos")
      
    }, 3000);
  }

}
