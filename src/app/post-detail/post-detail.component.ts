import {Component, OnInit, Input} from '@angular/core';

import {Post} from '../classes/posts';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
    @Input() post: Post;

    constructor() {
    }

    ngOnInit() {
    }

}
