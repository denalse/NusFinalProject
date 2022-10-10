import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title!: string;

  @ViewChild('sidenav') 
  sidenav!: MatSidenav;


  constructor() {
    // this.title = 'Spring Boot - Angular Application';
  }

  ngOnInit(): void {
    // this.title = 'Spring Boot - Angular Application';
  }

  sideNav() {
    console.log('sideNav') 
  }
}
