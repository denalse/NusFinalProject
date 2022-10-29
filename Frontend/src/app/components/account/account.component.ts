import { Component, OnInit } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { User } from 'src/app/models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // currentUser!: User;
  // currentUserSubscription: Subscription;
  // users: User[] = [];

  constructor() {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}



