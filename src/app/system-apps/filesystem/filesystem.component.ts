import { Component, OnInit } from '@angular/core';
import * as BrowserFS from 'browserfs';

@Component({
  selector: 'cos-filesystem',
  templateUrl: './filesystem.component.html',
  styleUrls: ['./filesystem.component.css']
})
export class FilesystemComponent implements OnInit {

  constructor() { //
  
  }

  ngOnInit(){

    BrowserFS.install(window);
      // Configures BrowserFS to use the IndexedDb file system.
    BrowserFS.configure({
      fs: "LocalStorage"
    },function(e) {
      if (e) {
        // An error happened!
        throw e;
      }
      // Otherwise, BrowserFS is ready-to-use!
    });

    const test = BrowserFS.BFSRequire('fs')

    test.writeFile('/test.txt', 'Cool, I can do this in the browser!', function(err) {
      test.readFile('/test.txt', function(err, contents) {
        console.log(contents?.toString());
      });
    });
    
  }

  
}


