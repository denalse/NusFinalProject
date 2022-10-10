import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable()
export class FrontendService {
    
    test!: string;

    constructor(private http: HttpClient) { }

    

    getFrontends(): Promise<any> { //test

        const params = new HttpParams()
            // .set("test", this.test)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        return firstValueFrom(
            this.http.get<any>('/test', { params })
        )
    }

    getFrontendss(): Promise<any> { //test

        const params = new HttpParams()
            // .set("test", this.test)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        return firstValueFrom(
            this.http.get<any>('/probe', { params })
        )
    }

}