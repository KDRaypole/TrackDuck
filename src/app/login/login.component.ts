import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  apiInfo: any;

  constructor(private _spotify: SpotifyService) { }

  ngOnInit() {
    this.apiInfo = this._spotify.getInfo();
    console.log(this.apiInfo)
  }

}
