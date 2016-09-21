import { Component, OnInit } from '@angular/core';
import './rxjs-operators';
import { BlogData } from './BlogData';
import { BlogService } from './app.service'
//import { Http } from '@angular/http';
//import {FormsModule} from '@angular/forms';
//import {blogFormModule} from './blogForm.class';
@Component({
  selector: 'my-app', 
  templateUrl: 'app/templates/write-blog.html',
   providers: [ BlogService ]

  /*template: `
    <ckeditor [(ngModel)]="content" debounce="500">
      <p>Hello <strong>world</strong></p>
    </ckeditor>
    <div [innerHTML]="content"></div>`*/
}/*,
{
  selector: 'my-app',
  templateUrl: 'app/templates/blogForm.html'
}*/)


export class AppComponent implements OnInit { 
  errorMessage: string;
  blogs: BlogData[];
  mode = 'Promise';

  constructor (private blogService: BlogService) {}

  ngOnInit() { this.getBlog(); }

  getBlog() {
    this.blogService.getBlog()
                     .then(
                       blog => this.blogs = blog,
                       error =>  this.errorMessage = <any>error);
  }

  addBlog (name: string) {
    if (!name) { return; }
    this.blogService.addBlog(name)
                     .then(
                       blog  => this.blogs.push(blog),
                       error =>  this.errorMessage = <any>error);
  }
}


