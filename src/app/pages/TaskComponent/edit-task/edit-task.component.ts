import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditTask, GetTask} from "../../../Models/Tasks/task.model";
import {TaskServices} from "../../../services/task-service/task-service";
import {ActivatedRoute} from "@angular/router";
import * as enum_ from "../../../Enum/enum.model";
import {enumValues} from "../../../EnumHelper/enum.helper";
import {TaskType} from "../../../Enum/enum.model";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements  OnInit{

  public enumValue = enumValues;
  public taskType = enum_.TaskType ;

  editTaskFormGroup : FormGroup;
  tasksEdit : EditTask;
  taskId: number;
  selectedTaskType = this.taskType.FeatureRemove;

  task:GetTask ;
  constructor(
              private taskService : TaskServices ,
              private  fb : FormBuilder
              ,private  route : ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.params.subscribe(x =>
      this.taskId =  +x['id']);

    this.editTaskFormGroup = this.fb.group({
      name : ['' ,Validators.required] ,
      description : [' ' ,Validators.required] ,
      endDate : [' ' ,Validators.required],
      taskType : [this.selectedTaskType ,Validators.required]
    });

    this.getTaskByID();
  }
  editTask(){
    const editTask : EditTask = {
      id : this.taskId ,
      name : this.editTaskFormGroup.get('name')?.value ,
      description : this.editTaskFormGroup.get('description')?.value ,
      endDate : this.editTaskFormGroup.get('endDate')?.value ,
      taskType : Number(this.editTaskFormGroup.get('taskType')?.value)
    }
    this.taskService.editTask(editTask).subscribe(res => {
      this.tasksEdit = res ;
    });
  }


getTaskByID() {
    this.taskService.getTaskByID(this.taskId).subscribe(res=>{
   this.task = res;
    });
}
}
