import * as enum_ from "../../../Enum/enum.model";

export  class TaskParams {

  ProjectId : number ;

  TaskPrioritiesFilter ?: enum_.TaskPriority[] = [0];

  TaskTypesFilter ?: enum_.TaskType[] = [0];

  TaskStatusToDisplay ?: enum_.TaskStatus[] = [0] ;

  PageIndex  : number  = 1;

  PageSize : number = 6;

  Sort : string  ;

  Search : string ;

  constructor() {
  }
}
