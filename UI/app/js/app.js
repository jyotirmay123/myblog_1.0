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
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var forms_1 = require('@angular/forms');
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
    // Production config
    /*
    public _gapiURL: any;
    public _serverUrl : string = "https://warm-hamlet-28520.herokuapp.com";
    protected _fbAPPID: number = 1834265296843281;
    protected _authTOKEN: any;
    public _fbSDKURL: string = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.7&appId=" + this._fbAPPID;
    public static sess: any = [];
    */
    function CONFIG() {
        // APPLICATION VERSION
        this.__version__ = "1.0.0";
        this._serverUrl = "http://127.0.0.1:3000";
        this._fbAPPID = 1834265296843281;
        this._fbSDKURL = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.7&appId=" + this._fbAPPID;
        CONFIG.sess.isLoggedIn = localStorage.getItem("isLoggedIn") || false;
        CONFIG.sess.username = localStorage.getItem("username") || "Hi Guest";
    }
    CONFIG.sess = [];
    return CONFIG;
}());
exports.CONFIG = CONFIG;
//############################################################################################################//
/**
 *
 * My Sevices
 *
 */
/**
 *
 * blogService to deal with CRUD operations related to blog
 *
 */
var MyBlogService = (function () {
    function MyBlogService(http, $c) {
        this.http = http;
        this.$c = $c;
        this.serviceUrl = '/blog';
        this.serverUrl = $c._serverUrl;
        console.log(CONFIG.sess.isLoggedIn);
        console.log(CONFIG.sess);
    }
    // check function in service to check control is coming to service
    MyBlogService.prototype.check = function () {
        console.log("getting clicked from service");
    };
    // get function to get data from server
    // basically blog datas
    MyBlogService.prototype.get = function () {
        return this.http.get(this.serverUrl + this.serviceUrl)
            .map(function (response) { return response.json(); });
    };
    MyBlogService.prototype.getById = function (_id) {
        return this.http.get(this.serverUrl + this.serviceUrl + "/" + _id)
            .map(function (response) { return response.json(); });
    };
    // add blog to database server
    MyBlogService.prototype.add = function (blog) {
        return this.http.post(this.serverUrl + this.serviceUrl, blog)
            .map(function (response) { return response.json(); });
    };
    // Update the content of blog with an ID in the database server
    MyBlogService.prototype.update = function (blog) {
        return this.http.put(this.serverUrl + this.serviceUrl, blog)
            .map(function (response) { return response.json(); });
    };
    // Delete a blog with an ID from database server
    MyBlogService.prototype.delete = function (_id) {
        return this.http.delete(this.serverUrl + this.serviceUrl + "/" + _id)
            .map(function (response) { return response.json(); });
    };
    // Delete all blog from database server [PROHIBITED]
    MyBlogService.prototype.deleteAll = function () {
        return this.http.delete(this.serverUrl + this.serviceUrl)
            .map(function (response) { return response.json(); });
    };
    // structure it so that databse will accept this to store i.e. here in our case modify the data to JSON.
    MyBlogService.prototype.prepareJSON = function (blog, _id, blogger) {
        if (_id === void 0) { _id = ""; }
        if (blogger === void 0) { blogger = ""; }
        var payLoad = { _id: _id, blogcontent: blog, blogger: blogger || "Jyotirmay Senapati" };
        return payLoad;
    };
    MyBlogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, CONFIG])
    ], MyBlogService);
    return MyBlogService;
}());
exports.MyBlogService = MyBlogService;
/**
 *
 * Service to deal with user login/logout and session details
 *
 */
