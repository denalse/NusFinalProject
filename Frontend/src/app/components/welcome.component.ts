import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private accountSvc: AccountService) {
    // redirect to home if already logged in
    if (this.accountSvc.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void { }

}
