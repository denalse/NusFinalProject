import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';

const AUTH_API = '/test/';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  isLoggedIn = false;
  username: string = this.ar.snapshot.params['username']

  form!: FormGroup;
  errorMessage = ''
  successMessage = ''
  emailErr = "Email has error"
  isSubmitted: boolean = false;
  @Input()
  f!: Feedback

  constructor(private fb: FormBuilder, private route: Router, private ar: ActivatedRoute,
    private emailSvc: EmailService, private authSvc: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.form = this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      feedback: this.fb.control<string>('', [Validators.required])
    })
  }

  // onSubmit() {
  //   console.log("submit")
  //   if (this.form.valid) {
  //     // const name = this.form.value.name;
  //     // console.log(name)
  //     const _form: Feedback = this.form.value as Feedback;
  //     console.log(_form)
  //     this.successMessage = "Thank you for submitting!"
  //     this.reset()
  //   }
  //   this.errorMessage = "Please complete the form, thank you!"
  //   return this.errorMessage;
  // }

  onSubmit() {
    console.log("Test")
    // this.form.valid
    this.isSubmitted = true;
      const _form: Feedback = this.form.value as Feedback;
      console.log(_form)
      this.authSvc.sendEmail(_form.name, _form.email).subscribe({
        next: data => {
          console.log(data);
          this.successMessage = "Thank you for submitting!"
          this.reset()
        },
        error: err => {
          console.log(err)
          this.isSubmitted = false;
          this.errorMessage = "Please complete the form, thank you!"
          return this.errorMessage
        }
      })
    return; //moodboardtester
  }

  hasError(ctrlName: string) {
    return this.form.get(ctrlName)?.hasError('required')
  }

  reset() {
    this.isSubmitted = true;
    setTimeout(() => {
      this.form.reset,
        window.location.reload()
    }, 5000);
  }
}
