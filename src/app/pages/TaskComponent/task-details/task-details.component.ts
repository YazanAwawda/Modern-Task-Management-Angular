import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {CommentService} from "../../../services/comment-service/comment.service";
import {getComment} from "../../../Models/Comment/comment.model";
import {TaskServices} from "../../../services/task-service/task-service";
import {GetTask} from "../../../Models/Tasks/task.model";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})

export class TaskDetailsComponent implements  OnInit , OnDestroy {

  taskId : number ;
  attachmentId : number ;
  task :  GetTask ;
  type : string = "Tasks";
  typeId:string = "taskId";
  constructor(private  route : ActivatedRoute ,
              private  taskService : TaskServices ,
              private  commentService : CommentService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.taskId = +params['id'];
      this.commentService.startConnection(this.taskId);
      this.commentService.getReplies(this.taskId).subscribe((res: getComment[]) => {
        this.commentService.commentSubject.next(res);
        console.log(res);
      });
    })

    this.getTaskDetails();

  }

getTaskDetails(){
 this.taskService.getTaskByID(this.taskId).subscribe(res => {
   this.task = res ;
   for (let re of this.task.attachments){
    this.attachmentId = re.id;
     console.log(this.attachmentId);
   }
   console.log(res);
 })
}

ngOnDestroy() {
    this.commentService.stopConnection() ;
}
  progressBarValue: number  = 0 ;
  increaseProgress() {
    if (this.progressBarValue < 100) {
      this.progressBarValue += 10;
    }
  }

  decreaseProgress() {
    if (this.progressBarValue > 0) {
      this.progressBarValue -= 10;
    }
  }

  startTask(){

  }

  assignTask() {

  }

  markInProgress() {

  }


  markResolved(){

  }


  reopenTask(){

  }

  declineTask(){

  }


  closeTask(){

  }

  }
