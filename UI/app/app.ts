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

/**
 * 
 * Importing required modules and libraries
 * 
 */
import {
    Component, NgModule, Injectable, Inject, NgZone, Pipe, PipeTransform,
    ModuleWithProviders, OnInit, Directive, ElementRef, Input, Renderer, EventEmitter,
    Output
} from '@angular/core';
import { PathLocationStrategy, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Http, HttpModule, Request, Response } from '@angular/http';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
//import { ROUTER_DIRECTIVES} from '@angular/router-deprecated'
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
//import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
//import { _ } from 'lodash';



// Other ng-modules
import { CKEditorModule } from 'ng2-ckeditor';

//############################################################################################################//
/**
 * 
 * My Blog CONFIG details
 * 
 */
export class CONFIG {

    // APPLICATION VERSION
    /**
     * Old Version details-->>>
     * 1.0.0 : Initial app
     * 1.0.1 : BackEnd Configured
     * 1.0.2 : Database Configured and linked
     * 1.1.0 : End to End setup with ckeditor configured.First blog saved and updated into DB and shown in UI.
     * 1.2.0 : TKComponent Configured and linked
     * 1.3.0 : nodemailer configured for mailing and notification purpose
     * 
     * 
     */
    protected __version__: any = "1.3.0";

    // Local/Development config
    public _gapiURL: any;
    public _serverUrl: string = "https://warm-hamlet-28520.herokuapp.com";
    protected _fbAPPID: number = 1834265296843281;
    protected _authTOKEN: any;
    public _fbSDKURL: string = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.7&appId=' + this._fbAPPID;
    public static sess: any = [];

    // Production config
    /*
    public _gapiURL: any; 
    public _serverUrl : string = "https://warm-hamlet-28520.herokuapp.com";
    protected _fbAPPID: number = 1834265296843281;
    protected _authTOKEN: any;
    public _fbSDKURL: string = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.7&appId=" + this._fbAPPID;
    public static sess: any = [];
    */

    constructor() {
        CONFIG.sess.isLoggedIn = localStorage.getItem("isLoggedIn") || false;
        CONFIG.sess.username = localStorage.getItem("username") || "Hi Guest";
    }

}

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
@Injectable()
export class MyBlogService {

    // Property to hold root server URL i.e host
    private serverUrl: string;
    private serviceUrl: string = '/blog';

    constructor(private http: Http, protected $c: CONFIG) {
        this.serverUrl = $c._serverUrl;
        //console.log(CONFIG.sess.isLoggedIn);
        //console.log(CONFIG.sess);
    }

    // check function in service to check control is coming to service
    check() {
        console.log("getting clicked from service");
    }

    // get function to get data from server
    // basically blog datas
    get(): Observable<any> {
        return this.http.get(this.serverUrl + this.serviceUrl)
            .map(response => response.json());
    }

    getById(_id): Observable<any> {
        return this.http.get(this.serverUrl + this.serviceUrl + "/" + _id)
            .map(response => response.json());
    }
    // add blog to database server
    add(blog: any): Observable<any> {
        return this.http.post(this.serverUrl + this.serviceUrl, blog)
            .map(response => response.json());
    }

    // Update the content of blog with an ID in the database server
    update(blog: any): Observable<any> {
        return this.http.put(this.serverUrl + this.serviceUrl, blog)
            .map(response => response.json());
    }

    // Delete a blog with an ID from database server
    delete(_id: any): Observable<any> {
        return this.http.delete(this.serverUrl + this.serviceUrl + "/" + _id)
            .map(response => response.json())
    }

    // Delete all blog from database server [PROHIBITED]
    deleteAll(): Observable<any> {
        return this.http.delete(this.serverUrl + this.serviceUrl)
            .map(response => response.json());
    }

    // structure it so that databse will accept this to store i.e. here in our case modify the data to JSON.
    prepareJSON(blog: any, _id: any = "", blogger: string = ""): any {
        let payLoad = { _id: _id, blogcontent: blog, blogger: blogger || "Jyotirmay Senapati" };
        return payLoad;
    }
}

/**
 * 
 * Service to deal with user login/logout and session details
 * 
 */
@Injectable()
export class UserSessionService {

    // Property to hold root server URL i.e host
    private serverUrl: string;
    private serviceUrl: string = "/user";
    private anotherServiceUrl: string = "/login";

