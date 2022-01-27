import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form = this.formBuilder.group({
    title: this.formBuilder.control(''),
    description: this.formBuilder.control('desc'),
    body: this.formBuilder.control(''),
    tags: this.formBuilder.array([
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS'),
      this.formBuilder.control('JavaScript'),
    ]),
  });

  get tags() {
    return this.form.get('tags') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {}

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
  }
}
