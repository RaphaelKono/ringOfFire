import { Component, OnChanges, SimpleChanges} from '@angular/core';
import { GameInfoHelperService } from 'src/services/game-info-helper.service';


@Component({
  selector: 'app-dialog-detailed-info',
  templateUrl: './dialog-detailed-info.component.html',
  styleUrls: ['./dialog-detailed-info.component.scss']
})
export class DialogDetailedInfoComponent implements OnChanges{
  constructor (public gameInfoHelper: GameInfoHelperService){}

  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
