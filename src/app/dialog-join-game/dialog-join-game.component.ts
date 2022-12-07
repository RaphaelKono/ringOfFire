import { Component, Inject, OnInit } from '@angular/core';
import { Firestore, doc, getDoc, collectionData, collection } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-dialog-join-game',
  templateUrl: './dialog-join-game.component.html',
  styleUrls: ['./dialog-join-game.component.scss']
})
export class DialogJoinGameComponent implements OnInit {
  gameId: string;
  pattern = /[\w]{20,}/;
  gameIds: any[] = [];

  constructor(private firestore: Firestore, private dialogRef: MatDialogRef<DialogJoinGameComponent>) { }

  ngOnInit(): void {
    this.getGamesIdList();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  async getGamesIdList() {
    const games$ = collectionData(collection(this.firestore, 'games'), { idField: 'id' });
    games$.pipe(take(1)).subscribe((game) => game.forEach(element => this.gameIds.push(element["id"])));
  }
}
