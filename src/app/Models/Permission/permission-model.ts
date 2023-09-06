

export  interface  PermissionKeyValue {
  permissionDisplayNames  : string ,
  permissionValues  : number
}

export  interface Permission {
  permissionType  : string ,
  permissions : PermissionKeyValue []
}

export interface RolePermissions {
  roleName : string ,
  permissions : number []
}


export  interface  DeleteRole {
  roleName : string
}

export interface  UpdateUserRoleWithPermissions {
  roleName: string,
  userEmail: string ,
  permissions: number []
}

export interface  Role {
  roleId:string ,
  roleName:string
}
