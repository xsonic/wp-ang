import {Component, OnInit} from '@angular/core';
import {Post} from '../classes/posts';
import {POSTS} from '../mock-posts';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    posts = POSTS;

    constructor() {
    }

    ngOnInit() {
    }

    selectedPost: Post;

    onSelect(post: Post): void {
        this.selectedPost = post;
        console.log(this)
    }

}
