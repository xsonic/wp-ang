import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs/Rx'
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import * as moment from "moment";

import {User} from './classes/user';

@Injectable()

export class AuthService {
    constructor(private http: HttpClient) {
        console.log(localStorage);
    }

    login(username: string, password: string) {
        console.log('dgdhdf');
        return this.http.post<User>('http://dev.form-fabrik.de/wordpress/wp-json/jwt-auth/v1/token', {username, password})
            .do(this.setSession)
            .shareReplay();
    }

    private setSession(authResult) {
        console.log('authResult: ', authResult);
        const expiresAt = moment().add(100, 'second');

        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        console.log(!this.isLoggedIn());
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
