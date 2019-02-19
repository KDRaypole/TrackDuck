import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { spotifyConfig } from '../../../config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private client_id: string = spotifyConfig.fire.clientId;
  private client_secret: string = spotifyConfig.fire.clientSecret;

  constructor(private _http: Http) { }

  getInfo() {
    return {id: this.client_id, secret: this.client_secret }
  }
}
