
import * as Enum_ from "../../Enum/enum.model" ;
import {AbstractControl} from "@angular/forms";
import { TaskType } from "../TaskType/task-type";
import {TaskPriority} from "../TaskPriority/task-priority";
export interface GetAllTasks {
  name: string,
  description: string,
  estimatedDueDate: Date,
  actualDueDate : Date,
  startDate: Date,
  endDate:  Date,
  currentStatus: Enum_.TaskStatus,
  projectId: number,
  type:TaskType ,
  priority: TaskPriority,
  durationProgress: null,
  assignee: {
    employee: {
      id: string,
      name: string
    },
    isTeamLeader: boolean
  },
  id: number

}

export  interface  GetTask

{
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    subTasks: [],
    comments: [{
    content: string,
    parentCommentId: number,
     replies: [{
      content: string,
      parentCommentId: number,
      replies: [],
      taskId: number,
      attachments: null,
      username: string,
      createdAt: Date,
      lastUpdatedAt: Date,
      id: number
    }],
    taskId: number,
    attachments: [],
    username: string,
    createdAt: Date,
    lastUpdatedAt: Date,
    id: number
  }],
        type: {
        name: string,
        id: number}
  ,
  priority: {
  name: string,
      id: number
},
  assignedEmployee: {
  id: string
},
  currentStatus: {
    status: number,
    name: string
},
  attachments: allFilesOfTask[],
  taskTimeline: [
  {
    fromState:string,
     toState: string,
    assignedUser: string,
    transitionDate: null
  }
],  createdBy: string,
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
