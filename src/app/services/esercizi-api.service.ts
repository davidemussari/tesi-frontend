import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Esercizio } from '../models/Esercizio';
import { User } from '../models/User';
import { SvolgimentoDaApprovare } from '../models/SvolgimentoDaApprovare';
import { StoricoEserciziSvoltiStudenti } from '../models/StoricoEserciziSvoltiStudenti';
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
	
	eserciziSvolti(param: User) {
        return this.http.post<Esercizio[]>(VariabiliGlobaliService.ulrServerBackEnd + 
        		VariabiliGlobaliService.apiEserciziSvoltiStudente, param).pipe(
            catchError(this.handleError)
        );
    }
	
	putSvolgimentoDaApprovare(param: SvolgimentoDaApprovare) {
        return this.http.put<SvolgimentoDaApprovare>(VariabiliGlobaliService.ulrServerBackEnd +
        		VariabiliGlobaliService.apiSvolgimentoDaApprovare, param).pipe(
            catchError(this.handleError)
        );
    }
	
	putSvolgimento(param: StoricoEserciziSvoltiStudenti) {
        return this.http.put<SvolgimentoDaApprovare>(VariabiliGlobaliService.ulrServerBackEnd +
        		VariabiliGlobaliService.apiEsercizioSvolto, param).pipe(
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
