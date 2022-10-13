import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Register } from 'src/app/models';
import { RegisterService } from 'src/app/services/register.service';


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

  @Output()
  onNewRegister = new Subject<Register>()

  // @Output()
  // registerListUpdated = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private svc: RegisterService,
    private router: Router, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    // this.form = this.createForm();
    this.form1 = this.addform1();
    this.form2 = this.addform2();

    this.form = this.form1 && this.form2;

  }

  addform1() {
    return this.form1 = this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      // password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),

    })
  }

  form1Submit() {
    const register: Register = this.form1.value as Register
    console.info(">>>>> Register Form (email): ", register)
    console.info(">>>>", this.form.value)
  }

  addform2() {
    return this.form2 = this.fb.group({
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    })
  }

  form2Submit() {
    const register: Register = this.form2.value as Register
    console.info(">>>>> Register Form (password): ", register)
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
