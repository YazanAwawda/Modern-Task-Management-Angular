import * as enum_ from "../../../Enum/enum.model";
import {TaskPriority, TaskStatus} from "../../../Enum/enum.model";
import { TaskType } from "../../TaskType/task-type";

export  class TaskParams {

  ProjectId : number ;

  TaskPrioritiesFilter ?: TaskPriority[];

  TaskTypesFilter ?: TaskType[] ;
  GetCreatedByMeTasks : boolean;
  GetAssignedToMeTasks : boolean;
  GetCreatedToMeTasks : boolean ;
  TaskStatusFilter ?: TaskStatus[]  ;

  PageIndex  : number  = 1;

  PageSize : number = 6;

  Sort : string  ;

  Search : string ;

  constructor() {
  }
}
