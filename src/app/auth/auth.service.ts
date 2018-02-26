import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SnotifyService} from 'ng-snotify'

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import * as moment from "moment";

import {User} from '@app/classes/user';

@Injectable()

export class AuthService {

    constructor(private http: HttpClient,
                private router: Router,
                private snotifyService: SnotifyService) {
    }

    login(username: string, password: string) {
        return this.http.post<User>('http://dev.form-fabrik.de/wordpress/wp-json/jwt-auth/v1/token', {username, password})
            .do(AuthService.setSession)
            .do(() => {
            }, (error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    this.snotifyService.error(error.error.message, 'Denied');
                }
            })
            .shareReplay();
    }

    private static setSession(authResult) {
        console.log(authResult);
        const expiresAt = moment().add(1000, 'second');
        localStorage.setItem('username', authResult.user_nicename);
        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }

    private static getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    public static cleanAuthLocalstorage() {
        localStorage.removeItem("username");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public logout() {
        AuthService.cleanAuthLocalstorage();
        this.router.navigateByUrl('/');
    }

    public static isAuthenticated(): boolean {
        return moment().isBefore(AuthService.getExpiration());
    }

    public static getUserName() {
        return localStorage.getItem('username');
    }

}
