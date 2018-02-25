import {Component} from '@angular/core';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {AuthService} from './auth/auth.service';
import {Globals} from './globals'

@Injectable()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private http: HttpClient,
                private auth: AuthService,
                private router: Router,
                private globals: Globals) {
    }

    title = 'app';

    private baseUrl = 'http://dev.form-fabrik.de/wordpress/wp-json';
    private testUtl = this.baseUrl + '/test/usercan';

    logout() {
        this.auth.logout();
        this.router.navigateByUrl('/');
    }

    isAuthenticated() {
        return this.auth.isAuthenticated();
    }
}
