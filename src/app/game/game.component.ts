import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogDetailedInfoComponent } from '../dialog-detailed-info/dialog-detailed-info.component';
import { GameInfoHelperService } from 'src/services/game-info-helper.service';
import { Firestore, collectionData, collection, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  playedKings: number = 0;
  gameEnd = false;
  game$: Observable<any>;

  constructor(public dialog: MatDialog, public gameInfoHelper: GameInfoHelperService, private firestore: Firestore) {
    const coll = collection(this.firestore, 'games');
    this.game$ = collectionData(coll);
    this.game$.subscribe((game) => {
      console.log('Game update: ', game);
    });
  }

  ngOnInit(): void {
    this.newGame();
  }

  async newGame() {
    this.playedKings = 0;
    this.gameEnd = false;
    this.game = new Game();
    await setDoc(doc(this.game$, "games"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    });
  }

  openAddPlayerDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => this.validateNewPlayer(name));
  }

  openDetailsDialog(): void {
    const dialogRef = this.dialog.open(DialogDetailedInfoComponent);
    dialogRef.afterClosed().subscribe();
  }

  validateNewPlayer(name: string) {
    if (name && name.length > 0)
      this.game.players.push(name);
  }

  pickCard(index: number) {
    if (!this.pickCardAnimation)
      this.update(index);
  }

  update(index: number) {
    this.updateCards(index);
    this.updateGame();
  }

  updateCards(index: number) {
    this.currentCard = this.game.stack[index];
    this.gameInfoHelper.card = this.currentCard;
    this.gameInfoHelper.setCurrentCardInfo();
    this.game.stack[index] = "";
    this.pickCardAnimation = true;
  }

  updateGame() {
    if (this.game.players.length > 0)
      this.changeCurrentPlayer();
    setTimeout(() => this.setPickedCard(), 1500);
  }

  setPickedCard() {
    this.game.playedCards.push(this.currentCard);
    if (this.currentCard.includes('13'))
      this.playedKings++;
    this.pickCardAnimation = false;
    if (this.playedKings === 4)
      this.gameEnd = true;
  }

  changeCurrentPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }

  gameIsFull() {
    return this.game.players.length > 7;
  }
}
