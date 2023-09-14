import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {
    Permission,
    Role,
    RolePermissions,
    UpdateUserRoleWithPermissions
} from "../../Models/Permission/permission-model";


@Injectable({
        providedIn : 'root'
    })

export  class RoleService {
constructor(private  http : HttpClient) {
}

GetRolePermissions(roleName : string) :Observable<Permission[]>{
    return this.http.get<Permission[]>
    (`https://localhost:7011/api/Permission/GetRolePermissions?roleName=${roleName}`);
}

GetRoles(): Observable<Role[]> {
   return this.http.get<Role[]>( 'https://localhost:7011/api/Permission/GetRoles');
}


UpdateRolePermission(Permission:RolePermissions):Observable<RolePermissions> {
    return this.http.patch<RolePermissions>
    ("https://localhost:7011/api/Permission/UpdateRolePermissions" , Permission);
}


AddRole(Permission  :RolePermissions) : Observable<RolePermissions>{
    return this.http.post<RolePermissions>("https://localhost:7011/api/Permission/AddRole"
        , Permission);
}

DeleteRole(roleName: string){
return this.http.delete("https://localhost:7011/api/Permission/DeleteRole",{
    body:{
        "roleName" : roleName
    }
}).pipe(map(res => {
    return res;
}));
}


GetPermissions():Observable<Permission[]> {
  return this.http.get<Permission[]>( 'https://localhost:7011/api/Permission');
}

UpdateUserRoleWithPermission(role :UpdateUserRoleWithPermissions):Observable<UpdateUserRoleWithPermissions>{
    return this.http.put<UpdateUserRoleWithPermissions>
    ('https://localhost:7011/api/Permission/UpdateUserRoleWithPermissions' , {
         "roleName": role.roleName,
         "userEmail": role.userEmail.email,
         "permissions": role.permissions
    })
}


}
