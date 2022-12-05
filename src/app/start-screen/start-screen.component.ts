import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { Firestore, collectionData, collection, doc, getDoc, setDoc, docData, DocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firestore: Firestore, private router: Router){}
  
  async newGame() {
    let game = new Game();
    let coll = collection(this.firestore, 'games');
    let data = collectionData(coll);
    let docRef = doc(coll);
    let test = await getDoc(doc(coll));
    test.then((response) => console.log('No idea'));

    // this.router.navigateByUrl('game');
  }
}
