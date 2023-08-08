
import * as Enum_ from "../../Enum/enum.model" ;
import {AbstractControl} from "@angular/forms";
export interface GetAllTasks {
  name: string,
  description: string,
  estimatedDueDate: Date,
  actualDueDate : Date,
  startDate: Date,
  endDate:  Date,
  currentStatus: Enum_.TaskStatus,
  projectId: number,
  taskType:Enum_.TaskType ,
  priority: Enum_.TaskPriority,
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

export  interface  GetTask{

    name: string ,
    description :string  ,
    startDate:  Date,
    endDate: Date,
    subTasks: [],
    comments: [],
    taskType: Enum_.TaskType,
    priority: Enum_.TaskPriority,
    assignedEmployee: {
    id: string,
      name: string
  },
    currentStatus: Enum_.TaskStatus,
    attachments: [],
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
  taskType ?: Enum_.TaskType ,
  priority ?: Enum_.TaskPriority ,
  assignedTeamMember ?: AssignedTeamMember,
  estimatedDueDate ?: Date
}

export interface EditTask {
  id: number,
  name: string,
  description: string,
  endDate: Date,
  taskType: Enum_.TaskType;
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
export interface UploadTasksFile {
  OwnerId: number,
  File: string
}
export interface DownloadFileTask {
  taskId: number,
  attachmentId: number
}
