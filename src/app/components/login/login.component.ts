import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {FormGroup, Validators, FormBuilder} from '@angular/forms';

import {AuthService} from '@app/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router) {

        if (AuthService.isAuthenticated()) {
            this.router.navigateByUrl('/profile');
        }

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        const val = this.loginForm.value;

        this.authService.login(val.username, val.password)
            .subscribe(
                () => {
                    this.router.navigateByUrl('/profile');
                },
                () => {
                }
            );
    }

    ngOnInit() {
    }

}
