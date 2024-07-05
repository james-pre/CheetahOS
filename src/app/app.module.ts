import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularDraggableModule } from 'angular2-draggable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { AppComponent } from './app.component';
import { TitleComponent } from './user-apps/title/title.component';
import { DesktopComponent } from './system-apps/desktop/desktop.component';
import { TaskbarComponent } from './system-apps/taskbar/taskbar.component';
import { ClockComponent } from './system-apps/clock/clock.component';
import { StartbuttonComponent } from './system-apps/startbutton/startbutton.component';
import { TaskbarPreviewComponent } from './system-apps/taskbarpreview/taskbarpreview.component';
import { TaskbarentriesComponent } from './system-apps/taskbarentries/taskbarentries.component';
import { TaskbarentryComponent } from './system-apps/taskbarentry/taskbarentry.component';
import { FileexplorerComponent } from './system-apps/fileexplorer/fileexplorer.component';
import { WindowComponent } from './system-apps/window/window.component';
import { FilemanagerComponent } from './system-apps/filemanager/filemanager.component';
import { GreetingComponent } from './user-apps/greeting/greeting.component';
import { TaskmanagerComponent } from './system-apps/taskmanager/taskmanager.component';
import { TaskmanagerMiniComponent } from './system-apps/taskmanager/taskmanager.mini.component';
import { JsdosComponent } from './user-apps/jsdos/jsdos.component';
import { VideoPlayerComponent } from './system-apps/videoplayer/videoplayer.component';
import { AudioPlayerComponent } from './system-apps/audioplayer/audioplayer.component';
import { TerminalComponent } from './system-apps/terminal/terminal.component';
import { MenuComponent } from './shared/system-component/menu/menu.component';
import { PhotoviewerComponent } from './system-apps/photoviewer/photoviewer.component';
import { TextEditorComponent } from './system-apps/texteditor/texteditor.component';
import { RuffleComponent } from './user-apps/ruffle/ruffle.component';
import { DialogComponent } from './shared/system-component/dialog/dialog.component';
import { CodeEditorComponent } from './user-apps/codeeditor/codeeditor.component';
import { PropertiesComponent } from './shared/system-component/properties/properties.component';


import { SafeUrlPipe } from './shared/system-pipes/safe.resource.url.pipe';
import { TruncatePipe } from './shared/system-pipes/string.shorten.pipe';

import { HighlightDirective } from './system-apps/window/window.btn.highlight.directives';
import { TaskBarEntryHighlightDirective } from './system-apps/taskbarentries/taskbar.entry.highlight.directives';
import { LongPressDirective } from './system-apps/audioplayer/long.press.directive';
import { ColumnResizeDirective } from './system-apps/taskmanager/taskmanager.column-resize.directive';





@NgModule({
  declarations: [
    TitleComponent,
    AppComponent,
    DesktopComponent,
    TaskbarComponent,
    ClockComponent,
    StartbuttonComponent,
    TaskbarPreviewComponent,
    TaskbarentriesComponent,
    TaskbarentryComponent,
    FileexplorerComponent,
    WindowComponent,
    FilemanagerComponent,
    GreetingComponent,
    TaskmanagerComponent,
    TaskmanagerMiniComponent,
    JsdosComponent,
    VideoPlayerComponent,
    AudioPlayerComponent,
    TerminalComponent,
    MenuComponent,
    PhotoviewerComponent,
    TextEditorComponent,
    PropertiesComponent,
    RuffleComponent,
    DialogComponent,
    CodeEditorComponent,
 

    HighlightDirective,
    TaskBarEntryHighlightDirective,
    LongPressDirective,
    ColumnResizeDirective,

    SafeUrlPipe,
    TruncatePipe
    
  ],
  imports: [
    BrowserModule,
    AngularDraggableModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule.forRoot(), // use forRoot() in main app module only.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
