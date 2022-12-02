import { Component} from '@angular/core';
import { GameInfoHelperService } from 'src/services/game-info-helper.service';


@Component({
  selector: 'app-dialog-detailed-info',
  templateUrl: './dialog-detailed-info.component.html',
  styleUrls: ['./dialog-detailed-info.component.scss']
})
export class DialogDetailedInfoComponent{
  constructor (public gameInfoHelper: GameInfoHelperService){}
}
