import  * as enum_ from '../../Enum/enum.model'
import {TeamMembers} from "../Team/team.model";
export interface GetProjectById {
  id ?: number;
  name : string;
  description : string;
  estimatedStartDate : Date;
  estimatedEndDate : Date;
  currentStatus: enum_.ProjectStatus;
  team: {
    teamName: string,
    teamMembers: TeamMembers[],
    teamLeader:null ,
    id:number
  },
  tasks: [
    name : string,
    description :string,
    estimatedDueDate: Date,
    actualDueDate : Date,
    startDate : Date,
    endDate : Date,
    currentStatus : enum_.TaskStatus,
    projectId: number,
    taskType : enum_.TaskType,
    priority: enum_.TaskPriority,
    durationProgress : string,
    assignee: string,
    id: number
  ],
  trackerValue: string,
  attachments : Attachments[]
}
export interface  Attachments {
  fileName: string,
  fileType: string,
  fileSize: number,
  id: number
}
export interface GetProjects
{
  name: string,
  description: string,
  team: {
    teamName: string,
    teamMembers: [
      {
        employee: {
          id: string,
          name: string
        },
        isTeamLeader: boolean
      }
    ],
    teamLeader: null,
    id: number
  },
  numberOfOpenTasks: number,
  estimatedStartDate: Date,
  estimatedEndDate: Date,
  startDate: Date,
  endDate: Date,
  currentStatus: enum_.ProjectStatus,
  teamId: number,
  id : number
}


export interface CreateProject {
  name: string;
  description: string;
  estimatedStartDate : Date;
  estimatedEndDate : Date;
  teamId : number;
}

export interface EditProject {
  id: number,
  name: string,
  description: string
}

export interface ProjectAddTeam {
  id : number;
  teamId : number;
}

export interface DeleteProject {
  id?: number;
}

export interface uploadFileProject {
  projectId : number;
  fileProject ?: File [] ;
}

export interface downloadFileProject {
  projectId: number;
  attachmentId: number;
}
