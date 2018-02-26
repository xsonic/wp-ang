import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Post} from '@app/classes/posts';

@Injectable()
export class PostService {

    private baseUrl = 'http://dev.form-fabrik.de/wordpress/wp-json/wp/v2';
    private postsUrl = this.baseUrl + '/posts';

    constructor(private http: HttpClient) {
    }

    //  http://dev.form-fabrik.de/word press/wp-json/wp/v2/posts
    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postsUrl);
        // this.messageService.add('HeroService: fetched heroes');
        // return of(POSTS);
    }

    getPost(id: number): Observable<Post> {
        return this.http.get<Post>(this.postsUrl + '/' + id);
        // this.messageService.add(`HeroService: fetched hero id=${id}`);
        // return of(POSTS.find(post => post.id === id));
    }

}
