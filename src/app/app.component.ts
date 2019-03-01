import { Component } from '@angular/core';
import { SpotifyService } from './services/spotify/spotify.service';
import { spotifyConfig } from '../config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:  [SpotifyService, {
    provide: "SpotifyConfig" ,
      useValue: {
        clientId: spotifyConfig.fire.clientId,
        redirectUri: 'http://localhost:4200/login/callback',
        scope: 'playlist-modify-private playlist-modify-public user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private user-top-read user-read-recently-played',
        authToken: localStorage.getItem('spotify-token')
      }
    }
  ]
})
export class AppComponent {
  title = 'TrackDuck';
}
