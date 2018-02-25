import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';

import {AppComponent} from './app.component';
import {PostsComponent} from './views/posts/posts.component';
import {PostDetailComponent} from './views/post-detail/post-detail.component';
import {LoginComponent} from './views/login/login.component';
import {ProfileComponent} from './views/protected/profile/profile.component';

import {AppRoutingModule} from './app-routing.module';

import {PostService} from './services/post.service';
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth.interceptor';

import {Globals} from './globals'

// vendor
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';

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
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SnotifyModule,
        TranslateModule.forRoot()
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
        Globals
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
// a