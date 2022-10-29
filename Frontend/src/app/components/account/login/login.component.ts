import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showSpinner!: boolean

  form!: FormGroup
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private ar: ActivatedRoute,
     private alertSvc: AlertService) {  }

  ngOnInit(): void {
    this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
}
  // const user: User = this.form.value as User
  // console.info(">>>>> Login Form: ", user)
  // console.info(">>>>", this.form.value)
}

  // login(): void {
  //   if (this.username == 'admin' && this.password == 'admin') {
  //     this.router.navigate(["user"]);
  //   } else {
  //     alert("Invalid credentials");
  //   }
  // }

