import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Esercizio } from '../models/Esercizio';
import { SvolgimentoDaApprovare } from '../models/SvolgimentoDaApprovare';
import { VariabiliGlobaliService } from '../services/variabili-globali.service';

@Injectable({
  providedIn: 'root'
})
export class EserciziApiService {
	
    constructor(private http: HttpClient) { }
	
	esercizioCasuale(param: string) {
        return this.http.post<Esercizio>(VariabiliGlobaliService.ulrServerBackEnd + 
        		VariabiliGlobaliService.apiEsercizioCasuale, param).pipe(
            catchError(this.handleError)
        );
    }
	
	putSvolgimentoDaApprovare(param: SvolgimentoDaApprovare) {
        return this.http.post<SvolgimentoDaApprovare>(VariabiliGlobaliService.ulrServerBackEnd +
        		VariabiliGlobaliService.apiSvolgimentoDaApprovare, param).pipe(
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
