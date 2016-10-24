/**
 *
 * @Author: Jyotirmay
 * @Date: 28th September, 2016
 *
 * My Blog Engine Application built on MEAN 2.0
 * Full one page code for one page application. :D
 *
 *
 */
//############################################################################################################//
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 *
 * Importing required modules and libraries
 *
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var forms_1 = require('@angular/forms');
//import { NgIf, NgFor } from '@angular/common';
//import 'rxjs/Rx';
require('rxjs/add/operator/map');
// Other ng-modules
var ng2_ckeditor_1 = require('ng2-ckeditor');
//############################################################################################################//
/**
 *
 * My Blog CONFIG details
 *
 */
var CONFIG = (function () {
    function CONFIG() {
    }
    return CONFIG;
}());
exports.CONFIG = CONFIG;
//############################################################################################################//
/**
 *
 * My Sevices
 *
 */
var myBlogService = (function () {
    function myBlogService(http) {
        this.http = http;
        // Property to hold root server URL i.e host
        //private serverUrl:string = "http://myblog-jms.c9users.io:8080"
        this.serverUrl = "http://127.0.0.1:3000";
    }
    // check function in service to check control is coming to service
    myBlogService.prototype.check = function () {
        alert("getting clicked from service");
    };
    // get function to get data from server
    // basically blog datas
    myBlogService.prototype.get = function () {
        return this.http.get(this.serverUrl + "/blog")
            .map(function (response) { return response.json(); });
    };
    myBlogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], myBlogService);
    return myBlogService;
}());
exports.myBlogService = myBlogService;
//############################################################################################################//
/**
 *
 * My Directives
 *
 */
/**
 *
 * Custom directive to load FB Comment API
 *
 */
