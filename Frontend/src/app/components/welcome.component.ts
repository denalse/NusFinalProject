import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  showSpinner!: boolean

  form!: FormGroup
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  componentType: string = 'Login';

  user!: User[]

  username: string = this.ar.snapshot.params['username']

  constructor(private route: Router,  private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.ar.snapshot.params['username'];
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