    constructor(private http: Http, protected $c: CONFIG) {
        this.serverUrl = $c._serverUrl;
    }

    // Add loggedin user info to database
    addUserInfo(user): Observable<any> {
        return this.http.post(this.serverUrl + this.serviceUrl, user)
            .map(response => response.json());
    }

    // Get User details from databse
    getUserInfo(): Observable<any> {
        return this.http.get(this.serverUrl + this.serviceUrl)
            .map(response => response.json());
    }

    // Save each and every session into database for future data analytics purpose
    addUserSession(session): Observable<any> {
        return this.http.post(this.serverUrl + this.anotherServiceUrl, session)
            .map(response => response.json());
    }
}

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
@Directive({ selector: '[fbCommentLoad]' })
export class FbCommentDirective {

    constructor(el: ElementRef, renderer: Renderer) {
        renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    }

}

//############################################################################################################//
/**
 * 
 * My Components
 * 
 */
/**
 * 
 * Login with Google 
 * 
 */
declare let gapi: any;

@Component({
    selector: "loginWithGoogle",
    styleUrls: ['app/css/login.css'],
    providers: [UserSessionService],
    templateUrl: 'app/template/login.htm'
})
export class AuthApp {

    googleLoginButtonId = "google-login-button";

    userAuthToken: any;
    userDisplayName: string;
    public isLoggedIn: boolean;

    constructor(private _zone: NgZone) {
        //console.log();
        //this.update();
    }

    // Function to update class values to updated config values .
    update() {
        //this.userAuthToken = null;
        this.userDisplayName = CONFIG.sess.username;
        this.isLoggedIn = CONFIG.sess.isLoggedIn;

    }

    ngOnInit() {
        //console.log(CONFIG.sess.isLoggedIn + CONFIG.sess.username);
        this.update();
        //console.log(this.isLoggedIn + this.userDisplayName)
    }

    // Signout from Application and resetting values to default.
    signOut = () => {
        this._zone.run(() => {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function() {
                CONFIG.sess.splice(0, 1);
                CONFIG.sess.isLoggedIn = false;
                localStorage.setItem("isLoggedIn", CONFIG.sess.isLoggedIn);
                CONFIG.sess.username = "Hi Guest";
                localStorage.setItem("username", CONFIG.sess.username);
            });
            setTimeout(() => this.update(), 1000);
        });
    }

    // Angular hook that allows for interaction with elements inserted by the
    // rendering of a view.
    ngAfterViewInit() {
        this.update();
        // Converts the Google login button stub to an actual button.
        gapi.signin2.render(
            this.googleLoginButtonId,
            {
                "onSuccess": this.onGoogleLoginSuccess,
                "scope": "profile",
                "theme": "dark"
            });
    }

    getIsLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    // Triggered after a user successfully logs in using the Google external
    // login provider.
    onGoogleLoginSuccess = (loggedInUser) => {
        this._zone.run(() => {
            //console.log(loggedInUser);
            CONFIG.sess.push(loggedInUser);
            CONFIG.sess.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", CONFIG.sess.isLoggedIn);
            //this.userAuthToken = loggedInUser.getAuthResponse().id_token;
            CONFIG.sess.username = loggedInUser.getBasicProfile().getName();
            localStorage.setItem("username", CONFIG.sess.username);

            //console.log(CONFIG.sess);
        });
        setTimeout(() => this.update(), 2000);
    }
}

/**
 * 
 * Facebook Comments API integration
 * 
 */
declare let FB: any;
@Component({
    selector: 'facebookComment',
    template: `
    <div id="{{fbCommentID}}"> 
      <div class="fb-comments" data-href="https://www.facebook.com/SenapatiJyotirmay/" data-width="900" data-numposts="3">
      </div>
    </div>
  `
})
export class FacebookCommentComponent {

    protected js;
    protected fjs;
    protected childNode;
    public fbCommentID: any;

    constructor( @Inject(DOCUMENT) private document: any, private _zone: NgZone, protected router: Router,
        public r: Renderer, public el: ElementRef, protected $c: CONFIG) {
        if (!CONFIG.sess.isLoggedIn) {
            this.router.navigate(['blog/login']);
        }
        this.fbCommentID = "fbCommentId";
        this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
    }

    // All Component lifecycle hook methods injected by Angular.
    ngOnChanges() { }

    ngOnInit() { }

    ngDoCheck() { }

    ngAfterContentInit() { }

