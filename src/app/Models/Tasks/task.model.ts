
import * as Enum_ from "../../Enum/enum.model" ;
import {AbstractControl} from "@angular/forms";
import { TaskType } from "../TaskType/task-type";
import {TaskPriority} from "../TaskPriority/task-priority";
export interface GetAllTasks   {
  name: string,
  description: string,
  estimatedDueDate: Date,
  startDate: Date,
  endDate: Date,
  currentStatus: {
    status: number,
    name: string
  },
  projectId: number,
  type: {
    name: string,
    color: string,
    id: number
  },
  priority: {
    name: string,
    color: string,
    id: number
  },
  durationProgress: number,
  assignee: {
    employee: {
      id: string,
      name: string,
      email: string,
      imageUrl:string
    },
    isTeamLeader: boolean
  },
  createdBy: string,
  id: number

}
export  interface  GetTask

{
  name: string,
  description: string,
  startDate: string,
  endDate: Date,
  estimatedDueDate: Date,
  subTasks: [],
  comments: [
    {
      content: string,
      parentCommentId: number,
      replies: [],
      taskId: number,
      attachments: [],
      username: string,
      createdAt: string,
      lastUpdatedAt:string,
      id: number
    }
  ],
  type: {
    name: string,
    color: string,
    id: number
  },
  priority: {
    name: string,
    color: string,
    id: number
  },
  assignedEmployee: {
    id: string,
    name: string,
    email: string,
    imageUrl: string
  },
  currentStatus: {
    status: number,
    name: string
  },
  attachments: allFilesOfTask[],
  taskTimeline: [
    {
      fromState: string,
      toState: string,
      assignedUser: string,
      transitionDate: Date
    }
  ],
  createdBy: {
    employee: {
      id: string,
      name: string,
      email: string,
      imageUrl: string
    },
    isTeamLeader: number
  },
  durationProgress: number,
  id: number
}



export interface  AssignedTeamMember  {
  id :  AbstractControl<any , any>  | any | string;
  teamId :  AbstractControl <any , any>   | any | number;
}

export interface CreateTasks {
  name ?: string,
  description ?: string,
  projectId ?: number,
  taskTypeId ?: TaskType ,
  priorityId ?: TaskPriority ,
  assignedTeamMember ?: AssignedTeamMember,
  estimatedDueDate ?: Date
}

export interface EditTask {
  id: number,
  name: string,
  description: string,
  taskTypeId : number,
  priorityId : number
  progress : number ;
}
export interface DeleteTask {
  id: number
}

export interface TaskComment {
  content: string,
  parentCommentId: 0,
  taskId: 0
}
export interface CreateSubTask {
  parentTaskId: number,
  name: string,
  description: string,
  estimatedDueDate: Date,
  taskType: 0,
  priority: 0,
  teamMemberEmployeeId: string
}
export interface EditAssignTeamMember {
  taskId: number,
  employeeID: string
}
export interface ReAssignTeamMember {
  taskId: number,
  employeeID: string
}
export interface UploadTasksFiles {
  OwnerId: number,
  Files: File[]
}

export interface UploadTasksFile {
    OwnerId: number,
    Files: File
}
export interface DownloadFileTask {
  taskId: number,
  attachmentId: number
}

export  interface  allFilesOfTask  {

     fileName: string,
     fileType:string,
     fileSize: string,
     id : number ;
}
