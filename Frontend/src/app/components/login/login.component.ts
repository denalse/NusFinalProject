import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  showSpinner!: boolean

  form!: FormGroup
  
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.createLogin();
   }

  login() : void {
    if(this.email == 'fred@gmail.com' && this.password == 'admin'){
     this.router.navigate(["user"]);
    }else {
      alert("Invalid credentials");
    }
  }

  createLogin() {
    return this.form = this.fb.group({
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      password: this.fb.control<string>('', [ Validators.required ]),
    })
  }

  loginSubmit() {
    const login: Login = this.form.value as Login
    console.info(">>>>> Login Form: ", login)
    console.info(">>>>", this.form.value)
  }

}
