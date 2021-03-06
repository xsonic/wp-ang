import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("id_token");

        if (idToken) {
            const clone = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            // return next.handle(cloned);
            return next.handle(clone).do(() => {
            }, (error: HttpErrorResponse) => {
                console.log(error);
                if (error.status === 401 || error.status === 403) {
                    //navigate /delete cookies or whatever
                    console.log('Errör');

                    AuthService.cleanAuthLocalstorage();
                    this.router.navigateByUrl(`/login`);
                    // return Observable.of(error.message);
                }
            });
        } else {
            return next.handle(req);
        }
    }

}

