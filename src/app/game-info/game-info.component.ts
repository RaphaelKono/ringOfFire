import { Component, OnInit } from '@angular/core';
import { GameInfoHelperService } from 'src/services/game-info-helper.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {



  constructor(public gameInfoHelper: GameInfoHelperService) { }

  ngOnInit() {
  }

  onResize(){
    this.bigScreen();
  }

  bigScreen() {
    return window.innerHeight > 600 && window.innerWidth > window.innerHeight;
  }
}
