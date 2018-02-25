import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsComponent}      from './views/posts/posts.component';
import {PostDetailComponent} from './views/post-detail/post-detail.component'
import {LoginComponent}      from './views/login/login.component';

import {ProfileComponent}      from './views/protected/profile/profile.component';
import {AuthGuardService}      from './auth/auth-guard.service';

const routes: Routes = [
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

