import {GetProjects} from "../Project/project.model";

export interface TeamLeader {
  id: string;
  name : string ;
}

export class Employee {
  id: string;
  name : string
  email ?: string
}

export interface CreateTeam {
  teamName: string;
  teamLeader: TeamLeader;
  employees: Employee[];
}
export interface  TeamMembers {
  employee : Employee  ;
  isTeamLeader ?: boolean ;
  id ?: number;
}

export interface GetTeamMembers {
   employee: {
    id : string,
    name: string,
    email : string
  },
  isTeamLeader: boolean
}

export interface  GetTeam {
  id : number ;
 teamName :  string ;
 project ?: null;
 teamMembers :TeamMembers[],
  projects : [ {
  name : string ;
  description :  string ;
    team: {
      teamName: string,
      teamMembers: [
        {
          employee: {
            id:number
          },
          isTeamLeader: boolean,
          id: number
        }
      ],
      teamLeader: null,
      id: number
    },
    numberOfOpenTasks: number,
    startDate: Date,
    currentStatus: 0,
    teamId: number,
    id: number ;
  } ]

}

export  interface  EditTeam {
  id : number ;
  teamName : string ;
  teamMembers : TeamMembers[]
}

export interface  GetTeamById {
  id : number ;
}

export interface  DeleteTeamById {
  id : number ;
}

export interface  GetAvailableTeams {
  id: number,
  teamName: string,
  teamMembers: TeamMembers[],
  projects: GetProjects[],
  project ?: null
}

export interface  UpdateLeader {
   employeeId : string ,
   teamId: number
}
