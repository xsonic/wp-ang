import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {SnotifyService} from 'ng-snotify'

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService,
                public router: Router,
                private snotifyService: SnotifyService) {
    }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            this.snotifyService.error('Log in first', 'Denied');
            return false;
        }
        return true;
    }

}