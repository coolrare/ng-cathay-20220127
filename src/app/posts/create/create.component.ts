import { Router } from '@angular/router';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form = this.formBuilder.group({
    title: this.formBuilder.control('', Validators.required),
    description: this.formBuilder.control('desc'),
    body: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    tagList: this.formBuilder.array([
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS'),
      this.formBuilder.control('JavaScript'),
    ]),
  });

  get tags() {
    return this.form.get('tagList') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addTag(tag: string) {
    console.log(tag);
    this.tags.push(this.formBuilder.control(tag));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  createPost() {
    console.log(this.form.value);
    this.postService.createArticle(this.form.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: () => {
        alert('新增失敗');
      },
    });
  }
}
