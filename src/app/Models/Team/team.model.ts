import {GetProjects} from "../Project/project.model";
import  * as enum_ from '../../Enum/enum.model'

export interface TeamLeader {
  id: string;
  name : string ;
}

export class Employee {
        id: string
        name: string
        email?: string
        imageUrl?: string
}

export class CheckBoxEmployee {
  id: string
  name: string
  email?: string
  imageUrl?: string
  checked: boolean = false
}

export interface CreateTeam {
  teamName: string,
  teamLeader: {
    id: string
  },
  employees: Employee[]
}
export interface  TeamMembers {
  employee : Employee  ;
  isTeamLeader : boolean ;
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
  teamName: string,
  teamMembers: TeamMembers[],
  projects: [
  {
    name: string,
    description: string,
    numberOfOpenTasks: number,
    estimatedStartDate:Date,
    estimatedEndDate: Date,
    startDate: Date,
    endDate: Date,
    currentStatus: enum_.ProjectStatus,
    progress: number,
    teamId: number,
    createdBy: string,
    id: number
  }
],
  id: number
}




export  interface  EditTeam {
  id: number,
  teamName: string,
  teamMembers: [
    {
      id: string
    }
  ] | any
}


export interface  GetTeamById {
  teamName: string,
  teamMembers: [
    {
      employee: {
        id: string,
        name: string,
        email: string,
        imageUrl: string
      },
      isTeamLeader: boolean
    }
  ],
  projects: [
    {
      name: string,
      description: string,
      numberOfOpenTasks: number,
      estimatedStartDate:Date,
      estimatedEndDate: Date,
      startDate: Date,
      endDate: Date,
      currentStatus: enum_.ProjectStatus,
      progress: number,
      teamId: number,
      createdBy: string,
      id: number
    }
  ],
  id: number}

export interface  DeleteTeamById {
  id : number ;
}

export interface  GetAvailableTeams {
  id: number,
  teamName: string,
  teamMembers: TeamMembers[],
  projects: GetProjects[],

}

export interface  UpdateLeader {
   employeeId : string ,
   teamId: number
}
