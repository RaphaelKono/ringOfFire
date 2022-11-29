import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog){}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => this.validateNewPlayer(name));
  }

  validateNewPlayer(name: string){
    if (name && name.length > 0)
      this.game.players.push(name);
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  pickCard() {
    if (!this.pickCardAnimation)
      this.updateCards();
  }

  updateCards(){
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;
    if (this.game.players.length > 0)
      this.changeCurrentPlayer();
    setTimeout(() => this.setPickedCard(), 1500);
  }

  setPickedCard(){
    this.game.playedCards.push(this.currentCard);
    this.pickCardAnimation = false
  }

  changeCurrentPlayer(){
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }
}
