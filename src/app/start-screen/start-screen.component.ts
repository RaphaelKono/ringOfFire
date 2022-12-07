import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogJoinGameComponent } from '../dialog-join-game/dialog-join-game.component';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firestore: Firestore, private router: Router, public dialog: MatDialog) { }

  async newGame() {
    let game = new Game();
    let coll = collection(this.firestore, 'games');
    let docRef = await addDoc(coll, game.toJson());
    this.router.navigateByUrl('game/' + docRef.id);
  }

  joinGame() {
    const dialogRef = this.dialog.open(DialogJoinGameComponent);
    dialogRef.afterClosed().subscribe(result => this.validateResult(result));
  }

  validateResult(result: any) {
    if (result)
      this.router.navigateByUrl('game/' + result);
  }
}
