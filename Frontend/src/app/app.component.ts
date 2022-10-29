import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { faker } from '@faker-js/faker';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title!: string;
  sideNavigation!: boolean;

  image!: string | null;

  randomName = faker.name.fullName();


  @ViewChild('sidenav') 
  sidenav!: MatSidenav;


  constructor(
    private router: Router, private ar: ActivatedRoute) {
    // this.title = 'Spring Boot - Angular Application';
  }


  sideNav() {
    console.log('sideNav')
    this.sideNavigation = !this.sideNavigation
  }
}
