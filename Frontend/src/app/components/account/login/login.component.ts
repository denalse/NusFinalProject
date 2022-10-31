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

  userForm!: User;

  username: string = this.ar.snapshot.params['username']

  constructor(private fb: FormBuilder, private ar: ActivatedRoute, private route: Router,
    private authService: AuthService, private storageService: StorageService) { }

  email: string = this.ar.snapshot.params['email'];


  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.initForm();
  }

  initForm() {
    return this.form = this.fb.group({
      username: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required])
    })
  }

  submit(): void {
    console.log("FORM SUBMIT")
    // this.userForm = {username: this.form.controls.username.value , password: this.form.controls.password.value};
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage() {
    this.route.navigate(['welcome/{username}']);
    // username: string = this.ar.snapshot.params['username']
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

