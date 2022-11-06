import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { faker } from '@faker-js/faker';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  title!: string;
  sideNavigation!: boolean;

  // image!: string | null;

  isLoggedIn = false;
  // username?: string;
  // username = this.ar.snapshot.params['username']

  username: string = '';
  comma: string = ', ';
  mark: string = "!"

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  constructor(private route: Router, private ar: ActivatedRoute,
    private storageService: StorageService, private authService: AuthService,) {
    // this.title = 'Spring Boot - Angular Application';
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    // window.location.reload();
    if (this.isLoggedIn) {

      this.username = this.storageService.getUser()?.username;
      console.info(">>>>>>>>>", this.username);
      // this.username = user.username;
      this.ar.snapshot.params['username']
    }
  }

  ngAfterViewInit() {
    console.info(">>", this.storageService.getUser()?.username);
    // console.log("Hello", this.user.username);
    // this.user = this.ar.snapshot.params['username']
  }

  // isLoggedIn(): boolean {
  //   // this.username = this.storageService.getUser()
  //   let url = window.location.href;
  //   if (!url.includes("moodBoard")) {
  //     return false;
  //   }
  //   return true;
  // }

  onSearch() {
    console.log("search click")
  }

  logout(): void {
    console.info("CLICKED")
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.route.navigate(['/logout']) //change too fast so cannot call
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
