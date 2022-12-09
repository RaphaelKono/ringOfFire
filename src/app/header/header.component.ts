import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  menuOn = false;

  constructor(private router: Router){}

  toggleMenu(){
    this.menuOn = !this.menuOn;
    console.log(this.menuOn);
  }

  navigate(url:string){
    this.router.navigateByUrl(url);
  }
}
