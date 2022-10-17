import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
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
    private accountSvc: AccountService, private alertSvc: AlertService) {  }

  ngOnInit() {
    this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
}

  get data() {
    return this.form.controls;
  }

  loginSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertSvc.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountSvc.login(this.data.username.value, this.data.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.ar.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.alertSvc.error(error);
          this.loading = false;
        }
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

