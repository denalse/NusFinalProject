import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  constructor(private http: HttpClient) { }

  dataset: Feedback = {
    name: '',
    email: '',
    feedback: ''
  };

  sendEmail() {
    console.log("CLICKED")
    this.http.post<Feedback>('/test/send', this.dataset).subscribe(
      res => {
        this.dataset = res;
        console.log(this.dataset);
        alert('Email Sent successfully');
        this.dataset.name = '';
        this.dataset.email = '';
        this.dataset.feedback = '';
      }), 
      httpOptions
  }

}