    ngAfterContentChecked() { }

    ngAfterViewInit() { }

    ngAfterViewChecked() { }

    ngOnDestroy() { }

    loadFBCommentAPI = (d, s, id) => {
        this._zone.run(() => {
            this.js, this.fjs = d.getElementsByTagName(s)[0];
            if (typeof FB === 'object') {
                FB.XFBML.parse();
                return;
            }
            this.js = d.createElement(s);
            this.js.id = id;
            this.js.src = this.$c._fbSDKURL;
            this.childNode = this.fjs.parentNode.insertBefore(this.js, this.fjs);
        });
    }

}

/**
 * 
 * TKComponent for internal app data analytics and its usage.
 * 
 */
@Component({
  selector:'tk',
  template:''
})
export class tkComponent {

    constructor(protected $config : CONFIG) {
        this.getTKDetail($config);
    }

    getTKDetail(config) {console.log(config._serverUrl);
        $.getJSON('//gd.geobytes.com/GetCityDetails?callback=?', function(data) {
            $.post(config._serverUrl+'/tk', data, function(data){
              //console.log(data);
            });
        });

    }
}

/**
 * 
 * CKEditor Component
 * 
 */
@Component({
    selector: 'newBlog',
    providers: [MyBlogService],
    styleUrls: ['app/css/blog.css'],
    templateUrl: `app/template/newBlog.htm`
})
export class NewBlogComponent {

    public blogcontent: any;
    public ckeditor: CKEditorModule;
    public isSuccess: Boolean;
    public blog: any;
    public blogId: any = 0;
    private subscription: Subscription;

