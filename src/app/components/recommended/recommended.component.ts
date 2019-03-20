import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {
  private user:any;
  private featuredPlaylists:any[];
  private recommendedTracks:any[];
  form: FormGroup;
  loading: boolean = false;


  constructor(private _spotify: SpotifyService, private formBuilder: FormBuilder) {
    this._spotify.getCurrentUser().subscribe(data => {
        this.user = data;
    }, err=> { console.log(err); });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({ 
      loudness: -30,
      positivity: 0.5,
      energy: 0.5,
      danceability: 0.5
    })

    this.getFeatured()
    this.getRecommendations(this.form.value)
    this.onChanges();
  }

  getFeatured() {
    this._spotify.getFeaturedPlaylists()
      .subscribe(data => {
        this.featuredPlaylists = data.playlists.items
      })
  }

  getRecommendations(vals) {
    this.loading = true

    this.calculateSeeds().subscribe(seeds => {
      this._spotify.getRecommendations({seed_artists: seeds.artists, limit: 100, target_valence: vals.positivity, target_loudness: vals.loudness, target_energy: vals.energy, target_danceability: vals.danceability})
        .subscribe(data => {
          this.recommendedTracks = data.tracks
          this.loading = false 
        }, err=> { console.log(err); });
    })
  }

  dbLabel(value: number | null) {
    return value + "db";
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
      return {artists: artists.join()}
    })
  }

  private getTracks() : Observable<any> {
    return this._spotify.getSavedUserTracks({limit: 5})
      .map(data => {
        return data.items
      })
  }

  private onChanges() : void {
    this.form.valueChanges.subscribe(val => {
      this.getRecommendations(val)
    })
  }
}
