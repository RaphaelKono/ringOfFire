import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent {
  name: string = '';
  imgSrc: string = '';
  imgSrcs: string[]= ['avatar.png','dog.png','lion.png','man.png','sloth.png','woman1.png','woman2.png','woman3.png'];
  @ViewChild('avatars') avatars: ElementRef;

  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>){}

  onNoClick(){
    this.dialogRef.close();
  }

  patternIsDirty(name: string){
    return /\b(?:(?:ass+(?:\s+)?|i+(?:\s+)?|butt+(?:\s+)?|mo(?:(?:m|t|d)h?(?:e|a)?r?)(?:\s+)?)?f(?:(?:\s+)?u+)?(?:(?:\s+)?c+)?(?:(?:\s+)?k+)?(?:(?:e|a)(?:r+)?|i(?:n(?:g)?)?)?(?:s+)?(?:\s+)?(?:hole|head|(?:yo?)?u?)?)+\b/igm.test(name);
  }

  onWheel(e: any) {
    this.avatars.nativeElement.scrollLeft += e.deltaY;
  }

  setImage(src: string){
    this.imgSrc = src;
  }
}
