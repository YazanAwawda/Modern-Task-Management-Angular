import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Permission} from "../../Models/Permission/permission-model";
import {map, Observable, of, ReplaySubject} from "rxjs";


@Injectable({ providedIn: 'root' })

export  class  PermissionService {

   Permissions : Permission[] = [];

   currentPermission$ = new ReplaySubject<Permission[]>(1);
   public getCurrentPermission$(){
     return this.currentPermission$.asObservable();
   }
  constructor(private  http : HttpClient) {
   // this.getAllPermission() ;
  }

 getAllPermission() {
    this.http.get<Permission[]>('https://localhost:7011/api/Permission/GetUserPermissions').subscribe(res => {
     this.Permissions = res;
     this.currentPermission$.next(res);
   }, err => console.log('Error fetching permission:', err));
 }

  // Utility function to check if a user has a specific permission value
 public   hasPermissionForOperation(PermissionKey: number )    {
         const matchingPermission = this.Permissions.find(item =>
       item.permissions.some(perm => perm.permissionValues === PermissionKey) );
         return !!matchingPermission;

    }

 public   checkPermission( key: number[]):Observable<boolean>{
      return   this.currentPermission$.pipe(map(() => {
      for (const permission of this.Permissions) {
          const hasMatchingPermission =
              permission.permissions.some(x => key.includes(x.permissionValues))
             // permission.permissions.includes.some(perm => perm.permissionValues === key.c )
          if (hasMatchingPermission) {
              return true; // User has the required permission
          }

      }
      return  false;

  }))

    }

    hasPermissionObservable(PermissionKey : number) : Observable<boolean>{
    return this.currentPermission$.pipe(map( () => {

      for (const permission of this.Permissions) for (const perm of permission.permissions) {
        const val = this.Permissions.find(item => item.permissions);
        const key = val?.permissions.find(x => x.permissionValues === PermissionKey)
        // PermissionKey = key!.permissionValues;
        if (    PermissionKey === key!.permissionValues) {
          return true; // User has the required permission
        }
      }

      return  false;

      // const matchingPermission = permission.find(item =>
      //   item.permissions.some(perm => perm.permissionValues === PermissionKey) );
      // return !!matchingPermission;
    }));
    //   return this.currentPermission$.pipe(
    //     map(permissions => permissions.some(permission =>
    //       permission.permissions.some(perm => perm.permissionValues === PermissionKey)
    //     ))
    //   );
    }


}
