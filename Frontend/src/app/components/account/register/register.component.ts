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

  username = ""
  password = ""

  formSubmitAttempt!: boolean;

  // @Output()
  // registerListUpdated = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private svc: AccountService,
    private router: Router, private ar: ActivatedRoute) { }

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
    // const user: User = this.form1.value as User
    // console.info(">>>>> Register Form (username): ", user)
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
  }

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

}
