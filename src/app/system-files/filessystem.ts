import * as BrowserFS from 'browserfs';
import { FSModule } from 'browserfs/dist/node/core/FS';

export class FileSystem  {

  fsystem:FSModule;

  constructor() { 
    
    BrowserFS.install(window);
        // Configures BrowserFS to use the IndexedDb file system.
    BrowserFS.configure({
        fs: "IndexedDB",
        options:{
          "storeName":"dankstore"
        }
    },
    (e) =>{
     if(e){  console.log('BFS Error:', e) }
    });

    this.fsystem = BrowserFS.BFSRequire('fs')
  }

}


