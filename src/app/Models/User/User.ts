export interface User {
  email : string ;
  password ?: string ;
}

export  interface  userRegister {
  email : string  ;
  userName ?: string  ;
  password ?: string   ;
  roleName ?: string ;
  permissions ?: number[];
  firstName ?: string;
  lastName ?: string;
  jobTitle ?: string;
}

export  interface  emp extends  User , userRegister {
  DisplayEmail : string;
}

export function setDisplayName(emp :emp){
  if(emp.email) {
    emp.DisplayEmail = emp.email;
  }
}
