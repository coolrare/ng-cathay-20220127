import { Article } from './../../interfaces/article';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  article?: Article;

  article$?: Observable<Article>;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe(paramMap => {
    //   console.log(paramMap.get('id'));
    //   const id = paramMap.get('id')
    //   this.postService.getArticle(id).subscribe(result => {
    //     console.log(result);
    //     this.article = result.article;
    //   })
    // })

    // this.route.paramMap
    //   .pipe(
    //     map((paramMap) => paramMap.get('id')),
    //     switchMap((id) => this.postService.getArticle(id)),
    //     map(result => result.article)
    //   )
    //   .subscribe((result) => {
    //     // console.log(result);
    //     this.article = result;
    //   });

    this.article$ = this.route.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id')),
        switchMap((id) => this.postService.getArticle(id)),
        map(result => result.article)
      );
  }
}
