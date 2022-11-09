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
      this.username = this.ar.snapshot.params['username'];
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
    const user: User = this.form.value
    console.info(this.form.get('username')?.value)
    this.authService.login(user.username, user.password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.route.navigate(['/home', user.username]);
        console.info(">>>>",user.username)
        setTimeout(() => {
          window.location.reload(), this.reset //abit of lag here due to refresh
        }, 1000);
      },
      error: err => {
        this.errorMessage = "Login failed, please try again :("
        this.errorMessage = err.error.errorMessage;
        this.isLoginFailed = true;
        console.info(err,'Login Failed')
        setTimeout(() => {
          this.reset //, this.errorMessage
        }, 5000);
      }
    });
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

