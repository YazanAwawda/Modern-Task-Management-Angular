import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditTask, GetTask} from "../../../Models/Tasks/task.model";
import {TaskServices} from "../../../services/task-service/task-service";
import {ActivatedRoute} from "@angular/router";
import * as enum_ from "../../../Enum/enum.model";
import {enumValues} from "../../../EnumHelper/enum.helper";
// import {TaskType} from "../../../Enum/enum.model";
import {TaskPriorityService} from "../../../services/task-priority-service/task-priority";
import {TaskTypeService} from "../../../services/task-type-service/task-type";
import { TaskType } from 'src/app/Models/TaskType/task-type';
import { TaskPriority } from 'src/app/Models/TaskPriority/task-priority';
import {ToastrService} from "ngx-toastr";
import {PermissionService} from "../../../services/permission-service/permission.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements  OnInit{

  // public enumValue = enumValues;
  // public taskType = enum_.TaskType ;

  editTaskFormGroup : FormGroup;
  tasksEdit : EditTask;
  taskId: number;
  taskTypeArr :TaskType[] ;
  taskPriorityArr : TaskPriority[];
  // selectedTaskType = this.taskType.FeatureRemove;

  task:GetTask ;
  constructor( private  taskPriorityService : TaskPriorityService ,
              private  taskTypeService : TaskTypeService ,
              private taskService : TaskServices ,
              public permissionService : PermissionService      ,
              private  fb : FormBuilder
              ,private  route : ActivatedRoute ,
               private  toastyService : ToastrService
  ) {}

  ngOnInit() {

    this.route.params.subscribe(x => {
        this.taskId =  +x['id']
            this.getTaskByID();
            this.getAllTaskType();
            this.getAllTaskPriority();
    });

    this.editTaskFormGroup = this.fb.group({
      name : ['' ,Validators.required] ,
      description : [' ' ,Validators.required] ,
      // endDate : [' ' ,Validators.required],
      // taskType : [this.selectedTaskType ,Validators.required] ,
      taskType_ : ['' , Validators.required],
      taskPriority : ['' , Validators.required]
    });


  }
  editTask(){
    const editTask : EditTask = {
      id : this.taskId ,
      name : this.editTaskFormGroup.value.name ,
      description : this.editTaskFormGroup.value.description,
      taskTypeId : this.editTaskFormGroup.value.taskType_,
      priorityId : this.editTaskFormGroup.value.taskPriority,
      progress   :0
      // endDate : this.editTaskFormGroup.get('endDate')?.value ,
      // taskType : Number(this.editTaskFormGroup.get('taskType')?.value)

    }
    this.taskService.editTask(editTask).subscribe(res => {
      this.tasksEdit = res ;
      if(res) {
        this.toastyService.success("Task Updated Successfully.");
      }
    } ,  err => {
      console.log(err);
     this.toastyService.error("An Error Occurred." ,  err);
    });
  }


getTaskByID() {
    this.taskService.getTaskByID(this.taskId).subscribe(res=>{
   this.task = res;
    });
}

getAllTaskType(){
this.taskTypeService.getTaskTypes().subscribe(res => {
  this.taskTypeArr = res ;
  console.log(res);
});
}

getAllTaskPriority() {
this.taskPriorityService.getTaskPriorities().subscribe(res => {
  this.taskPriorityArr = res ;
  console.log(res);
});
}


}
