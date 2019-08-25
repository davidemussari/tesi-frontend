import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/user-api.service';
import { Md5 } from 'ts-md5/dist/md5';
import { User } from '../models/User';
import { Router } from '@angular/router';

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

    constructor(_userApiService: UserApiService, _router: Router) {
        this.userApiService = _userApiService;
        this.router = _router;
    }

    ngOnInit() {
    }

    sent() {
        this.user.passwd = Md5.hashStr(this.form.password).toString();
        this.user.username = this.form.username;

        this.userApiService.postLogin(this.user).subscribe((response) => {
            if (response) {
                this.router.navigate(['tutorial']);
            } else {
                this.usernameOrPasswdValid = false;
            }
        });
    }

}
