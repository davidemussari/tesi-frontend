import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable()
export class UserApiService {

    public static ulrServerBackEnd: String = 'http://192.168.1.103:8080/';

    constructor(private http: HttpClient) { }

    postLogin(param: any) {
        return this.http.post<User>(UserApiService.ulrServerBackEnd + 'login', param).pipe(
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
