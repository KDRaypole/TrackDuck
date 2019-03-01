import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify/spotify.service';
import { Promise } from 'es6-promise';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  private user: Object;
  private currentPlaylist: Object;
  private playlists: any[];
  private tracks: any[];

  constructor(private _spotify: SpotifyService) {
    this._spotify.getCurrentUser().subscribe(data => {
        console.log(data);
        this.user = data;
    }, err=> { console.log(err); });
  }

  ngOnInit() {
    this.getPlaylists()
  }

  getPlaylists() {
    this._spotify.getCurrentUserPlaylists()
      .subscribe(data => {
        console.log(data.items)
        this.playlists = data.items
      })
  }

  getPlaylistsSongs(user_id, playlist) {
    this.currentPlaylist = playlist

    this._spotify.getPlaylistTracks(user_id, playlist.id)
      .subscribe(data => {
        console.log(data.items)
        this.tracks = data.items
      })
  }

  removeTrack(user_id, track_id, playlist_id) {
    const p: Promise<string> = new Promise((resolve, reject) => {
      console.log("User: " + user_id + " Playlist: " + playlist_id + " Track: " + track_id)
      this._spotify.removePlaylistTracks(user_id, playlist_id, track_id)
        .subscribe(data => {
          console.log(data)
        })
      resolve("done")
    });

    p.then((str) => {
      this._spotify.getPlaylistTracks(user_id, playlist_id)
        .subscribe(data => {
          console.log(data.items)
          this.tracks = data.items
        })
    })
  }
}