var FbCommentDirective = (function () {
    function FbCommentDirective(el, renderer) {
        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    }
    FbCommentDirective = __decorate([
        core_1.Directive({ selector: '[fbCommentLoad]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], FbCommentDirective);
    return FbCommentDirective;
}());
exports.FbCommentDirective = FbCommentDirective;
var AuthApp = (function () {
    function AuthApp(_zone) {
        var _this = this;
        this._zone = _zone;
        this.googleLoginButtonId = "google-login-button";
        // Signout from Application and resetting values to default.
        this.signOut = function () {
            _this._zone.run(function () {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                });
                _this.default();
            });
        };
        // Triggered after a user successfully logs in using the Google external
        // login provider.
        this.onGoogleLoginSuccess = function (loggedInUser) {
            _this._zone.run(function () {
                if (!_this.isLoggedIn) {
                    _this.userAuthToken = loggedInUser.getAuthResponse().id_token;
                    _this.userDisplayName = loggedInUser.getBasicProfile().getName();
                    _this.isLoggedIn = true;
                    localStorage.setItem('sess', 'true');
                }
                else {
                    _this.signOut();
                    _this.isLoggedIn = false;
                    localStorage.setItem('sess', 'false');
                }
            });
        };
        this.default();
    }
    // Function to reset class values to default.
    AuthApp.prototype.default = function () {
        this.userAuthToken = null;
        this.userDisplayName = "empty";
        this.isLoggedIn = false;
        localStorage.setItem('sess', 'false');
    };
    // Angular hook that allows for interaction with elements inserted by the
    // rendering of a view.
    AuthApp.prototype.ngAfterViewInit = function () {
        // Converts the Google login button stub to an actual button.
        gapi.signin2.render(this.googleLoginButtonId, {
            "onSuccess": this.onGoogleLoginSuccess,
            "scope": "profile",
            "theme": "dark"
        });
    };
    AuthApp.prototype.getIsLoggedIn = function () {
        return this.isLoggedIn;
    };
    AuthApp = __decorate([
        core_1.Component({
            selector: "loginWithGoogle",
            styleUrls: ['app/css/login.css'],
            templateUrl: 'app/template/login.htm'
        }), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], AuthApp);
    return AuthApp;
}());
exports.AuthApp = AuthApp;
/**
 *
 * CKEditor Component
 *
 */
var ckeditorClass = (function () {
    function ckeditorClass() {
        this.blogContent = "<p>Hello</p>";
    }
    ckeditorClass.prototype.blogSubmit = function () {
        alert("getting clicked. Backend not configured");
    };
    ckeditorClass = __decorate([
        core_1.Component({
            selector: 'ckeditorForm',
            styleUrls: ['app/css/blog.css'],
            templateUrl: "app/template/blog.htm"
        }), 
        __metadata('design:paramtypes', [])
    ], ckeditorClass);
    return ckeditorClass;
}());
exports.ckeditorClass = ckeditorClass;
/**
 *
 * Google Comments API integration
 *
 */
var GoogleCommentComponent /*implements OnInit */ = (function () {
    function GoogleCommentComponent /*implements OnInit */() {
        // Dynamic id available for two way binding and google comment API.
        this.commentId = "comments";
        this.embedComment();
    }
    /*ngOnInit(){}*/
    GoogleCommentComponent /*implements OnInit */.prototype.embedComment = function () {
        console.log(this.commentId);
        gapi.comments.render(this.commentId, {
            href: window.location,
            width: '624',
            first_party_property: 'BLOGGER',
            view_type: 'FILTERED_POSTMOD'
        });
    };
    GoogleCommentComponent /*implements OnInit */ = __decorate([
        core_1.Component({
            selector: 'googleComment',
            template: "\n    <div class=\"g-commentcount\" data-href=\"blog/\"></div>\n    <div id=\"{{commentId}}\"></div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], GoogleCommentComponent /*implements OnInit */);
    return GoogleCommentComponent /*implements OnInit */;
}());
exports.GoogleCommentComponent /*implements OnInit */ = GoogleCommentComponent /*implements OnInit */;
var FacebookCommentComponent = (function () {
    function FacebookCommentComponent(document, _zone, router, r, el) {
        var _this = this;
        this.document = document;
        this._zone = _zone;
        this.router = router;
        this.r = r;
        this.el = el;
        this.loadFBCommentAPI = function (d, s, id) {
            // Testing router redirect
            //this.router.navigate(['/blog/new']);
            _this._zone.run(function () {
                _this.js, _this.fjs = d.getElementsByTagName(s)[0];
                if (typeof FB === 'object') {
                    console.log("coming");
                    FB.XFBML.parse();
                    return;
                }
                _this.js = d.createElement(s);
                _this.js.id = id;
                _this.js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.7&appId=1834265296843281";
                _this.childNode = _this.fjs.parentNode.insertBefore(_this.js, _this.fjs);
            });
        };
        this.fbCommentID = "fbCommentId";
        this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
        //r.selectRootElement(this.el);
        //console.log(this.el.nativeElement);
        //console.log(FB);
    }
    // All Component lifecycle hook methods injected by Angular.
    FacebookCommentComponent.prototype.ngOnChanges = function () {
        //FB.XFBML.parse(document.getElementsByTagName("facebookcomment"));
        //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
    };
    FacebookCommentComponent.prototype.ngOnInit = function () {
        //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
    };
    FacebookCommentComponent.prototype.ngDoCheck = function () {
        //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
    };
    FacebookCommentComponent.prototype.ngAfterContentInit = function () {
        //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
    };
    FacebookCommentComponent.prototype.ngAfterContentChecked = function () {
        //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
    };
    FacebookCommentComponent.prototype.ngAfterViewInit = function () {
        //console.log("coming")
        //FB.XFBML.parse(this.document.getElementsByTagName("facebookcomment"));
        //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
    };
    FacebookCommentComponent.prototype.ngAfterViewChecked = function () {
        //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
    };
    FacebookCommentComponent.prototype.ngOnDestroy = function () {
        //console.log(`onDestroy`); 
    };
    FacebookCommentComponent = __decorate([
        core_1.Component({
            selector: 'facebookComment',
            template: "\n    <div id=\"{{fbCommentID}}\"> \n      <div class=\"fb-comments\" data-href=\"https://www.facebook.com/SenapatiJyotirmay/\" data-width=\"900\" data-numposts=\"3\">\n      </div>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [Object, core_1.NgZone, router_1.Router, core_1.Renderer, core_1.ElementRef])
    ], FacebookCommentComponent);
    return FacebookCommentComponent;
}());
exports.FacebookCommentComponent = FacebookCommentComponent;
/**
 *
 * Ckeditor component
 *
 */
var NewBlogComponent = (function () {
    function NewBlogComponent(ckeditorclass, router) {
        this.ckeditorclass = ckeditorclass;
        this.router = router;
        // Property to hold blog content.
        this.blogContent = 'Start Blogging';
        if (!localStorage.getItem('sess')) {
            this.router.navigate(['/blog/Login']);
        }
    }
    NewBlogComponent = __decorate([
        core_1.Component({
            providers: [myBlogService, ckeditorClass /*,AuthApp*/],
            template: "\n    <ckeditorForm></ckeditorForm>\n  "
        }), 
        __metadata('design:paramtypes', [ckeditorClass, router_1.Router])
    ], NewBlogComponent);
    return NewBlogComponent;
}());
exports.NewBlogComponent = NewBlogComponent;
/**
 *
 * It is one of router component which consume Google plus comment
 * box component.
 * This component maps comment api to the application.
 *
 */
var BlogComponent = (function () {
    function BlogComponent(gcomment, fcomment) {
        this.gcomment = gcomment;
        this.fcomment = fcomment;
    }
    BlogComponent = __decorate([
        core_1.Component({
            providers: [GoogleCommentComponent, FacebookCommentComponent],
            template: "\n    <!--googleComment></googleComment-->\n    <facebookComment></facebookComment>\n  "
        }), 
        __metadata('design:paramtypes', [GoogleCommentComponent, FacebookCommentComponent])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
/**
 *
 * BlogListComponent to list out all blogs.
 *
 */
var BlogListComponent = (function () {
    function BlogListComponent(myblogservice, router) {
        this.myblogservice = myblogservice;
        this.router = router;
        // Property to hold blog data
        this.getResponse = [{ "blogger": "coming soon", "age": "" }, { "blogger": "hello" }];
        if (!localStorage.getItem('sess')) {
            this.router.navigate(['/blog/Login']);
        }
    }
    // check function to check control is going to service
    BlogListComponent.prototype.check = function () {
        this.myblogservice.check();
    };
    // get function calls service get function which return data from server
    BlogListComponent.prototype.get = function () {
        var _this = this;
        this.myblogservice.get().subscribe(function (data) {
            _this.getResponse = _this.getResponse.concat(data);
        });
    };
    BlogListComponent = __decorate([
        core_1.Component({
            providers: [myBlogService /*,AuthApp*/],
            styleUrls: ['app/css/app.css'],
            template: "\n    <h1 (click)= check()>My First Angular 2 App</h1>\n    <button (click)=get()>Get My Name</button>\n    <h1 *ngFor= \"let res of getResponse\">{{res.blogger}}</h1>\n  "
        }), 
        __metadata('design:paramtypes', [myBlogService, router_1.Router])
    ], BlogListComponent);
    return BlogListComponent;
}());
exports.BlogListComponent = BlogListComponent;
/**
 *
 * my-app Components
 *
 */
var BlogHomeComponent = (function () {
    function BlogHomeComponent(router) {
        this.router = router;
        //commentId : string = "comments";
        this.loggedIn = "false";
        if (!localStorage.getItem('sess')) {
            this.router.navigate(['/blog/Login']);
        }
        this.loggedIn = localStorage.getItem('sess');
        console.log("coming here");
        console.log(localStorage.getItem("sess"));
        this.router.navigate(['/blog/new']);
        //this.embedComment();
    }
    BlogHomeComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [myBlogService, ckeditorClass, AuthApp],
            styleUrls: ['app/css/app.css'],
            templateUrl: 'app/template/base.htm'
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], BlogHomeComponent);
    return BlogHomeComponent;
}());
exports.BlogHomeComponent = BlogHomeComponent;
/**
 *
 * Blog Not Found Component.
 * For typical 404 error component.
 *
 */
var BlogNotFoundComponent = (function () {
    function BlogNotFoundComponent() {
    }
    BlogNotFoundComponent = __decorate([
        core_1.Component({
            templateUrl: "app/template/pageNotFound.htm"
        }), 
        __metadata('design:paramtypes', [])
    ], BlogNotFoundComponent);
    return BlogNotFoundComponent;
}());
exports.BlogNotFoundComponent = BlogNotFoundComponent;
//############################################################################################################//
/**
 *
 * My Routes
 *
 */
var appRoutes = [
    { path: 'blog', component: BlogListComponent },
    {
        path: 'blog/new',
        component: NewBlogComponent,
        data: {
            title: 'New Blog'
        }
    },
    { path: 'blog/Login', component: AuthApp },
    { path: '', component: BlogHomeComponent },
    { path: '**', component: BlogNotFoundComponent }
];
var appRoutingProviders = [];
var routing = router_1.RouterModule.forRoot(appRoutes);
//############################################################################################################//
/**
 *
 * NgModule Declaration
 *
 */
var declarationArr = [
    BlogHomeComponent, ckeditorClass, AuthApp,
    BlogNotFoundComponent, BlogComponent, BlogListComponent,
    NewBlogComponent, GoogleCommentComponent, FacebookCommentComponent, FbCommentDirective
];
var app = (function () {
    function app() {
    }
    app = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, ng2_ckeditor_1.CKEditorModule, forms_1.FormsModule, routing],
            declarations: declarationArr,
            providers: [appRoutingProviders],
            bootstrap: [BlogHomeComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], app);
    return app;
}());
exports.app = app;
//############################################################################################################//
/**
 *
 * App engine entry point
 *
 */
var platform = platform_browser_dynamic_1.platformBrowserDynamic();
platform.bootstrapModule(app);
//# sourceMappingURL=app.js.map