var UserSessionService = (function () {
    function UserSessionService(http, $c) {
        this.http = http;
        this.$c = $c;
        this.serviceUrl = "/user";
        this.anotherServiceUrl = "/login";
        this.serverUrl = $c._serverUrl;
    }
    // Add loggedin user info to database
    UserSessionService.prototype.addUserInfo = function (user) {
        return this.http.post(this.serverUrl + this.serviceUrl, user)
            .map(function (response) { return response.json(); });
    };
    // Get User details from databse
    UserSessionService.prototype.getUserInfo = function () {
        return this.http.get(this.serverUrl + this.serviceUrl)
            .map(function (response) { return response.json(); });
    };
    // Save each and every session into database for future data analytics purpose
    UserSessionService.prototype.addUserSession = function (session) {
        return this.http.post(this.serverUrl + this.anotherServiceUrl, session)
            .map(function (response) { return response.json(); });
    };
    UserSessionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, CONFIG])
    ], UserSessionService);
    return UserSessionService;
}());
exports.UserSessionService = UserSessionService;
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
                    CONFIG.sess.splice(0, 1);
                    CONFIG.sess.isLoggedIn = false;
                    localStorage.setItem("isLoggedIn", CONFIG.sess.isLoggedIn);
                    CONFIG.sess.username = "Hi Guest";
                    localStorage.setItem("username", CONFIG.sess.username);
                });
                setTimeout(function () { return _this.update(); }, 1000);
            });
        };
        // Triggered after a user successfully logs in using the Google external
        // login provider.
        this.onGoogleLoginSuccess = function (loggedInUser) {
            _this._zone.run(function () {
                console.log(loggedInUser);
                CONFIG.sess.push(loggedInUser);
                CONFIG.sess.isLoggedIn = true;
                localStorage.setItem("isLoggedIn", CONFIG.sess.isLoggedIn);
                //this.userAuthToken = loggedInUser.getAuthResponse().id_token;
                CONFIG.sess.username = loggedInUser.getBasicProfile().getName();
                localStorage.setItem("username", CONFIG.sess.username);
                console.log(CONFIG.sess);
            });
            setTimeout(function () { return _this.update(); }, 2000);
        };
        //console.log();
        //this.update();
    }
    // Function to update class values to updated config values .
    AuthApp.prototype.update = function () {
        //this.userAuthToken = null;
        this.userDisplayName = CONFIG.sess.username;
        this.isLoggedIn = CONFIG.sess.isLoggedIn;
    };
    AuthApp.prototype.ngOnInit = function () {
        console.log(CONFIG.sess.isLoggedIn + CONFIG.sess.username);
        this.update();
        console.log(this.isLoggedIn + this.userDisplayName);
    };
    // Angular hook that allows for interaction with elements inserted by the
    // rendering of a view.
    AuthApp.prototype.ngAfterViewInit = function () {
        this.update();
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
            providers: [UserSessionService],
            templateUrl: 'app/template/login.htm'
        }), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], AuthApp);
    return AuthApp;
}());
exports.AuthApp = AuthApp;
var FacebookCommentComponent = (function () {
    function FacebookCommentComponent(document, _zone, router, r, el, $c) {
        var _this = this;
        this.document = document;
        this._zone = _zone;
        this.router = router;
        this.r = r;
        this.el = el;
        this.$c = $c;
        this.loadFBCommentAPI = function (d, s, id) {
            _this._zone.run(function () {
                _this.js, _this.fjs = d.getElementsByTagName(s)[0];
                if (typeof FB === 'object') {
                    FB.XFBML.parse();
                    return;
                }
                _this.js = d.createElement(s);
                _this.js.id = id;
                _this.js.src = _this.$c._fbSDKURL;
                _this.childNode = _this.fjs.parentNode.insertBefore(_this.js, _this.fjs);
            });
        };
        if (!CONFIG.sess.isLoggedIn) {
            this.router.navigate(['blog/login']);
        }
        this.fbCommentID = "fbCommentId";
        this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
    }
    // All Component lifecycle hook methods injected by Angular.
    FacebookCommentComponent.prototype.ngOnChanges = function () { };
    FacebookCommentComponent.prototype.ngOnInit = function () { };
    FacebookCommentComponent.prototype.ngDoCheck = function () { };
    FacebookCommentComponent.prototype.ngAfterContentInit = function () { };
    FacebookCommentComponent.prototype.ngAfterContentChecked = function () { };
    FacebookCommentComponent.prototype.ngAfterViewInit = function () { };
    FacebookCommentComponent.prototype.ngAfterViewChecked = function () { };
    FacebookCommentComponent.prototype.ngOnDestroy = function () { };
    FacebookCommentComponent = __decorate([
        core_1.Component({
            selector: 'facebookComment',
            template: "\n    <div id=\"{{fbCommentID}}\"> \n      <div class=\"fb-comments\" data-href=\"https://www.facebook.com/SenapatiJyotirmay/\" data-width=\"900\" data-numposts=\"3\">\n      </div>\n    </div>\n  "
        }),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [Object, core_1.NgZone, router_1.Router, core_1.Renderer, core_1.ElementRef, CONFIG])
    ], FacebookCommentComponent);
    return FacebookCommentComponent;
}());
exports.FacebookCommentComponent = FacebookCommentComponent;
/**
 *
 * CKEditor Component
 *
 */
