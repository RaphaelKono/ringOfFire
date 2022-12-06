import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent {
  name: string = '';


  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>){}

  onNoClick(){
    this.dialogRef.close();
  }
}
