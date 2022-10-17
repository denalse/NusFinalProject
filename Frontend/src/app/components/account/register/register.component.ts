import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models';
import { AccountService } from 'src/app/services/account.service';


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

  formSubmitAttempt!: boolean;

  // @Output()
  // registerListUpdated = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private svc: AccountService,
    private router: Router, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    // this.form = this.createForm();
    this.form1 = this.addform1();
    this.form2 = this.addform2();

    this.form = this.form1 && this.form2;

  }

  addform1() {
    return this.form1 = this.fb.group({
      username: this.fb.control<string>('', [Validators.required]),
      // password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),

    })
  }

  form1Submit() {
    const user: User = this.form1.value as User
    console.info(">>>>> Register Form (username): ", user)
    console.info(">>>>", this.form.value)
  }

  addform2() {
    return this.form2 = this.fb.group({
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    })
  }

  form2Submit() {
    const user: User = this.form2.value as User
    console.info(">>>>> Register Form (password): ", user)
    console.info(">>>>FORM2>>>", this.form.value)

  }

  // createForm(): FormGroup {
  //   return this.form = this.fb.group({
  //     email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
  //     password: this.fb.control<string>('', [ Validators.required, Validators.minLength(8) ]),
  //     // passwordCfm: this.fb.control<string>('', [ Validators.required, Validators.minLength(1) ]) //confirm pw
  //     terms: this.fb.control<boolean>(false, [ Validators.required ])
  //   })
  // }

  // submitForm() {
  //   console.log("clicked")
  //   const register: Register = this.form.value as Register
  //   console.info(">>>>> Register Form: ", register)
  //   this.form = this.createForm()
  //   this.onNewRegister.next(register)
  //   this.registerListUpdated.emit(true);

  // }

  reset() {
    this.form.reset();
    this.formSubmitAttempt = false;
  }

  passwordEye() {
    this.hide = !this.hide;
  }
  // passwordEye2() {
  //   this.hide = !this.hide;
  // }



}
