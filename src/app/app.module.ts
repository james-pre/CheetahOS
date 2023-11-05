import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularDraggableModule } from 'ngx-draggable-resize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { FlieManagerHighlightDirective } from './shared/system-directive/file.mngr.highlight.directives';
import { GreetingComponent } from './user-apps/greeting/greeting.component';
import { TaskmanagerComponent } from './system-apps/taskmanager/taskmanager.component';
import { TaskmanagerMiniComponent } from './system-apps/taskmanager/taskmanager.mini.component';
import { JsdosComponent } from './user-apps/jsdos/jsdos.component';
import { SafeUrlPipe } from './shared/system-pipes/safe.resource.url.pipe';
import { TaskBarEntryHighlightDirective } from './shared/system-directive/taskbar.entry.highlight.directives';
import { VideoPlayerComponent } from './user-apps/videoplayer/videoplayer.component';



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
    TaskBarEntryHighlightDirective,
    GreetingComponent,
    TaskmanagerComponent,
    TaskmanagerMiniComponent,
    JsdosComponent,
    SafeUrlPipe,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    AngularDraggableModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
