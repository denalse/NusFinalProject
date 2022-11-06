import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showSpinner!: boolean

  form!: FormGroup
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  componentType: string = 'Login';

  user!: User[]

  username!: string // = this.ar.snapshot.params['username']

  constructor(private route: Router,  private ar: ActivatedRoute,
    private storageSvc: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageSvc.isLoggedIn();
    if (this.isLoggedIn) {

      let user = this.storageSvc.getUser();
      this.username = user.username;
      this.ar.snapshot.params['username']
    }
  }

  // toggleShowApp(type: string) {
  //   if (type == 'Login') {
  //     this.componentType = 'Login';
  //   } else {
  //     this.componentType = 'Register';
  //     // this.getAllContacts();
  //   }
  // }
}
