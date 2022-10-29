import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup
  isLinear = true;
  form1!: FormGroup
  form2!: FormGroup
  hide: boolean = true

  username = ""
  password = ""

  formSubmitAttempt!: boolean;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    // this.form = this.createForm();
    this.form1 = this.addform1();
    this.form2 = this.addform2();

  }

  addform1() {
    return this.form1 = this.fb.group({
      username: this.fb.control<string>('', [Validators.required]),
      // password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),

    })
  }

  form1Submit() {
    this.username = this.form1.value.username
    console.info(">>>>> Register Form (username): ", this.username)

  }

  addform2() {
    return this.form2 = this.fb.group({
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    })
  }

  
  form2Submit() {
    this.password = this.form2.value.password
    console.info(">>>>> Register Form (password): ", this.password)
  }
  
  form3() {
    console.info(`>>>> username: ${this.username}, password: ${this.password}`)
    // const getForm: User = this.form.value as User
    this.form = this.addform1(), this.addform2();
    console.info(this.form)
    const getForm = "username: " + this.username + "\npassword: " + this.password
    console.info(`>>>> Form: ${getForm}`)
    return getForm
  }

  // onSubmit(): void {

  //   this.form = this.addform1(), this.addform2();
    
  //   this.authService.register(this.username, this.password).subscribe({
  //     next: data => {
  //       console.log(data);
  //       this.isSuccessful = true;
  //       this.isSignUpFailed = false;
  //     },
  //     error: err => {
  //       this.errorMessage = err.error.message;
  //       this.isSignUpFailed = true;
  //     }
  //   });
  // }

  reset() {
    this.form.reset();
    this.formSubmitAttempt = false;
  }

  passwordEye() {
    this.hide = !this.hide;
  }

}
