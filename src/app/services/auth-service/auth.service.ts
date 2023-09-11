import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable, of, Subject} from "rxjs";
import {CurrentUser, User, userRegister} from "../../Models/User/User";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NotificationService} from "../notification-service/notification-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public CurrentUser : CurrentUser | undefined;
  public  isAuthenticatedValue  : boolean = false ;

  constructor(private  http : HttpClient ,
              private  router : Router ,
              private  toasty : ToastrService ) {

    this.tryGetUser();
  }


  private tryGetUser(){
    this.CurrentUser =  JSON.parse(localStorage.getItem("current-user"));

  }
  private  _updateMenu = new Subject<void>();
  get updateMenu(){
    return this._updateMenu;
  }
  On_Login(obj : User) : Observable<CurrentUser>{
    return this.http.post<CurrentUser>("https://localhost:7011/api/Authentication/login" , obj ) ;
  }
  On_Register(obj : userRegister) : Observable<userRegister>{
    return this.http.post<userRegister> ("https://localhost:7011/api/Authentication/register",obj) ;
  }
  getToken(){
    return localStorage.getItem('token') || ' ' ;
  }
  public isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token === null) {
      this.logOut();
      localStorage.removeItem("current-user");

      return of(false); // Return a false Observable because the user is not authenticated.
    } else {
      // Make an HTTP request to check the token validity.
      let headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      }
      );

      return this.http.get<any>('https://localhost:7011/api/Team', { headers }).pipe(
          map((res) => {
            console.log(res);
            return res.status !== 401; // Check the response status to determine authentication.
          }),
          catchError((error) => {
            console.error(error);
            return of(false); // Return a false Observable in case of an error.
          })
      );
    }
  }

  logOut(){
    alert('Your session expired');
    this.isAuthenticatedValue = false;
    localStorage.clear();
    // this.notificationService.stopConnection();
    this.toasty.error("Your session ended");
  return   this.router?.navigate(['/authentication/login']);
  }

  SaveTokens(tokenData : any)
  {
    return localStorage.setItem('token' , tokenData.token);
  }

}
