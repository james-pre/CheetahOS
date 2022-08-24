import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitleComponent } from './user-apps/title/title.component';
import { WindowComponent } from './system-apps/window/window.component';
import { DesktopComponent } from './system-apps/desktop/desktop.component';
import { TaskbarComponent } from './system-apps/taskbar/taskbar.component';
import { ClockComponent } from './system-apps/clock/clock.component';
import { StartbuttonComponent } from './system-apps/startbutton/startbutton.component';
import { TaskbarentriesComponent } from './system-apps/taskbarentries/taskbarentries.component';
import { TaskbarentryComponent } from './system-apps/taskbarentry/taskbarentry.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    TitleComponent,
    AppComponent,
    WindowComponent,
    DesktopComponent,
    TaskbarComponent,
    ClockComponent,
    StartbuttonComponent,
    TaskbarentriesComponent,
    TaskbarentryComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
