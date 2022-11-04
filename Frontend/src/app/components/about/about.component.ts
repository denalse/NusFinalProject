import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';


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
    private storageSvc: StorageService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.form = this.fb.group({
      name: this.fb.control<string>('', [ Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      feedback: this.fb.control(this.f?.feedback, [Validators.required])
    })
  }

  submitForm() {
    console.log("submit")
    if (this.form.valid) {
      // const name = this.form.value.name;
      // console.log(name)
      const _form: Feedback = this.form.value as Feedback;
      console.log(_form)
      this.successMessage = "Thank you for submitting!"
      this.reset()
    } 
      this.errorMessage = "Please complete the form, thank you!"
      return this.errorMessage;
  }

  // onSubmit(): void {
  //   this.authSvc.sendEmail(this.form).subscribe(
  //     data => {
  //       console.log(data);

	//     this.isSubmitted = true;
  //     },
  //     err => {
  //       this.errorMessage = err.error.message;
  //     }
  //   );
  // }

  hasError(ctrlName: string) {
    return this.form.get(ctrlName)?.hasError('required')
  }

  reset() {
    this.isSubmitted = true;
    setTimeout( () => {
      this.form.reset,
      window.location.reload()
      }, 10000 );
  }
}
