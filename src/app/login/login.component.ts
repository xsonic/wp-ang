import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {FormGroup, FormControl, Validators, FormBuilder}  from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthService} from '../auth.service';

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

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        const val = this.loginForm.value;

        console.log(val);

        if (val.username && val.password) {
            this.authService.login(val.username, val.password)
                .subscribe(
                    (data) => {
                        this.router.navigateByUrl('/login');
                    }
                );
        }
    }

    isLoggedIn() {
        console.log('is logged in');
        return this.authService.isLoggedIn();
    }

    isLoggedOut() {
        return this.authService.isLoggedOut();
    }

    ngOnInit() {
    }

}
