import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GameInfoHelperService } from 'src/services/game-info-helper.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})



export class GameInfoComponent implements OnInit, OnChanges {
  @Input() card: string;

  constructor(public gameInfoHelper: GameInfoHelperService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.gameInfoHelper.setCard(this.card);
  }
}
