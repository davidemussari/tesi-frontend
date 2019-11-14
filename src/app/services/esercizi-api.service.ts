import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Esercizio } from '../models/Esercizio';
import { VariabiliGlobaliService } from '../services/variabili-globali.service';

@Injectable({
  providedIn: 'root'
})
export class EserciziApiService {
	
    constructor(private http: HttpClient) { }
	
	esercizioCasuale(param: string) {
        return this.http.post<Esercizio>(VariabiliGlobaliService.ulrServerBackEnd + 'esercizioCasuale', param).pipe(
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
