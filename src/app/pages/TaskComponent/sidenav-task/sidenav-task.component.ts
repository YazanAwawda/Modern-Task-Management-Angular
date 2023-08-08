import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetAllTasks, GetTask} from "../../../Models/Tasks/task.model";
import {TaskServices} from "../../../services/task-service/task-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sidenav-task',
  templateUrl: './sidenav-task.component.html',
  styleUrls: ['./sidenav-task.component.scss']
})
export class SidenavTaskComponent implements  OnInit{
  tasksInfo !: GetTask ;
  @Input() taskId: number ;
  showDetails : boolean = true;




  // For fix the Event toggleSideNav is not emitted by any applicable directives nor by app-sidenav-task element
  // @Output() toggleSideNav_: EventEmitter<void> = new EventEmitter<void>();
  constructor(private  taskService : TaskServices) {
  }
  ngOnInit() {
    this.taskDetails(this.taskId)
  }


  taskDetails(taskID : any){
    if(taskID){
      this.taskService.getTaskByID(this.taskId ).subscribe(task => {
        this.tasksInfo = task;
        this.taskId = this.tasksInfo.id ;
        this.taskId = taskID ;
        console.log(this.taskId);
      },(err=> {
        console.log(err);
      }));
    }

  }
  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }


}
