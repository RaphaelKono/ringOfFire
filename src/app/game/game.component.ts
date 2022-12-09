import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogDetailedInfoComponent } from '../dialog-detailed-info/dialog-detailed-info.component';
import { GameInfoHelperService } from 'src/services/game-info-helper.service';
import { Firestore, collectionData, collection, doc, setDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  game: Game;
  gameID: string = '';
  @ViewChild('scrollX') scrollX: ElementRef;
  cardStyle: any = {};


  constructor(private route: ActivatedRoute, public dialog: MatDialog, public gameInfoHelper: GameInfoHelperService, private firestore: Firestore) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((param: any) => this.subscribeCurrentRoute(param));
  }

  subscribeCurrentRoute(param: any) {
    this.gameID = param.id;
    let coll = collection(this.firestore, 'games');
    let docRef = doc(coll, this.gameID);
    let game$ = docData(docRef);
    game$.subscribe((game) => this.subscribeCurrentGameParameters(game));
  }

  getCardStyle(i) {
    return this.cardStyle = { 'transform': 'rotate(' + i * (360 / this.game.stack.length) + 'deg)', '-webkit-transform': 'rotate(' + i * (360 / this.game.stack.length) + 'deg)', '-ms-transform': 'rotate(' + i * (360 / this.game.stack.length) + 'deg)' }
  }

  newGame() {
    this.game = new Game();
    this.game.playedKings = 0;
    this.game.gameEnd = false;
  }

  openAddPlayerDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((result: any) => this.validateNewPlayer(result));
  }

  openDetailsDialog(): void {
    const dialogRef = this.dialog.open(DialogDetailedInfoComponent);
    dialogRef.afterClosed().subscribe();
  }

  openEditPlayerDialog(i: number): void {
    const dialogRef = this.dialog.open(DialogEditPlayerComponent, {
      data: { index: i, game: this.game }
    });
    dialogRef.afterClosed().subscribe(result => this.validateEditedPlayer(i, result));
  }

  validateNewPlayer(result: any) {
    if (result.newName && result.newName.length > 0)
      this.addPlayer(result);
  }

  addPlayer(result: any){
    this.game.players.push(result.newName);
      this.game.playerImgs.push(result.newImgSrc);
      this.saveGame();
  }

  validateEditedPlayer(i: number, result: any) {
    if (result === 'delete')
      this.removePlayer(i);
    else if (result && result.newName && result.newName.length > 0)
      this.editplayer(i, result)
  }

  removePlayer(i: number){
    this.game.players.splice(i, 1);
    this.game.playerImgs.splice(i, 1);
    this.saveGame();
  }

  editplayer(i: number, result: any){
    this.game.players.splice(i, 1, result.newName);
    this.game.playerImgs.splice(i, 1, result.newImgSrc);
    this.saveGame();
  }

  pickCard(index: number) {
    if (!this.game.pickCardAnimation && this.game.players.length > 0)
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
    if (this.game.currentCard.includes('13'))
      this.game.playedKings++;
    this.game.pickCardAnimation = false;
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
    return this.game.players.length > 12;
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
    this.game.playerImgs = game.playerImgs;
  }

  async saveGame() {
    let coll = collection(this.firestore, 'games');
    await setDoc(doc(coll, this.gameID), this.game.toJson());
  }

  onWheel(e: any) {
    this.scrollX.nativeElement.scrollLeft += e.deltaY;
  }

  restartGame() {
    this.newGame();
    this.saveGame();
  }
}
