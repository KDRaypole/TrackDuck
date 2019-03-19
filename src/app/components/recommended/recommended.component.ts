import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {
  private user:any;
  private featuredPlaylists:any[];

  constructor(private _spotify: SpotifyService) {
    this._spotify.getCurrentUser().subscribe(data => {
        this.user = data;
    }, err=> { console.log(err); });
  }

  ngOnInit() {
    this.getFeatured()
    this.getRecommendations()
  }

  getFeatured() {
    this._spotify.getFeaturedPlaylists()
      .subscribe(data => {
        this.featuredPlaylists = data.playlists.items
        console.log(data.playlists.items)
      })
  }

  getRecommendations() {
    this.calculateSeeds().subscribe(seeds => {
      this._spotify.getRecommendations({seed_artists: seeds.artists, seed_tracks: seeds.tracks, seed_genres: seeds.genres})
        .subscribe(data => {
          console.log(data)
        }, err=> { console.log(err); });
    })
  }

  private calculateSeeds() : Observable<any> {
    let tracks = []
    let artists = []
    let genres = []

    return this.getTracks().map(obj => {
      obj.map(track => {
        tracks.push(track.track.id)
        artists.push(track.track.artists[0].id)
      })
      return {artists: "", genres: "acoustic, alternative, ambient, classical, dance", tracks: ""}
    })
  }

  private getTracks() : Observable<any> {
    return this._spotify.getSavedUserTracks({limit: 5})
      .map(data => {
        return data.items
      })
  }
}
