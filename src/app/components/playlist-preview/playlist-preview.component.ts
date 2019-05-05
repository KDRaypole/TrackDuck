import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SpotifyService } from '../../services/spotify/spotify.service'

export interface DialogData {
  playlistId: string
  playlistName: string
  userId: string
}

@Component({
  selector: 'app-playlist-preview',
  templateUrl: './playlist-preview.component.html',
  styleUrls: ['./playlist-preview.component.scss']
})
export class PlaylistPreviewComponent implements OnInit {
  playlistName: string 
  tracks: any[]

  constructor(
    public dialogRef: MatDialogRef<PlaylistPreviewComponent>,
    private _spotify: SpotifyService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.playlistName = this.data.playlistName
  }

  ngOnInit() {
    this._spotify.getPlaylistTracks(this.data.userId, this.data.playlistId)
      .subscribe(data => {
        this.tracks = data.items
      })
  }

  addTrackToLibrary(track_id) {
    this._spotify.saveUserTracks([track_id])
      .subscribe(data => {
        this.snackBar.open("Track added to your library!", "close", {
          duration: 5000,
          panelClass: ['dark-snackbar']
        });
      })
  }
}
