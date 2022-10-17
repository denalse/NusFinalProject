import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AccountService } from './services/account.service';
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


  constructor(private svc: AccountService, 
    private router: Router, private ar: ActivatedRoute) {
    // this.title = 'Spring Boot - Angular Application';
  }

  ngOnInit(): void { //, "width", "height", "search"
    // this.title = 'Spring Boot - Angular Application';
    // this.image = this.ar.snapshot.paramMap.get("type"); // Snapshot param

  }

  sideNav() {
    console.log('sideNav')
    this.sideNavigation = !this.sideNavigation
  }
}
