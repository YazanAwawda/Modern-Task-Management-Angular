import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/auth-service/auth.service";

export  const  isUserLoggedInGuard = (
    route : ActivatedRouteSnapshot ,
    state : RouterStateSnapshot
) => {
    const auth = inject(AuthenticationService);
    return auth.isAuthenticated();
}
