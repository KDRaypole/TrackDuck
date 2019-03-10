import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { Promise } from 'es6-promise';
import { CdkDragEnter, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatCheckboxModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NewPlaylistComponent } from '../new-playlist/new-playlist.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  private user: any;
  private currentPlaylist: any;
  private playlists: any[];
  private tracks: any[];
  private searchTracks: any[];
  private searchPlaylists: any[];
  private searchAlbums: any[];
  private searchArtists: any[];
  private newPlaylistTitle: any;

  constructor(private _spotify: SpotifyService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this._spotify.getCurrentUser().subscribe(data => {
        this.user = data;
    }, err=> { console.log(err); });
  }

  ngOnInit() {
    this.getPlaylists()
    this.getUserLibrary()
  }

  addTrackToSelectedPlaylists(track_id) {
    this.playlists.filter(_ => _.selected).forEach(playlist => {
      this._spotify.addPlaylistTracks(this.user.id, playlist.id, [track_id], {position: 0})
        .subscribe(data => {
          this.snackBar.open("Track added!", "close", {
            duration: 1000,
            panelClass: 'dark-snackbar'
          });

          if (playlist.id == this.currentPlaylist.id) {
            this._spotify.getPlaylistTracks(this.user.id, playlist.id, {snapshot_id: data.snapshot_id})
              .subscribe(data => {
                this.tracks = data.items
              })
          }
        })
    })
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
    if (this.currentPlaylist && this.currentPlaylist.public) {
      this.reorderPlaylistTracks(this.tracks, event.previousIndex, event.currentIndex);
      moveItemInArray(this.tracks, event.previousIndex, event.currentIndex);
    } else {
      console.log("Cannot change private playlists")
    }
  }

  search(q) {
    this._spotify.search(q, "track,playlist", {limit: 6, market: 'from_token'})
      .subscribe(data => {
        this.searchTracks = data.tracks.items
        this.searchPlaylists = data.playlists.items
      })
  }

  newPlaylistDialog() {
    const dialogRef = this.dialog.open(NewPlaylistComponent, {
      width: '33%',
      data: {playlistTitle: this.newPlaylistTitle}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createNewPlaylist(result)
      }
    })
  }

  createNewPlaylist(name) {
    this._spotify.createPlaylist(this.user.id, {name: name, public: true})
      .subscribe(data => {
        this.getPlaylists()
      })
  }

  getUserLibrary() {
    this._spotify.getSavedUserTracks({limit: 50})
      .subscribe(data => {
        this.tracks = data.items
        this.currentPlaylist = ""
      })
  }

  deletePlaylist(user_id, playlist) {
    if(window.confirm('Are sure you want to delete this item ?')){
      this._spotify.unfollowPlaylist(user_id, playlist.id)
        .subscribe(data => {
          this.getPlaylists()
        })
      }
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
