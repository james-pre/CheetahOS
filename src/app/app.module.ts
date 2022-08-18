import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleComponent } from './system-apps/title/title.component';
import { WindowComponent } from './system-apps/window/window.component';
import { DesktopComponent } from './system-apps/desktop/desktop.component';

@NgModule({
  declarations: [
    TitleComponent,
    AppComponent,
    WindowComponent,
    DesktopComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
