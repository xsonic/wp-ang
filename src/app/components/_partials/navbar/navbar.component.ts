import {Component, OnInit} from '@angular/core';

import {AuthService} from '@app/auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    currentUsername = AuthService.getUserName();

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
    }

    logout() {
        this.auth.logout();
    }

    isAuthenticated() {
        return AuthService.isAuthenticated();
    }
}
