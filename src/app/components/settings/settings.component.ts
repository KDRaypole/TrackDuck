import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify/spotify.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: any;

  constructor(private router: Router, private _spotify: SpotifyService) { }

  ngOnInit() {
  }

  logout(){
    this._spotify.resetAuthToken();
    this.router.navigate(["login"]);
  }

}
