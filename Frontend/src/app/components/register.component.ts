import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Register } from '../models';
import { FrontendService } from '../services/frontend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
    form!: FormGroup
    form1!: FormGroup
    form2!: FormGroup
    hide: boolean = true

  @Output()
  onNewRegister = new Subject<Register>()

  constructor(private fb: FormBuilder, private svc: FrontendService,
      private router: Router, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.createForm();
    // this.form2 = this.createForm();
    // this.form2 = this.createForm();

  }

  createForm(): FormGroup {
    return this.form = this.fb.group({
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      password: this.fb.control<string>('', [ Validators.required, Validators.minLength(8) ]),
      // passwordCfm: this.fb.control<string>('', [ Validators.required, Validators.minLength(1) ]) //confirm pw
      terms: this.fb.control<boolean>(false, [ Validators.required ])
    })
  }

  processForm() {
    console.log("clicked")
    const register: Register = this.form.value as Register
    console.info(">>>>> Register Form: ", register)
    
    this.onNewRegister.next(register)
    this.form = this.createForm()
  }

  passwordEye() {
    this.hide = !this.hide;
  }
  passwordEye2() {
    this.hide = !this.hide;
  }
  

}
