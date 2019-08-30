import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, CanActivate } from '@angular/router';

import { ImpostazioniGlobaliService } from './impostazioni-globali.service';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class IsloggedService implements CanActivate {

  constructor(private _router: Router) { }

  private utenteLoggatoObservable = new Subject<User>();
  utenteLoggatoOsservable$ = this.utenteLoggatoObservable.asObservable();
  private utenteLoggato = new User();

  getUtenteLoggato():User {
    return this.utenteLoggato;
  }

  updateUtenteLoggato(ut: User) {
    this.utenteLoggato = ut;
}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.utenteLoggato.tipoUtente == 'studente')
    return true;
    else return false;
  }
}
