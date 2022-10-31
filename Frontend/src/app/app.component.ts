import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { faker } from '@faker-js/faker';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

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

  isLoggedIn = true;
  username?: string;

  @ViewChild('sidenav') 
  sidenav!: MatSidenav;

  constructor(private router: Router, private ar: ActivatedRoute,
    private storageService: StorageService, private authService: AuthService,) {
    // this.title = 'Spring Boot - Angular Application';
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {

    const user = this.storageService.getUser();
    this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }


  sideNav() {
    console.log('sideNav')
    this.sideNavigation = !this.sideNavigation
  }
}
