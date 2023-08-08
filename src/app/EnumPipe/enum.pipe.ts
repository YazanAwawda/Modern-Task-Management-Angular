import {Pipe , PipeTransform} from "@angular/core";
import *  as EnumModal from "../Enum/enum.model";

@Pipe({name : 'TaskType'})
export class TaskTypePipe implements  PipeTransform {

  transform(value: EnumModal.TaskType) : string {
    switch (value) {
      case  EnumModal.TaskType.FeatureAdd : return 'FeatureAdd' ;
      case  EnumModal.TaskType.BugFix  :  return 'BugFix' ;
      case  EnumModal.TaskType.FeatureRemove : return 'FeatureRemove' ;
      default : return 'No transformation created for ${value} ' ;
    }
    }
}
@Pipe({name: 'TaskPriority'})
export  class  TaskPriorityPipe implements  PipeTransform {
    transform(value:EnumModal.TaskPriority) {
     switch (value) {
       case EnumModal.TaskPriority.High : return 'High' ;
       case EnumModal.TaskPriority.Low : return 'Low';
       case EnumModal.TaskPriority.Moderate : return 'Moderate' ;
       case EnumModal.TaskPriority.VeryHigh : return  'VeryHigh';
       case EnumModal.TaskPriority.VeryLow :  return  'VeryLow' ;
       default : return 'No transformation created for ${value} ' ;
     }
    }
}
@Pipe({name : 'TaskStatus'})
export class TaskStatusPipe implements  PipeTransform {
    transform(value : EnumModal.TaskStatus) {
        switch (value) {
          case EnumModal.TaskStatus.Assigned : return 'Assigned';
          case EnumModal.TaskStatus.Closed : return 'Closed' ;
          case EnumModal.TaskStatus.Draft : return 'Draft' ;
          case EnumModal.TaskStatus.Declined : return 'Declined';
          case EnumModal.TaskStatus.Finished : return  'Finished';
          case EnumModal.TaskStatus.InProgress : return  'InProgress';
          case EnumModal.TaskStatus.Pending : return  'Pending' ;
          case EnumModal.TaskStatus.Projected : return 'Projected';
          case EnumModal.TaskStatus.Removed : return 'Removed' ;
          default : return 'No transformation created for ${value} ' ;
        }
    }
}
@Pipe({name : 'ProjectStatus'})
export class  ProjectStatusPipe implements  PipeTransform {
    transform(value:EnumModal.ProjectStatus) {
       switch (value) {
         case  EnumModal.ProjectStatus.New : return 'New' ;
         case  EnumModal.ProjectStatus.Canceled : return  'Canceled' ;
         case  EnumModal.ProjectStatus.InProgress : return  'InProgress' ;
         case  EnumModal.ProjectStatus.Open : return 'Open' ;
         case  EnumModal.ProjectStatus.Completed: return 'Completed';
         default : return 'No transformation created for ${value} ' ;
       }
    }

}
