import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameInfoHelperService {

  longText: string = '';
  title: string = '';
  subtitle: string = '';
  card: string = '';

  constructor() {}

  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks.' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. vegetables). Each player must enumerate one item from the category. No example can be repeated and first person failing has to take a drink' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one.' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'The player who gets the Queen keeps it and the game goes on. At any time in the future the player who holds the queen secretly puts their thumb on the table as the other players notice they too put their thumb on the table. Last person to notice and put their thumb on the table has to take a drink.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'Player becomes the Quizmaster. Everybody who answers him without appending "Mr/Mrs Quizmaster" has to drink.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule. Game ends when all kings are picked.' }
  ];

  setCurrentCardInfo() {
    let cardNumber = +this.card.split('_')[1];
    this.title = this.cardAction[cardNumber - 1].title;
    this.longText = this.cardAction[cardNumber - 1].description;
    this.subtitle = this.capitalizeFirstLetter(this.card.split('_')[0]) + ` ${cardNumber}`;
  }

  capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  adaptStringlength(str: string, amount: number) {
    if (str.length > amount) {
      str = str.slice(0, amount);
      str = str.concat('...');
    }
    return str;
  }
}