    constructor(protected myblogservice: MyBlogService, protected router: Router, protected route: ActivatedRoute) {
        if (!CONFIG.sess.isLoggedIn) {
            this.router.navigate(['blog/login']);
        }
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (param: any) => {
                this.blogcontent = param['content'];
                this.blogId = param['id'] || 0;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


    // Add new blogs to database
    addBlog() {
        this.isSuccess = false;
        if (this.blogcontent == undefined) {
            console.log("No Blog Entry. Please add Blog before submitting it");
            return;
        }
        this.blog = this.myblogservice.prepareJSON(this.blogcontent);
        this.myblogservice.add(this.blog).subscribe(data => {
            this.isSuccess = true;
            this.router.navigate(['blog']);
        },
            err => {
                this.isSuccess = false;
            });
    }

    // Add new blogs to database
    updateBlog() {
        this.isSuccess = false;
        this.blog = this.myblogservice.prepareJSON(this.blogcontent, this.blogId);
        this.myblogservice.update(this.blog).subscribe(data => {
            this.isSuccess = true;
            this.router.navigate(['blog']);
        },
            err => {
                this.isSuccess = false;
            });
    }
}

/**
 * 
 * A particular blog to show as a sample. 
 * 
 */
@Component({
    selector: 'SampleBlog',
    providers: [MyBlogService],
    styleUrls: ['app/css/blog.css'],
    templateUrl: `app/template/sampleBlog.htm`
})
export class BlogSampleComponent {
    public blogs = [];
    public _id = 43;

    constructor(protected myblogservice: MyBlogService, protected router: Router) {
        if (!CONFIG.sess.isLoggedIn) {
            this.router.navigate(['blog/login']);
        }
        this.getOne();
    }

    // Get a particular blog with matched ID.
    getOne() {
        this.myblogservice.getById(this._id).subscribe(data => {
            this.blogs = this.blogs.concat(data);
        });
    }
}

/**
 * 
 * BlogListComponent to list out all blogs.
 * 
 */
@Component({
    selector: 'myBlogs',
    providers: [MyBlogService],
    styleUrls: ['app/css/blog.css'],
    templateUrl: `app/template/myBlogs.htm`
})
export class BlogListComponent {

    // Property to hold blog data
    public blogs = [];
    public isSuccess: Boolean;
    public idRange = { minRange: 0, maxRange: 100 };
    public orderColumn = '_id';
    public asc = false;

    constructor(protected myblogservice: MyBlogService, protected router: Router, protected zone: NgZone) {
        if (!CONFIG.sess.isLoggedIn) {
            this.router.navigate(['blog/login']);
        }
        this.get();
    }

    // check function to check control is going to service
    check() {
        this.myblogservice.check();
    }

    changeOrder() {
        this.asc = !this.asc;
    }

    changeSortColumn() {
        this.orderColumn = this.orderColumn == '_id' ? 'createdDate' : '_id';
    }
    // get function calls service get function which return data from server
    get() {
        this.myblogservice.get().subscribe(data => {
            this.blogs = this.blogs.concat(data);
        });
    }

    // Update the blog written by you
    updateBlog(blog) {
        this.isSuccess = false;
        this.router.navigate(['blog/update/', blog._id, blog.blogcontent]);
        this.myblogservice.update(blog).subscribe(data => {
            this.isSuccess = true;
        },
            err => {
                this.isSuccess = false;
            });
    }

    // Delete the blog
    deleteBlog(blog) {
        this.isSuccess = false;
        this.myblogservice.delete(blog._id).subscribe(data => {
            this.isSuccess = true;
            this.blogs.slice(this.blogs.indexOf(blog), 1);
        },
            err => {
                this.isSuccess = false;
            });
    }
}

/**
 * 
 * my-app Components
 * 
 */
@Component({
    selector: 'my-app',
    providers: [MyBlogService, AuthApp],
    styleUrls: ['app/css/app.css'],
    templateUrl: 'app/template/base.htm'
})
export class BlogHomeComponent {

    public loggedIn: String = "false";

    constructor(protected router: Router) {
        if (!CONFIG.sess.isLoggedIn) {
            this.router.navigate(['blog/login']);
        } else {
            this.router.navigate(['blog/new']);
        }
    }
}

/**
 * 
 * Contact Me Details Component
 * 
 */
@Component({
    selector: 'contact',
    styleUrls: ['app/css/contact.css'],
    templateUrl: `app/template/contact.htm`
})
export class ContactMe {

    constructor() { }

}
/**
 * 
 * Blog Not Found Component.
 * For typical 404 error component.
 * 
 */
@Component({
    templateUrl: `app/template/pageNotFound.htm`
})
export class BlogNotFoundComponent {

    constructor() { }

}

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
@Pipe({ name: 'dateFilter' })
export class DateFilterPipe implements PipeTransform {
    transform(blogs, idRange) {

        if (typeof blogs == 'number') {
            return false;
        } else {
            return blogs.filter(blog => { return (blog._id >= idRange.minRange && blog._id <= idRange.maxRange); });
        }
    }
}

/**
 * 
 * Declaring jQuery famous "$"
 * Later defining orderBy pipe to order the content according to 
 * the requirement. 
 * 
 */
declare let $: any;

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {

    transform(array, orderBy, asc = true) {

        if (!orderBy || orderBy.trim() == "") {
            return array;
        }

        let temp = [];

        //ascending
        if (asc) {
            temp = array.sort((item1: any, item2: any) => {
                let a = item1[orderBy];
                let b = item2[orderBy];
                return this.orderByComparator(a, b);
            });
        }
        else {
            //not asc
            temp = array.sort((item1: any, item2: any) => {
                let a = item1[orderBy];
                let b = item2[orderBy];
                return this.orderByComparator(b, a);
            });
        }

        return $.extend(true, [], temp);

    }
    /**
     * 
     * A function used to help orderByPipe to work.
     * Gives result by comparing any two data and arranging them accordingly.
     */
    orderByComparator(a: any, b: any): number {

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b)) return -1;
            if (parseFloat(a) > parseFloat(b)) return 1;
        }

        return 0; //equal each other
    }
}

//############################################################################################################//
/**
 * 
 * My Routes
 * 
 */
const appRoutes: Routes = [
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

const appRoutingProviders: any[] = [];

const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

//############################################################################################################//
/**
 * 
 * NgModule Declaration
 * 
 */
let declarationArr: Array<any> = [
    BlogHomeComponent, AuthApp,
    BlogNotFoundComponent, BlogListComponent, BlogSampleComponent, ContactMe,
    NewBlogComponent, FacebookCommentComponent, FbCommentDirective,tkComponent,
    DateFilterPipe, OrderByPipe
];
@NgModule({
    imports: [BrowserModule, HttpModule, CKEditorModule, FormsModule, routing],
    declarations: declarationArr,
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, appRoutingProviders, CONFIG],
    bootstrap: [BlogHomeComponent]
})
export class app { }

//############################################################################################################//
/**
 * 
 * App engine entry point
 * 
 */
const platform = platformBrowserDynamic();
platform.bootstrapModule(app).catch((err: any) => console.error(err));

