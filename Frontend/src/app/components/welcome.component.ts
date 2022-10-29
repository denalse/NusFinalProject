import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  showSpinner!: boolean

  form!: FormGroup
  loading = false;
  submitted = false;  
  componentType: string = 'Login';


  constructor(private fb: FormBuilder, private router: Router, private ar: ActivatedRoute,
    private alertSvc: AlertService) {  }

  ngOnInit() {
    this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
}



  // const user: User = this.form.value as User
  // console.info(">>>>> Login Form: ", user)
  // console.info(">>>>", this.form.value)  
  
  toggleShowApp(type: string){
    if(type == 'Login'){
      this.componentType = 'Login';
    }else{
      this.componentType = 'Register';
      // this.getAllContacts();
    }
  }
}
