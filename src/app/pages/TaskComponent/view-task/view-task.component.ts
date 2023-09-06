import {Component, OnInit} from '@angular/core';
import {TaskServices} from "../../../services/task-service/task-service";
import {ActivatedRoute} from "@angular/router";
import { GetTask} from "../../../Models/Tasks/task.model";
import {enumToString} from "../../../EnumHelper/enum.helper";
import {TaskPriority, TaskStatus , TaskType } from "../../../Enum/enum.model";


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements  OnInit {

  projectId: number;
  task:GetTask ;


  options={
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };
  onColorTaskType(val: any){
    if( val === "BugFix")
    {
      val = "badge text-bg-primary" ;
    }
    if ( val === "FeatureAdd")
    {
      val = "badge text-bg-secondary" ;
    }
    if ( val === "FeatureRemove")
    {
      val = "badge text-bg-success" ;
    }
    return val;
  }
  onColorTaskPriority(val:any){
    if( val === "VeryHigh")
    {
      val = "badge text-bg-danger" ;
    }
    if ( val === "High")
    {
      val = "badge text-bg-warning" ;
    }
    if ( val === "Moderate")
    {
      val = "badge text-bg-success" ;
    }
    if ( val === "Low")
    {
      val = "badge text-bg-warning" ;

    }
    if (val === "VeryLow")
    {
      val = "badge text-bg-info" ;
    }
    return val;
  }
  onColorTaskStatus(val:any){
    if( val === "Assigned")
    {
      val = "badge text-bg-primary" ;
    }
    if ( val === "Canceled")
    {
      val = "badge text-bg-secondary" ;
    }
    if ( val === "Closed")
    {
      val = "badge text-bg-success" ;
    }
    if ( val === "Declined")
    {
      val = "badge text-bg-warning" ;

    }
    if (val === "Draft")
    {
      val = "badge text-bg-info" ;
    }

    if ( val === "InProgress")
    {
      val = "badge text-bg-light" ;

    }
    if (val === "Pending")
    {
      val = "badge text-bg-dark" ;
    }
    if (val === "Projected")
    {
      val = "badge text-bg-secondary" ;
    }

    if ( val === "Removed")
    {
      val = "badge text-bg-danger" ;

    }
    if (val === "Finished")
    {
      val = "badge text-bg-success" ;
    }
    return val;
  }
   ngOnInit(): void {
    this.getTasksById();
  }

  constructor(private  taskServices : TaskServices ,
              private route : ActivatedRoute) {

  }


  getTasksById(){
    this.route.params.subscribe(x => this.projectId = Number(x['id']))
    this.taskServices
      .getTaskByID
    (this.projectId).subscribe
    (task => {
      this.task = task ;


      console.log(this.task);

      let e = enumToString(TaskStatus , this.task.currentStatus ) ;
      this.task.currentStatus = e ;
      this.onColorTaskStatus(e);
      console.log(e);



    });
  }

}
