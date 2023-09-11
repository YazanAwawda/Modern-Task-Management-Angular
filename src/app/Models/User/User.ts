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

export interface CurrentUser {
 id: string;
 userName: string;
 email: string;
 token: string;
 imageUrl: string;
}

export  interface  emp extends  User , userRegister {
  DisplayEmail : string;
}

export function setDisplayName(emp :emp){
  if(emp.email) {
    emp.DisplayEmail = emp.email;
  }
}

export  interface  GetUser {

   firstName: string,
   lastName: string,
   phoneNumber: string,
   biography: string,
   jobTitleName: string,
   birthdate: Date,
   address: string,
   technicalSkills: [    {
     name : string,
     technicalSkillCategory: {
       name: string,
       id: number
     },
     id: number
   }],
   teams: [
  {
     teamName: string,
      id: number
  }
],
   projects: [
  {
    name: string,
    id: number
  }
],
   numberOfCurrentlyResolvedTasks: number,
   numberOfCurrentlyInProgressTasks: number,
   numberOfCurrentlyPendingTasks: number,
   numberOfCreatedTasks: number,
   imageUrl: string,
   id: number

}
