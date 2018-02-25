import {Component} from '@angular/core';


import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {User} from './classes/user';

@Injectable()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    private baseUrl = 'http://dev.form-fabrik.de/wordpress/wp-json';
    private testUtl = this.baseUrl + '/test/usercan';

    constructor(private http: HttpClient) {
    }

    // http://dev.form-fabrik.de/wordpress/wp-json/wp/v2/posts
    doTheTest(): Observable<User[]> {
        return this.http.get<User[]>(this.testUtl);
        // this.messageService.add('HeroService: fetched heroes');
        // return of(POSTS);
    }

    loginTest() {
        console.log('doTheTest');
        return this.doTheTest()
            .subscribe(function (res) {
                console.log(res);
            });
    }
}
