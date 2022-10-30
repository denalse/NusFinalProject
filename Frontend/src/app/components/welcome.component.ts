import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { User } from '../models';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  showSpinner!: boolean

  form!: FormGroup
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  componentType: string = 'Login';
  username!: string;

  user!: User[]


  constructor(private authService: AuthService, private storageService: StorageService, private fb: FormBuilder) { }


  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.initForm();


  }

  initForm() {
    return this.form = this.fb.group({
      username: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required])
    })
  }

  submit() {
    console.log("FORM SUBMIT")
    // this.userForm = {username: this.form.controls.username.value , password: this.form.controls.password.value};
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  toggleShowApp(type: string) {
    if (type == 'Login') {
      this.componentType = 'Login';
    } else {
      this.componentType = 'Register';
      // this.getAllContacts();
    }
  }
}
