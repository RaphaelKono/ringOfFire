import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-join-game',
  templateUrl: './dialog-join-game.component.html',
  styleUrls: ['./dialog-join-game.component.scss']
})
export class DialogJoinGameComponent {
  gameId: string;
  constructor(private dialogRef: MatDialogRef<DialogJoinGameComponent>) {}

  onNoClick(){
    this.dialogRef.close();
  }
}
