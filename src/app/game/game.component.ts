import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogDetailedInfoComponent } from '../dialog-detailed-info/dialog-detailed-info.component';
import { GameInfoHelperService } from 'src/services/game-info-helper.service';
import { Firestore, collectionData, collection, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  game: Game;
  gameID: string = '';

  constructor(private route: ActivatedRoute, public dialog: MatDialog, public gameInfoHelper: GameInfoHelperService, private firestore: Firestore) {
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((param: any) => this.subscribeCurrentRoute(param));
    this.saveGame();
  }

  subscribeCurrentRoute(param: any) {
    this.gameID = param.id;
    let coll = collection(this.firestore, 'games');
    let docRef = doc(coll, this.gameID);
    let game$ = docData(docRef);
    game$.subscribe((game) => this.subscribeCurrentGameParameters(game));
  }

  newGame() {
    this.game = new Game();
    this.game.playedKings = 0;
    this.game.gameEnd = false;
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
    if (name && name.length > 0) {
      this.game.players.push(name);
      this.saveGame();
    }
  }

  pickCard(index: number) {
    if (!this.game.pickCardAnimation && this.game.players.length >0)
      this.update(index);
  }

  update(index: number) {
    this.updateCards(index);
    this.updateGame();
  }

  updateCards(index: number) {
    this.game.currentCard = this.game.stack[index];
    this.gameInfoHelper.card = this.game.currentCard;
    this.gameInfoHelper.setCurrentCardInfo();
    this.game.stack[index] = "";
    this.game.pickCardAnimation = true;
    this.saveGame();
  }

  updateGame() {
    if (this.game.players.length > 0)
      this.changeCurrentPlayer();
    setTimeout(() => this.setPickedCard(), 1500);
  }

  setPickedCard() {
    this.game.playedCards.push(this.game.currentCard);
    this.saveGame();
    if (this.game.currentCard.includes('13'))
      this.game.playedKings++;
    this.game.pickCardAnimation = false;
    this.saveGame();
    if (this.game.playedKings === 4)
      this.game.gameEnd = true;
    this.saveGame();
  }

  changeCurrentPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
  }

  gameIsFull() {
    return this.game.players.length > 7;
  }

  subscribeCurrentGameParameters(game: any) {
    this.game.players = game.players;
    this.game.currentPlayer = game.currentPlayer;
    this.game.stack = game.stack;
    this.game.playedCards = game.playedCards;
    this.game.pickCardAnimation = game.pickCardAnimation;
    this.game.currentCard = game.currentCard;
    this.game.playedKings = game.playedKings;
    this.game.gameEnd = game.gameEnd;
  }

  async saveGame() {
    let coll = collection(this.firestore, 'games');
    await setDoc(doc(coll, this.gameID), this.game.toJson());
  }
}
