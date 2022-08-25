import * as BrowserFS from 'browserfs';
import { FSModule } from 'browserfs/dist/node/core/FS';

export class FileSystem  {

  fsystem:FSModule;

  constructor() { 
    
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

    this.fsystem = BrowserFS.BFSRequire('fs')
  
  }

}


