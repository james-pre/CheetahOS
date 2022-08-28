import * as BrowserFS from 'browserfs';
import { FSModule } from 'browserfs/dist/node/core/FS';
import publicFileSystemIndex from '../public.json';

export class FileSystem  {

  fileSystem!:FSModule;

  constructor() { 
      BrowserFS.configure({
        fs: "OverlayFS",
        options:{
          readable:{
            fs: 'XmlHttpRequest',
            options:{
              index:publicFileSystemIndex
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


