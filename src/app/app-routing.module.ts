import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsComponent}      from './posts/posts.component';
import {PostDetailComponent} from './post-detail/post-detail.component'
import {LoginComponent}      from './login/login.component';

const routes: Routes = [
    {path: 'posts', component: PostsComponent},
    {path: 'post/:id', component: PostDetailComponent},
    {path: 'login', component: LoginComponent},
];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}

