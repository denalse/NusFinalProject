import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showSpinner!: boolean

  form!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  isSubmitted = false;

  hide: boolean = true

  username: string = this.ar.snapshot.params['username']

  constructor(private fb: FormBuilder, private ar: ActivatedRoute, private route: Router,
    private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.ar.snapshot.params['username'];
      // this.window.location(['home/{username}']);
      this.route.navigate(['home/{username}']);
    }
    this.initForm();
  }

  initForm() {
    return this.form = this.fb.group({
      username: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required])
    })
  }

  login(): void {
    console.log("FORM SUBMIT")
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
        setTimeout(() => {
          this.reset
        }, 3000);
        // this.reset();
      },
      error: err => {
        this.errorMessage = "Login Failed, please try again :("
        this.errorMessage = err.error.errorMessage;
        this.isLoginFailed = true;
        console.info('Login Failed')
        setTimeout(() => {
          this.reset, this.errorMessage
        }, 3000);
      }
    });
  }

  reloadPage() {
    this.ar.snapshot.params['username']
    this.route.navigate(['home/{username}']);
  }

  reset() {
    this.form.reset();
    this.isSubmitted = false;
    this.isLoggedIn = false;
    this.isLoginFailed = false;
    console.log("RESET FORM")
  }

  passwordEye() {
    this.hide = !this.hide;
  }
}

