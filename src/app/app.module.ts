import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';

import {AppComponent} from '@app/app.component';
import {HomeComponent} from '@app/components/home/home.component';
import {PostsComponent} from '@app/components/posts/posts.component';
import {PostDetailComponent} from '@app/components/post-detail/post-detail.component';
import {LoginComponent} from '@app/components/login/login.component';
import {ProfileComponent} from '@app/components/protected/profile/profile.component';
import {NavbarComponent} from '@app/components/_partials/navbar/navbar.component';

import {AppRoutingModule} from '@app/app-routing.module';

import {PostService} from '@app/services/post.service';
import {AuthService} from '@app/auth/auth.service';
import {AuthGuardService} from '@app/auth/auth-guard.service';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '@app/auth/auth.interceptor';

// vendor
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
    // exports: [,
    //     TranslateModule
    // ],
    declarations: [
        AppComponent,
        PostsComponent,
        PostDetailComponent,
        LoginComponent,
        ProfileComponent,
        NavbarComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SnotifyModule,
        TranslateModule.forRoot(),
        BsDropdownModule.forRoot()
    ],
    providers: [
        PostService,
        AuthService,
        AuthGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: function (router: Router) {
                return new AuthInterceptor(router);
            },
            multi: true,
            deps: [Router]
        },
        {
            provide: 'SnotifyToastConfig',
            useValue: ToastDefaults
        },
        SnotifyService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}