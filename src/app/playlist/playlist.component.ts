import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify/spotify.service';
import { Promise } from 'es6-promise';
import { CdkDragEnter, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
        this.user = data;
    }, err=> { console.log(err); });
  }

  ngOnInit() {
    this.getPlaylists()
  }

  getPlaylists() {
    this._spotify.getCurrentUserPlaylists()
      .subscribe(data => {
        this.playlists = data.items
      })
  }

  getPlaylistsSongs(user_id, playlist) {
    this.currentPlaylist = playlist

    this._spotify.getPlaylistTracks(user_id, playlist.id)
      .subscribe(data => {
        this.tracks = data.items
      })
  }

  removeTrack(user_id, track, playlist_id) {
    this._spotify.removePlaylistTracks(user_id, playlist_id, [track.uri])
      .subscribe(data => {
        this._spotify.getPlaylistTracks(user_id, playlist_id, {snapshot_id: data.snapshot_id})
          .subscribe(data => {
            this.tracks = data.items
          })
      })
  }

  drop(event: CdkDragDrop<string[]>) {
    this.reorderPlaylistTracks(this.tracks, event.previousIndex, event.currentIndex);
    moveItemInArray(this.tracks, event.previousIndex, event.currentIndex);
  }

  private reorderPlaylistTracks(tracks, previousIndex, currentIndex) {
    if (previousIndex < currentIndex) {
      currentIndex += 1
    }
    this._spotify.reorderPlaylistTracks(this.user.id, this.currentPlaylist.id, {range_start: previousIndex, insert_before: currentIndex})
      .subscribe(data => {
        this._spotify.getPlaylistTracks(this.user.id, this.currentPlaylist.id, {snapshot_id: data.snapshot_id})
          .subscribe(data => {
            this.tracks = data.items
          })
      })
  }
}
