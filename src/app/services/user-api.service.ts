import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { VariabiliGlobaliService } from '../services/variabili-globali.service';

@Injectable()
export class UserApiService {

    constructor(private http: HttpClient) { }

    postLogin(param: any) {
        return this.http.post<User>(VariabiliGlobaliService.ulrServerBackEnd + 
        		VariabiliGlobaliService.apiLogin, param).pipe(
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
