import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  isLoggedIn = false;
  username: string = this.ar.snapshot.params['username']

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



}
