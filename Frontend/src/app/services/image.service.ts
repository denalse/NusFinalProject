import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Subject } from "rxjs";
import { SearchCriteria } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ImageService {


  // url: string = 'https://loremflickr.com/'; 
  // //https://loremflickr.com/g/3500/2480/color
  // //A random pic of 3508 x 2480 pixels
  // // g (gray), p (pixel) , red, green, blue

  // constructor(private http: HttpClient) { }
  
  // search(criteria: SearchCriteria): Promise<string[]> {
  //   console.log("svc HIT")
  // //   // Construct the query params
  //   const params = new HttpParams()
  // //     .get(criteria.type)
  // //     .get(criteria.width)
  // //     .get(criteria.height)
  // //   .get(criteria.search)
  //       .append('', criteria.type)
  //       .set('', criteria.width)
  //       .set('', criteria.height)
  //       .set('', criteria.search)
  // // search(data: any) {

  //       return firstValueFrom(
  //         this.http.get<any>(this.url, { params })
  //           // .pipe(
  //           //   map(result => {
  //           //     const data = result.data
  //           //     // return data.map((v: any) => v.images.downsized_still.url as string)
  //           //     return data.map((v: any) => v.images.fixed_height.url as string)
  //           //   })
  //           // )
  //       )
  // }


}