var NewBlogComponent = (function () {
    function NewBlogComponent(myblogservice, router, route) {
        this.myblogservice = myblogservice;
        this.router = router;
        this.route = route;
        this.blogId = 0;
        if (!CONFIG.sess.isLoggedIn) {
            this.router.navigate(['blog/login']);
        }
    }
    NewBlogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (param) {
            _this.blogcontent = param['content'];
            _this.blogId = param['id'] || 0;
        });
    };
    NewBlogComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    // Add new blogs to database
    NewBlogComponent.prototype.addBlog = function () {
        var _this = this;
        this.isSuccess = false;
        if (this.blogcontent == undefined) {
            console.log("No Blog Entry. Please add Blog before submitting it");
            return;
        }
        this.blog = this.myblogservice.prepareJSON(this.blogcontent);
        this.myblogservice.add(this.blog).subscribe(function (data) {
            _this.isSuccess = true;
            _this.router.navigate(['blog']);
        }, function (err) {
            _this.isSuccess = false;
        });
    };
    // Add new blogs to database
    NewBlogComponent.prototype.updateBlog = function () {
        var _this = this;
        this.isSuccess = false;
        this.blog = this.myblogservice.prepareJSON(this.blogcontent, this.blogId);
        this.myblogservice.update(this.blog).subscribe(function (data) {
            _this.isSuccess = true;
            _this.router.navigate(['blog']);
        }, function (err) {
            _this.isSuccess = false;
        });
    };
    NewBlogComponent = __decorate([
        core_1.Component({
            selector: 'newBlog',
            providers: [MyBlogService],
            styleUrls: ['app/css/blog.css'],
            templateUrl: "app/template/newBlog.htm"
        }), 
        __metadata('design:paramtypes', [MyBlogService, router_1.Router, router_1.ActivatedRoute])
    ], NewBlogComponent);
    return NewBlogComponent;
}());
exports.NewBlogComponent = NewBlogComponent;
/**
 *
 * A particular blog to show as a sample.
 *
 */
var BlogSampleComponent = (function () {
    function BlogSampleComponent(myblogservice, router) {
        this.myblogservice = myblogservice;
        this.router = router;
        this.blogs = [];
        this._id = 40;
        if (!CONFIG.sess.isLoggedIn) {
            this.router.navigate(['blog/login']);
        }
        this.getOne();
    }
    // Get a particular blog with matched ID.
    BlogSampleComponent.prototype.getOne = function () {
        var _this = this;
        this.myblogservice.getById(this._id).subscribe(function (data) {
            _this.blogs = _this.blogs.concat(data);
        });
    };
    BlogSampleComponent = __decorate([
        core_1.Component({
            selector: 'SampleBlog',
            providers: [MyBlogService],
            styleUrls: ['app/css/blog.css'],
            templateUrl: "app/template/sampleBlog.htm"
        }), 
        __metadata('design:paramtypes', [MyBlogService, router_1.Router])
    ], BlogSampleComponent);
    return BlogSampleComponent;
}());
exports.BlogSampleComponent = BlogSampleComponent;
/**
 *
 * BlogListComponent to list out all blogs.
 *
 */
