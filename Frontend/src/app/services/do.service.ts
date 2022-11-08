import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject, tap } from 'rxjs';
import { Feedback, SearchQuote } from '../models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class DoService {

  quote!: SearchQuote
  random: any = []
  show: boolean = false


  newQuote = new Subject<SearchQuote[]>();

  constructor(private http: HttpClient) { }

  async getQuote() {
    // this.route.navigate(['/quotes'])
    const res = await fetch('https://type.fit/api/quotes');
    const jsonResponse = await res.json();
    if (!jsonResponse.length) {
      console.log(jsonResponse);
      return [];
    }
    this.random = jsonResponse[Math.floor(Math.random() * jsonResponse.length)];
    this.quote = this.random;
    return this.random;
  }
  
  

  getAllQuotes(): Promise<any> {
    return firstValueFrom(
      this.http.get<any>('favourites')
        .pipe(
          tap(data => {
            console.info("SVC HIT",data)
            this.newQuote.next(data)
          })
        )
    )
  }

}