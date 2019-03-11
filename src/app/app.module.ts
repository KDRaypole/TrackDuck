import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './components/login/login.component';
import { MatProgressBarModule, MatSnackBarModule, MatCheckboxModule, MatInputModule, MatDialogModule, MatSlideToggleModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { SpotifyService } from './services/spotify/spotify.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { HttpModule } from '@angular/http';
import { CallbackComponent } from './components/callback/callback.component';
import { PlaylistComponent } from './components/playlist/playlist.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SettingsComponent } from './components/settings/settings.component';
import { NewPlaylistComponent } from './components/new-playlist/new-playlist.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { spotifyConfig } from '../config';
import { PublicComponent } from './layouts/public/public.component';
import { SecureComponent } from './layouts/secure/secure.component';
import { PublicNavComponent } from './components/public-nav/public-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    CallbackComponent,
    PlaylistComponent,
    SettingsComponent,
    NewPlaylistComponent,
    PublicComponent,
    SecureComponent,
    PublicNavComponent
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
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressBarModule,
    HttpModule
  ],
  entryComponents: [
    NewPlaylistComponent
  ],
  providers: [
   SpotifyService, {
     provide: "SpotifyConfig" ,
        useValue: {
          clientId: spotifyConfig.fire.clientId,
          redirectUri: 'http://localhost:4200/login/callback',
          scope: 'playlist-modify-private playlist-modify-public user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private user-top-read user-read-recently-played',
          authToken: localStorage.getItem('spotify-token')
        }
   },
   AuthGuardService,
   HttpModule,
   DragDropModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
