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
import { Component, NgModule, Injectable, Inject, NgZone,
         ModuleWithProviders, OnInit, Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Http, HttpModule, Request, Response} from '@angular/http';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {FormsModule} from '@angular/forms';
//import { NgIf, NgFor } from '@angular/common';
//import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';

// Other ng-modules
import {CKEditorModule} from 'ng2-ckeditor';

//############################################################################################################//
/**
 * 
 * My Blog CONFIG details
 * 
 */
export class CONFIG {

  private __version__ : any;
  protected _gapiURL : any;
  protected _fbAPPID : any; 
  protected _authTOKEN : any;
  protected _fbCOMMENTURI : any; 
  constructor() {}

}

//############################################################################################################//
/**
 * 
 * My Sevices
 * 
 */
@Injectable()
export class myBlogService{

  // Property to hold root server URL i.e host
  //private serverUrl:string = "http://myblog-jms.c9users.io:8080"
  private serverUrl:string = "http://127.0.0.1:3000"

  constructor(private http:Http) {}
  
  // check function in service to check control is coming to service
  check(){
    alert("getting clicked from service");
  }

  // get function to get data from server
  // basically blog datas
  get(): Observable<any> {
    return this.http.get(this.serverUrl+"/blog")
               .map(response => response.json())
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
@Directive({selector: '[fbCommentLoad]'})
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
declare let gapi:any;

@Component({
    selector: "loginWithGoogle",
    styleUrls: ['app/css/login.css'],
    templateUrl: 'app/template/login.htm'
})
export class AuthApp {

  googleLoginButtonId = "google-login-button";

  userAuthToken : any;
  userDisplayName : string;
  public isLoggedIn: boolean;

  constructor(private _zone: NgZone) {
    this.default();
  }
 
 // Function to reset class values to default.
 default(){
   this.userAuthToken = null;
   this.userDisplayName = "empty";
   this.isLoggedIn = false;
   localStorage.setItem('sess', 'false');
 }

// Signout from Application and resetting values to default.
 signOut = () => {
    this._zone.run(() => {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function(){
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

  getIsLoggedIn() : boolean{
    return this.isLoggedIn;
  }

  // Triggered after a user successfully logs in using the Google external
  // login provider.
  onGoogleLoginSuccess = (loggedInUser) => {
    this._zone.run(() => {
      if(!this.isLoggedIn) {
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
 * CKEditor Component
 * 
 */
@Component({
  selector: 'ckeditorForm',
  styleUrls:['app/css/blog.css'],
  templateUrl: `app/template/blog.htm`
})
export class ckeditorClass {

  public blogContent:any;  
  public ckeditor : CKEditorModule;

  constructor(){
    this.blogContent="<p>Hello</p>";
  }

  blogSubmit() {
    alert("getting clicked. Backend not configured");
  }
}

/**
 * 
 * Google Comments API integration
 * 
 */
@Component({
  selector: 'googleComment',
  template: `
    <div class="g-commentcount" data-href="blog/"></div>
    <div id="{{commentId}}"></div>
  `
})
export class GoogleCommentComponent /*implements OnInit */{

  // Dynamic id available for two way binding and google comment API.
  commentId : string = "comments";

  constructor() {
    this.embedComment();
  }

  /*ngOnInit(){}*/

  embedComment() {console.log(this.commentId);
    gapi.comments.render(this.commentId, {
        href: window.location,
        width: '624',
        first_party_property: 'BLOGGER',
        view_type: 'FILTERED_POSTMOD'
    });
  }
}

/**
 * 
 * Facebook Comments API integration
 * 
 */
declare let FB : any;
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
  public fbCommentID : any;
  constructor(@Inject(DOCUMENT) private document: any, private _zone: NgZone, protected router : Router,public r : Renderer, public el : ElementRef) {
    this.fbCommentID = "fbCommentId";
    this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
    //r.selectRootElement(this.el);
    //console.log(this.el.nativeElement);
    //console.log(FB);
  }

  // All Component lifecycle hook methods injected by Angular.
  ngOnChanges() {
    //FB.XFBML.parse(document.getElementsByTagName("facebookcomment"));
    //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');

  }

  ngOnInit() {
    //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');

  }

  ngDoCheck() {
    //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');

  }

  ngAfterContentInit() {
    //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');

  }

  ngAfterContentChecked() {
    //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');

  }

  ngAfterViewInit() {
    //console.log("coming")
    //FB.XFBML.parse(this.document.getElementsByTagName("facebookcomment"));
    //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');
  }

  ngAfterViewChecked() {
    //this.loadFBCommentAPI(this.document, 'script', 'facebook-jssdk');

  }

  ngOnDestroy() { 
    //console.log(`onDestroy`); 
  }

  loadFBCommentAPI = (d, s, id) => {
    // Testing router redirect
    //this.router.navigate(['/blog/new']);
    this._zone.run(() => {
      this.js, this.fjs = d.getElementsByTagName(s)[0];
      
      if (typeof FB === 'object') {
        console.log("coming");
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
 * Ckeditor component
 * 
 */
@Component({
  providers: [myBlogService, ckeditorClass /*,AuthApp*/],
  template : `
    <ckeditorForm></ckeditorForm>
  `
})
export class NewBlogComponent{
  
  // Property to hold blog content.
  public blogContent = 'Start Blogging';
  
  constructor(public ckeditorclass : ckeditorClass, protected router:Router){
    if (!localStorage.getItem('sess')) {
      this.router.navigate(['/blog/Login']);
    }
  }

}

/**
 * 
 * It is one of router component which consume Google plus comment
 * box component.
 * This component maps comment api to the application.
 * 
 */
@Component({
  providers: [GoogleCommentComponent, FacebookCommentComponent],
  template : `
    <!--googleComment></googleComment-->
    <facebookComment></facebookComment>
  `
})
export class BlogComponent {

  constructor(public gcomment: GoogleCommentComponent, public fcomment: FacebookCommentComponent){}

}

/**
 * 
 * BlogListComponent to list out all blogs.
 * 
 */
@Component({
  providers: [myBlogService /*,AuthApp*/],
  styleUrls: ['app/css/app.css'],
  template : `
    <h1 (click)= check()>My First Angular 2 App</h1>
    <button (click)=get()>Get My Name</button>
    <h1 *ngFor= "let res of getResponse">{{res.blogger}}</h1>
  `
})
export class BlogListComponent {

   // Property to hold blog data
  public getResponse = [{"blogger": "coming soon", "age": ""}, {"blogger": "hello"}];
  
  constructor(protected myblogservice : myBlogService, protected router:Router){
    if (!localStorage.getItem('sess')) {
      this.router.navigate(['/blog/Login']);
    }
  }
  
  // check function to check control is going to service
  check() {
    this.myblogservice.check();
  }
  
  // get function calls service get function which return data from server
  get(){
    this.myblogservice.get().subscribe(data => {
       this.getResponse = this.getResponse.concat(data);
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
  providers: [myBlogService, ckeditorClass, AuthApp],
  styleUrls: ['app/css/app.css'],
  templateUrl: 'app/template/base.htm'
})
export class BlogHomeComponent {

  //commentId : string = "comments";
  loggedIn : String = "false";
 
  constructor(protected router: Router) {
    if (!localStorage.getItem('sess')) {
      this.router.navigate(['/blog/Login']);
    }
    this.loggedIn = localStorage.getItem('sess');
    console.log("coming here");
    console.log(localStorage.getItem("sess"));
    this.router.navigate(['/blog/new']);
    //this.embedComment();
  }

  /*
  // Testing Code.
  embedComment() {console.log(this.commentId);
    gapi.comments.render(this.commentId, {
        href: window.location,
        width: '624',
        first_party_property: 'BLOGGER',
        view_type: 'FILTERED_POSTMOD'
    });
  }*/
}

/**
 * 
 * Blog Not Found Component.
 * For typical 404 error component.
 * 
 */
@Component({
  templateUrl : `app/template/pageNotFound.htm`
})
export class BlogNotFoundComponent{

  constructor() {}

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
  { path: 'blog/Login', component: AuthApp},
  { path: '', component: BlogHomeComponent },
  { path: '**', component: BlogNotFoundComponent }
];

const appRoutingProviders: any[] = [

];

const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

//############################################################################################################//
/**
 * 
 * NgModule Declaration
 * 
 */
let declarationArr : Array<any>= [ 
                     BlogHomeComponent, ckeditorClass, AuthApp, 
                     BlogNotFoundComponent, BlogComponent, BlogListComponent,
                     NewBlogComponent, GoogleCommentComponent, FacebookCommentComponent, FbCommentDirective 
                 ];
@NgModule({
  imports:      [ BrowserModule, HttpModule, CKEditorModule, FormsModule, routing ],
  declarations: declarationArr,
  providers:    [ appRoutingProviders ],
  bootstrap:    [ BlogHomeComponent ]
})
export class app{}

//############################################################################################################//
/**
 * 
 * App engine entry point
 * 
 */
const platform = platformBrowserDynamic();
platform.bootstrapModule(app);