import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models';

const AUTH_API = 'http://localhost:8080/api/auth/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginRequest: User): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username: loginRequest.username,
        password: loginRequest.password
      },
      httpOptions
    );
  }

  register(userSignUpRequest: User): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username: userSignUpRequest.username,
        password: userSignUpRequest.password
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }
}