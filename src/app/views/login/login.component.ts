import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {FormGroup, FormControl, Validators, FormBuilder}  from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthService} from '../../auth/auth.service';
import {Globals} from '../../globals';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private globals: Globals) {

        if (this.authService.isAuthenticated()) {
            this.router.navigateByUrl('/profile');
        }

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        const val = this.loginForm.value;

        // if (val.username && val.password) {
        this.authService.login(val.username, val.password)
            .subscribe(
                (data) => {
                    this.globals.username = data.user_nicename;
                    this.router.navigateByUrl('/profile');
                }
            );
        // }
    }

    isLoggedIn() {
        return this.authService.isAuthenticated();
    }

    isLoggedOut() {
        return this.authService.isUnauthenticated();
    }

    ngOnInit() {
    }

}
