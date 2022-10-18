import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Subject } from "rxjs";
import {  SearchQuotes } from '../models';


@Injectable({
  providedIn: 'root'
})
export class DoService {

  url: string = 'https://type.fit/api/quotes'; 

  onNewResult = new Subject<string[]>()

  constructor(private http: HttpClient) { }
  
  // getQuote(quotes: SearchQuotes): Promise<string[]> {
  //   console.log("Svc HIT")

  //   // Construct the query params
  //   const params = new HttpParams()

  //       .set('text', quotes.text)
  //       .set('author', quotes.author)
  // // // search(data: any) {

  //       return firstValueFrom(
  //         this.http.get<any>(this.url, { params })
  //           .subscribe((res)=>{
  //           this.data = res
  //           console.log(this.data)
  //         })
  //       }
  //           // .pipe(
  //           //   map(result => {
  //           //     const data = result.data
  //           //     // return data.map((v: any) => v.images.downsized_still.url as string)
  //           //     return data.map((v: any) => v.quotes as string)
  //           //   })
  //           // )
  //       )
  


}
