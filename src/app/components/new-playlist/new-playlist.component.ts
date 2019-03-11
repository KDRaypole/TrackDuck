import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  playlistTitle: string
}

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.scss']
})
export class NewPlaylistComponent implements OnInit {

  constructor(
  public dialogRef: MatDialogRef<NewPlaylistComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  submit() {
    this.dialogRef.close(this.data.playlistTitle)
  }

  ngOnInit() {
  }

}
