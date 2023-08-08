import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../services/auth-service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  constructor(private injector : Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthenticationService) ;

    let tokenizedReq = this.AddTokenHandler(req ,authService.getToken());
    return next.handle(tokenizedReq).pipe(
      catchError((err) => {
        if(err.status === 401){
          //For need to implement logout
          authService.logOut() ;

          //To refresh token logic
          // return  this.handleRefreshToken(req , next);

        }
        return throwError(err);
      })
    );
  }

  AddTokenHandler(request : HttpRequest<any> , token : any){
    return request.clone({
      headers : request.headers.set('Authorization' , `Bearer ${token}`)
    });
  }

  // handleRefreshToken(request : HttpRequest<any> , next : HttpHandler){
  //  let authService = this.inject.get(AuthenticationService).pipe
  //switchMap(data : any) => {
  //  authService.SaveToken();
  // return next.handle(this.AddTokenHandler(req, data.token));
  // }
  // }

}
