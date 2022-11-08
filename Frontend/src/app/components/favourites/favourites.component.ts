import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback, SearchQuote } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { DoService } from 'src/app/services/do.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  form!: FormGroup;
  errorMessage = ''
  successMessage = ''
  emailErr = "Email has error"
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private route: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
    console.log("HIT")
    this.form = this.createForm();

  }

  createForm(): FormGroup {
    return this.form = this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      feedback: this.fb.control<string>('', [Validators.required])
    })
  }

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
        this.route.navigate(['/home']);
    }, 5000);
  }

}
