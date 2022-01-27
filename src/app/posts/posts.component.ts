import { Article } from './../interfaces/article';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  articles: Article[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getArticles().subscribe(result => {
      console.log(result);
      this.articles = result.articles;
    })
  }

}
