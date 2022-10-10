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

  @Output()
  onNewRegister = new Subject<Register>()

  form!: FormGroup;

  constructor(private fb: FormBuilder, private svc: FrontendService,
      private router: Router, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.createForm(); //change

  }

  createForm(): FormGroup {
    return this.fb.group({
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      password: this.fb.control<string>('', [ Validators.required, Validators.minLength(8) ]),
      passwordCfm: this.fb.control<string>('', [ Validators.required, Validators.minLength(8) ]) //confirm pw
    })
  }

  processForm(){
    const register: Register = this.form.value as Register
    console.info(">>>>> Register Form: ", register)
    
    this.onNewRegister.next(register)
    this.form = this.createForm()
  }

}
