import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback, SearchQuote } from '../models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class DoService {

  data: SearchQuote[] = []
  random: any = []
  show: boolean = false
  author = '';
  text = '';

  constructor(private http: HttpClient) { }

  findQuote(author: string, text: string) {
    return fetch('https://type.fit/api/quotes').then(res => {
      return res.json()
    }).then(jsonResponse => {
      if (!jsonResponse.length) {
        console.log(jsonResponse)
        return []
      }
      this.random = jsonResponse[Math.floor(Math.random() * jsonResponse.length)]
      // console.log("Author: ", this.random.author, "\nQuote: ", this.random.text)
      // this.data = this.random
      this.data = this.random
      console.log("RESULT", this.data)
      this.show = true
      return this.random;
    })
      .then(quote => {
        this.author = quote.author;
        this.text = quote.text;
      })
  }

}