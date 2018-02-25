import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {SnotifyService} from 'ng-snotify'
import {Observable, Subject} from 'rxjs/Rx'

import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import * as moment from "moment";

import {User} from '../classes/user';

@Injectable()

export class AuthService {

    constructor(private http: HttpClient,
                private snotifyService: SnotifyService) {
    }

    login(username: string, password: string) {
        return this.http.post<User>('http://dev.form-fabrik.de/wordpress/wp-json/jwt-auth/v1/token', {username, password})
            .do(this.setSession)
            .do(event => {
            }, (error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    this.snotifyService.error(error.error.message, 'Denied');
                }
            })
            .shareReplay();
    }

    private setSession(authResult) {
        const expiresAt = moment().add(1000, 'second');
        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }

    public logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isAuthenticated(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    public isUnauthenticated() {
        return !this.isAuthenticated();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

}
