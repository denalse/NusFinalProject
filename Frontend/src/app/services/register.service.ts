import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Subject } from "rxjs";
import { Register } from "../models";

@Injectable()
export class RegisterService {

    test!: string;

    newRegister = new Subject<Register[]>();

    constructor(private http: HttpClient) { }

    getFrontends(): Promise<any> { //test purpose
        const params = new HttpParams()
            // .set("test", this.test)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        return firstValueFrom(
            this.http.get<any>('/test', { params })
        )
    }

    getFrontendss(): Promise<any> { //test purpose
        const params = new HttpParams()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        return firstValueFrom(
            this.http.get<any>('/probe', { params })
        )
    }

    onNewRegister(register: Register): Promise<any> {
        console.log("Service Hit");

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        return firstValueFrom(
            this.http.post<any>('/register', register, { headers })
        )
    }

}