import {NgModule}               from '@angular/core';
import {RouterModule, Routes}   from '@angular/router';
import {HomeComponent}          from '@app/components/home/home.component';
import {PostsComponent}         from '@app/components/posts/posts.component';
import {PostDetailComponent}    from '@app/components/post-detail/post-detail.component'
import {LoginComponent}         from '@app/components/login/login.component';

import {ProfileComponent}       from '@app/components/protected/profile/profile.component';
import {AuthGuardService}       from '@app/auth/auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'posts', component: PostsComponent},
    {path: 'post/:id', component: PostDetailComponent},
    {path: 'login', component: LoginComponent},
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
    },
];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}

