import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularDraggableModule } from 'ngx-draggable-resize';

import { AppComponent } from './app.component';
import { TitleComponent } from './user-apps/title/title.component';
import { DesktopComponent } from './system-apps/desktop/desktop.component';
import { TaskbarComponent } from './system-apps/taskbar/taskbar.component';
import { ClockComponent } from './system-apps/clock/clock.component';
import { StartbuttonComponent } from './system-apps/startbutton/startbutton.component';
import { TaskbarentriesComponent } from './system-apps/taskbarentries/taskbarentries.component';
import { TaskbarentryComponent } from './system-apps/taskbarentry/taskbarentry.component';
import { FileexplorerComponent } from './system-apps/fileexplorer/fileexplorer.component';
import { WindowComponent } from './system-apps/window/window.component';
import { FilemanagerComponent } from './system-apps/filemanager/filemanager.component';
import { HighlightDirective } from './system-apps/window/window.btn.highlight.directives';
import { FlieManagerHighlightDirective } from './system-apps/filemanager/file.mngr.highlight.directives';
import { GreetingComponent } from './user-apps/greeting/greeting.component';
import { TaskmanagerComponent } from './system-apps/taskmanager/taskmanager.component';
import { JsdosComponent } from './user-apps/jsdos/jsdos.component';
import { SafeUrlPipe } from './system-apps/filemanager/safe.resource.url.pipe';



@NgModule({
  declarations: [
    TitleComponent,
    AppComponent,
    DesktopComponent,
    TaskbarComponent,
    ClockComponent,
    StartbuttonComponent,
    TaskbarentriesComponent,
    TaskbarentryComponent,
    FileexplorerComponent,
    WindowComponent,
    FilemanagerComponent,
    HighlightDirective,
    FlieManagerHighlightDirective,
    GreetingComponent,
    TaskmanagerComponent,
    JsdosComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    AngularDraggableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
