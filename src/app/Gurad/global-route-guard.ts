import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/auth-service/auth.service";
import {PermissionService} from "../services/permission-service/permission.service";
import {PermissionKeyValue} from "../Models/Permission/permission-model";
import {tap} from "rxjs";

export const CanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const  permissionService = inject(PermissionService);
  if(authService.getToken() != ''){
    if(!authService.isAuthenticated())
       router?.navigate(['/authentication/login']);
  }
  permissionService.getAllPermission();
  const hasPermission = (route.data["requiredPermissions"] ) as number[] ;

  return permissionService.checkPermission(
    hasPermission,
  ).pipe(
    tap(hasAccess => {
      if (!hasAccess) {
        router?.navigate(['/authentication/access-denied']);
      }
    })
  );

};
export const hasChildAccessPage: CanActivateChildFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => CanActivate(route, state);
