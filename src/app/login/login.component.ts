import { Component, OnInit, Input } from '@angular/core';
import { UserApiService } from '../services/user-api.service';
import { Md5 } from 'ts-md5/dist/md5';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { ImpostazioniGlobaliService } from '../services/impostazioni-globali.service';
import { IsloggedService } from '../services/islogged.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private form = {
        username: '',
        password: ''
    };
    private usernameOrPasswdValid = true;
    private userApiService: UserApiService;
    private user: User = new User();
    private router: Router;
    private subscription: Subscription;

    constructor(_userApiService: UserApiService, _router: Router, _impostazioniGlobaliService: ImpostazioniGlobaliService,
        private _isLoggedService: IsloggedService) {
        this.userApiService = _userApiService;
        this.router = _router;
    }

    ngOnInit() {
        var userNull: User = new User();
        this._isLoggedService.updateUtenteLoggato(userNull);
        this.user = userNull;
    }

    sent() {
        this.user.passwd = Md5.hashStr(this.form.password).toString();
        this.user.username = this.form.username;

        this.userApiService.postLogin(this.user).subscribe((response: User) => {
            if (response) {
                this.router.navigate(['tutorial']);
                this._isLoggedService.updateUtenteLoggato(response);
                //this._impostazioniGlobaliService.isStudente = response.tipoUtente == 'studente' ? true : false;
            } else {
                this.usernameOrPasswdValid = false;
            }
        });
    }

}
