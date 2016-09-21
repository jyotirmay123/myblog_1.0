"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('./rxjs-operators');
var app_service_1 = require('./app.service');
//import { Http } from '@angular/http';
//import {FormsModule} from '@angular/forms';
//import {blogFormModule} from './blogForm.class';
var AppComponent = (function () {
    function AppComponent(blogService) {
        this.blogService = blogService;
        this.mode = 'Promise';
    }
    AppComponent.prototype.ngOnInit = function () { this.getBlog(); };
    AppComponent.prototype.getBlog = function () {
        var _this = this;
        this.blogService.getBlog()
            .then(function (blog) { return _this.blogs = blog; }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent.prototype.addBlog = function (name) {
        var _this = this;
        if (!name) {
            return;
        }
        this.blogService.addBlog(name)
            .then(function (blog) { return _this.blogs.push(blog); }, function (error) { return _this.errorMessage = error; });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/templates/write-blog.html',
            providers: [app_service_1.BlogService]
        } /*,
        {
          selector: 'my-app',
          templateUrl: 'app/templates/blogForm.html'
        }*/), 
        __metadata('design:paramtypes', [app_service_1.BlogService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map