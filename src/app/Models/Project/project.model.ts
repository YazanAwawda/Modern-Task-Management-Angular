import  * as enum_ from '../../Enum/enum.model'
import {TeamMembers} from "../Team/team.model";
export interface GetProjectById {
  id ?: number;
  name : string;
  description : string;
  estimatedStartDate : Date;
  estimatedEndDate : Date;
  startDate : Date;
  endDate : Date;
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
  attachments : allFilesOfProject[]
}

export interface GetProjects
{
   name: string,
   description: string,
   numberOfOpenTasks: number,
   estimatedStartDate: Date,
   estimatedEndDate: Date,
   startDate: Date,
   endDate: Date,
   currentStatus: enum_.ProjectStatus,
   progress: number,
   teamId: number,
   createdBy: string,
   id: number
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

export interface uploadFilesProject {
  projectId : number;
  fileProject: File [] ;
}

export interface uploadFileProject {
  projectId : number;
  fileProject : File ;
}




export interface downloadFileProject {
  projectId: number;
  attachmentId: number;
}

export  interface  allFilesOfProject  {
  fileName: string,
  fileType:string,
  fileSize: string,
  id : number ;
}
