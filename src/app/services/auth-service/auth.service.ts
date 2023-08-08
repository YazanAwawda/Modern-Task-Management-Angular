import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {User, userRegister} from "../../Models/User/User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private  http : HttpClient , private  router : Router) { }

  tokenResp :  any ;

  private  _updateMenu = new Subject<void>();
  get updateMenu(){
    return this._updateMenu;
  }
  On_Login(obj : User) : Observable<User>{
    return this.http.post<User>("https://localhost:7011/api/Authentication/login" , obj ) ;
  }
  On_Register(obj : userRegister) : Observable<userRegister>{
    return this.http.post<userRegister> ("https://localhost:7011/api/Authentication/register",obj) ;
  }
  getToken(){
    return localStorage.getItem('token') || ' ' ;
  }
  isLogged(){
    return localStorage.getItem('token') != null ;
  }

  logOut(){
    alert('Your session expired');
    localStorage.clear();
    this.router?.navigate(['/authentication/login']);
  }

  SaveTokens(tokenData : any)
  {
    return localStorage.setItem('token' , tokenData.token);
  }
  // GenerateRefreshToken(tokenData : any){
  // return localeStorage.setItem('refreshToken', tokenDate.token);
  // }
}
