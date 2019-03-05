import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private user: Object;
  private playlists: any[];

  constructor(private _spotify: SpotifyService, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this._spotify.getCurrentUser().subscribe(data => {
        console.log(data);
        this.user = data;
        this.router.navigate(["playlist"]);
    }, err=> { console.log(err); });
  }

  login() {
    this._spotify.login()
      .subscribe(
        token => {
        console.log(token);

        this._spotify.getCurrentUser()
            .subscribe(data=> { 
               console.log("getCurrentUser: ", data); 
               this.user = data 
               this.router.navigate(["playlist"]);
            },
            err=> console.error(err));

    },
    err => console.error(err),
    () => { });
  }

  getPlaylists() {
    this._spotify.getCurrentUserPlaylists()
      .subscribe(data => {
        console.log(data.items)
        this.playlists = data.items
      })
  }
}
