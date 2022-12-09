import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss']
})
export class DialogEditPlayerComponent {
  name: string = '';
  imgSrc: string = '';
  imgSrcs: string[]= ['avatar.png','dog.png','lion.png','man.png','sloth.png','woman1.png','woman2.png','woman3.png'];

  @ViewChild('avatarsEdit') avatarsEdit: ElementRef;

  constructor(public dialogRef: MatDialogRef<DialogEditPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = this.data.game.players[this.data.index];
    this.imgSrc = this.data.game.playerImgs[this.data.index];
  }

  deletePlayer(){
    this.dialogRef.close('delete');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  patternIsDirty(name: string) {
    return /\b(?:(?:ass+(?:\s+)?|i+(?:\s+)?|butt+(?:\s+)?|mo(?:(?:m|t|d)h?(?:e|a)?r?)(?:\s+)?)?f(?:(?:\s+)?u+)?(?:(?:\s+)?c+)?(?:(?:\s+)?k+)?(?:(?:e|a)(?:r+)?|i(?:n(?:g)?)?)?(?:s+)?(?:\s+)?(?:hole|head|(?:yo?)?u?)?)+\b/igm.test(name);
  }

  onWheel(e: any) {
    this.avatarsEdit.nativeElement.scrollLeft += e.deltaY;
  }

  setImage(src: string){
    this.imgSrc = src;
  }
}
