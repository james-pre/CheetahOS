import * as BrowserFS from 'browserfs';
import { FSModule } from 'browserfs/dist/node/core/FS';
import osDriveFileSystemIndex from '../../osdrive.json';

export class FileSystem  {

  fileSystem!:FSModule;

  constructor() { 
      BrowserFS.configure({
        fs: "OverlayFS",
        options:{
          readable:{
            fs: 'XmlHttpRequest',
            options:{
              index:osDriveFileSystemIndex
            }
          },
          writable:{
            fs:"IndexedDB",
            options: {
              "storeName":"browserfs-cache"
            }
          }
        }
      },
      (e) =>{
        if(e){  console.log('BFS Error:', e) }
      });
  
    this.fileSystem = BrowserFS.BFSRequire('fs')
  }

}


