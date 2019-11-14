import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Esercizio } from '../models/Esercizio';

@Injectable({
  providedIn: 'root'
})
export class EserciziApiService {
	
	public static ulrServerBackEnd: String = 'http://192.168.1.103:8080/';
    //public static ulrServerBackEnd: String = 'http://172.16.92.84:8080/';
    
    constructor(private http: HttpClient) { }
	
	esercizioCasuale(param: number) {
        return this.http.post<Esercizio>(EserciziApiService.ulrServerBackEnd + 'esercizioCasuale', param).pipe(
            catchError(this.handleError)
        );
    }
	
	handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

}
