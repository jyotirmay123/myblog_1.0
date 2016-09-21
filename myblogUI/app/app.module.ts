import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CKEditorModule} from 'ng2-ckeditor';
import { HttpModule, JsonpModule }  from '@angular/http';

import { InMemoryWebApiModule }     from 'angular2-in-memory-web-api';
import { BlogData }                 from './blogData';
import {BlogService} from './app.service';

import { AppComponent } from './app.component';

//import { blogFormModule } from './blogForm.class'

@NgModule({
  imports:      [ BrowserModule, FormsModule, CKEditorModule, HttpModule,
    JsonpModule, 
    InMemoryWebApiModule.forRoot(BlogData)],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