var BlogListComponent = (function () {
    function BlogListComponent(myblogservice, router, zone) {
        this.myblogservice = myblogservice;
        this.router = router;
        this.zone = zone;
        // Property to hold blog data
        this.blogs = [];
        this.idRange = { minRange: 0, maxRange: 100 };
        if (!CONFIG.sess.isLoggedIn) {
            this.router.navigate(['blog/login']);
        }
        this.get();
    }
    // check function to check control is going to service
    BlogListComponent.prototype.check = function () {
        this.myblogservice.check();
    };
    // get function calls service get function which return data from server
    BlogListComponent.prototype.get = function () {
        var _this = this;
        this.myblogservice.get().subscribe(function (data) {
            _this.blogs = _this.blogs.concat(data);
        });
    };
    // Update the blog written by you
    BlogListComponent.prototype.updateBlog = function (blog) {
        var _this = this;
        this.isSuccess = false;
        this.router.navigate(['blog/update/', blog._id, blog.blogcontent]);
        this.myblogservice.update(blog).subscribe(function (data) {
            _this.isSuccess = true;
        }, function (err) {
            _this.isSuccess = false;
        });
    };
    // Delete the blog
    BlogListComponent.prototype.deleteBlog = function (blog) {
        var _this = this;
        this.isSuccess = false;
        this.myblogservice.delete(blog._id).subscribe(function (data) {
            _this.isSuccess = true;
            _this.blogs.slice(_this.blogs.indexOf(blog), 1);
        }, function (err) {
            _this.isSuccess = false;
        });
    };
    BlogListComponent = __decorate([
        core_1.Component({
            selector: 'myBlogs',
            providers: [MyBlogService],
            styleUrls: ['app/css/blog.css'],
            templateUrl: "app/template/myBlogs.htm"
        }), 
        __metadata('design:paramtypes', [MyBlogService, router_1.Router, core_1.NgZone])
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
        this.loggedIn = "false";
        if (!CONFIG.sess.isLoggedIn) {
            this.router.navigate(['blog/login']);
        }
        else {
            this.router.navigate(['blog/new']);
        }
    }
    BlogHomeComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [MyBlogService, AuthApp],
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
 * Contact Me Details Component
 *
 */
var ContactMe = (function () {
    function ContactMe() {
    }
    ContactMe = __decorate([
        core_1.Component({
            selector: 'contact',
            styleUrls: ['app/css/contact.css'],
            templateUrl: "app/template/contact.htm"
        }), 
        __metadata('design:paramtypes', [])
    ], ContactMe);
    return ContactMe;
}());
exports.ContactMe = ContactMe;
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
 * My Custom Filters
 *
 */
/**
 *
 * custom Date filter to select between or for a particular date blog data
 *
 */
var DateFilterPipe = (function () {
    function DateFilterPipe() {
    }
    DateFilterPipe.prototype.transform = function (blogs, idRange) {
        if (typeof blogs == 'number') {
            return false;
        }
        else {
            return blogs.filter(function (blog) { return (blog._id >= idRange.minRange && blog._id <= idRange.maxRange); });
        }
    };
    DateFilterPipe = __decorate([
        core_1.Pipe({ name: 'dateFilter' }), 
        __metadata('design:paramtypes', [])
    ], DateFilterPipe);
    return DateFilterPipe;
}());
exports.DateFilterPipe = DateFilterPipe;
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
    {
        path: 'blog/update/:id/:content',
        component: NewBlogComponent
    },
    { path: 'blog/login', component: AuthApp },
    { path: 'blog/sample', component: BlogSampleComponent },
    { path: 'blog/contact', component: ContactMe },
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
    BlogHomeComponent, AuthApp,
    BlogNotFoundComponent, BlogListComponent, BlogSampleComponent, ContactMe,
    NewBlogComponent, FacebookCommentComponent, FbCommentDirective,
    DateFilterPipe
];
var app = (function () {
    function app() {
    }
    app = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, ng2_ckeditor_1.CKEditorModule, forms_1.FormsModule, routing],
            declarations: declarationArr,
            providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, appRoutingProviders, CONFIG],
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
platform.bootstrapModule(app).catch(function (err) { return console.error(err); });
//# sourceMappingURL=app.js.map