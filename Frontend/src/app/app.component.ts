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

  isLoggedIn = false;
  username?: string;

  @ViewChild('sidenav') 
  sidenav!: MatSidenav;

  constructor(private route: Router, private ar: ActivatedRoute,
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
        alert("You have been logged out, see you tomorrow!");
      },
      error: err => {
        console.log(err);
      }
    });
    this.route.navigate(["/"])
  }


  sideNav() {
    console.log('sideNav')
    this.sideNavigation = !this.sideNavigation
  }
}
