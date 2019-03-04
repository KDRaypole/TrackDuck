import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSlideToggleModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { SpotifyService } from './services/spotify/spotify.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { HttpModule } from '@angular/http';
import { CallbackComponent } from './callback/callback.component';
import { PlaylistComponent } from './playlist/playlist.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    CallbackComponent,
    PlaylistComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    DragDropModule,
    MatSlideToggleModule,
    HttpModule
  ],
  providers: [AuthGuardService, SpotifyService, HttpModule, DragDropModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
