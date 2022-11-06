import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models';

const AUTH_API = '/api/auth/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptions1 = {
  headers: new HttpHeaders({ 'Content-Type': 'text/html' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password
      },
      httpOptions
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        password
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  sendEmail(name: string, email: string): Observable<any> {
    console.log("CLICKED")
    return this.http.post(
      AUTH_API + 'send',
      {
        name,
        email
      },
      httpOptions
    )
  }
  // sendEmail(): Observable<any> {
  //   console.log("CLICKED")
  //    return this.http.post<Feedback>(AUTH_API + 'send', {}, httpOptions)

  // }

}