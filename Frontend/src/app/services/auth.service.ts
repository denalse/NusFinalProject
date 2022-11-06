import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

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

  myFav(author: string, text: string) {
    console.log("upload")
    const formData = new FormData()
    formData.set('author', author)
    formData.set('text', text)

    return firstValueFrom(
      this.http.post<any>(AUTH_API + 'favourites',
      {
        author,
        text
      },
      httpOptions
    )
  )}

  myFavToDigitalOcean(author: string, text: string) {
    console.log("upload to digitalOcean")
    const formData = new FormData()
    formData.set('author', author)
    formData.set('text', text)

    return firstValueFrom(
      this.http.post<any>(AUTH_API + 'favourites/spaces',
      {
        author,
        text
      },
      httpOptions
    )
  )}

}