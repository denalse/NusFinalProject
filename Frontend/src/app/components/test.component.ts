import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontendService } from '../services/frontend.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private fb: FormBuilder, private svc: FrontendService,
    private router: Router, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    if (window.location.href.includes('/test')) {
      this.svc.getFrontends()
        .then(result => {
          console.info(">>RESULT: " + result)
        })
        .catch(error => {
          console.error(">>ERROR: " , error);
        })
      } else if (window.location.href.includes('/probe')) {
        this.svc.getFrontendss()
        .then(result => {
          console.info(">>RESULT: " + result)
        })
      }
      console.info(window.location.href)
  }

}
