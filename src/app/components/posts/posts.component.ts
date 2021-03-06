import {Component, OnInit} from '@angular/core';
import {Post} from '@app/classes/posts';
import {PostService} from '@app/services/post.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    posts: Post[];

    constructor(private PostService: PostService) {
    }

    getPosts(): void {
        this.PostService
            .getPosts()
            .subscribe(posts => this.posts = posts);
    }

    ngOnInit() {
        this.getPosts();
    }

}
