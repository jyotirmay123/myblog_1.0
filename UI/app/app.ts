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
  Component, NgModule, Injectable, Inject, NgZone,
  ModuleWithProviders, OnInit, Directive, ElementRef, Input, Renderer
} from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { Http, HttpModule, Request, Response } from '@angular/http';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Observable, Subscription } from 'rxjs';

// Other ng-modules
import { CKEditorModule } from 'ng2-ckeditor';

//############################################################################################################//
/**
 * 
 * My Blog CONFIG details
 * 
 */
export class CONFIG {

  private __version__: any;
  protected _gapiURL: any;
  protected _fbAPPID: any;
  protected _authTOKEN: any;
  protected _fbCOMMENTURI: any;
  constructor() { }

}

//############################################################################################################//
/**
 * 
 * My Sevices
 * 
 */
@Injectable()
export class myBlogService {

  // Property to hold root server URL i.e host
  //private serverUrl:string = "http://myblog-jms.c9users.io:8080"
  private serverUrl: string = "http://127.0.0.1:3000"

  constructor(private http: Http) { }

  // check function in service to check control is coming to service
  check() {
    console.log("getting clicked from service");
  }

  // get function to get data from server
  // basically blog datas
  get(): Observable<any> {
    return this.http.get(this.serverUrl + "/blog")
      .map(response => response.json());
  }

  // add blog to database server
  add(blog: any) {
    return this.http.post(this.serverUrl + "/blog", blog)
      .map(response => response.json());
  }

  // Update the content of blog with an ID in the database server
  update(blog: any) {
    return this.http.put(this.serverUrl + "/blog", blog)
      .map(response => response.json());
  }

  // Delete a blog with an ID from database server
  delete(blogId: any) {
    return this.http.delete(this.serverUrl + "/blog/" + blogId)
      .map(response => response.json())
  }

  // Delete all blog from database server [PROHIBITED]
  deleteAll() {
    return this.http.delete(this.serverUrl + "/blog")
      .map(response => response.json());
  }

  // structure it so that databse will accept this to store i.e. here in our case modify the data to JSON.
  prepareJSON(blog: any, _Id: any = "", blogger: string = ""): any {
    let payLoad = { _Id: _Id, blogcontent: blog, blogger: blogger || "Jyotirmay Senapati" };
    return payLoad;
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
  templateUrl: 'app/template/login.htm'
})
export class AuthApp {

  googleLoginButtonId = "google-login-button";

  userAuthToken: any;
  userDisplayName: string;
  public isLoggedIn: boolean;

  constructor(private _zone: NgZone) {
    this.default();
  }

  // Function to reset class values to default.
  default() {
    this.userAuthToken = null;
    this.userDisplayName = "empty";
    this.isLoggedIn = false;
    localStorage.setItem('sess', 'false');
  }

  // Signout from Application and resetting values to default.
  signOut = () => {
    this._zone.run(() => {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
      });
      this.default();
    });
  }

  // Angular hook that allows for interaction with elements inserted by the
  // rendering of a view.
  ngAfterViewInit() {
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
      if (!this.isLoggedIn) {
        this.userAuthToken = loggedInUser.getAuthResponse().id_token;
        this.userDisplayName = loggedInUser.getBasicProfile().getName();
        this.isLoggedIn = true;
        localStorage.setItem('sess', 'true');
      } else {
        this.signOut();
        this.isLoggedIn = false;
        localStorage.setItem('sess', 'false');
      }
    });
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
      <div class="fb-comments" data-href="https://www.facebook.com/SenapatiJyotirmay/" data-width="1100" data-numposts="3">
      </div>
    </div>
  `
})
export class FacebookCommentComponent {

  protected js;
  protected fjs;
  protected childNode;
  public fbCommentID: any;

  constructor( @Inject(DOCUMENT) private document: any, private _zone: NgZone, protected router: Router, public r: Renderer, public el: ElementRef) {
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
      this.js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.7&appId=1834265296843281";
      this.childNode = this.fjs.parentNode.insertBefore(this.js, this.fjs);
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
  providers: [myBlogService],
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

  constructor(protected myblogservice: myBlogService, protected router : Router, protected route : ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (param: any) => {
        this.blogcontent = param['content'];
        //this.blogId = param['id'];
        console.log(this.blogcontent);
      });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  // Add new blogs to database
  addBlog() {
    this.isSuccess = false;
    this.blog = this.myblogservice.prepareJSON(this.blogcontent);
    this.myblogservice.add(this.blog).subscribe(data => {
      this.isSuccess = true;
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
    },
      err => {
        this.isSuccess = false;
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
  providers: [myBlogService],
  styleUrls: ['app/css/blog.css'],
  templateUrl: `app/template/myBlogs.htm`
})
export class BlogListComponent {

  // Property to hold blog data
  public blogs = [];
  public isSuccess: Boolean;

  constructor(protected myblogservice: myBlogService, protected router: Router) {
    this.get();

  }

  // check function to check control is going to service
  check() {
    this.myblogservice.check();
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
    this.router.navigate(['blog/update/', blog.blogcontent]);
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
      this.blogs = this.blogs.slice(this.blogs.indexOf(blog), 1);
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
  providers: [myBlogService, AuthApp],
  styleUrls: ['app/css/app.css'],
  templateUrl: 'app/template/base.htm'
})
export class BlogHomeComponent {

  loggedIn: String = "false";

  constructor(protected router: Router) {
    this.router.navigate(['/blog/new']);
  }
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
    path: 'blog/update/:content', 
    component: NewBlogComponent
  },
  { path: 'blog/Login', component: AuthApp },
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
  BlogNotFoundComponent, BlogListComponent,
  NewBlogComponent, FacebookCommentComponent, FbCommentDirective
];
@NgModule({
  imports: [BrowserModule, HttpModule, CKEditorModule, FormsModule, routing],
  declarations: declarationArr,
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, appRoutingProviders],
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
platform.bootstrapModule(app);