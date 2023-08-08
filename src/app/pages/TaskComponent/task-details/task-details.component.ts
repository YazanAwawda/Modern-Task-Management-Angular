import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {getComment, taskComment} from "../../../Models/Comment/comment.model";
import {CommentService} from "../../../services/comment-service/comment.service";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})

export class TaskDetailsComponent implements  OnInit {

  taskId : number ;
  constructor(private  route : ActivatedRoute , private  commentService : CommentService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.taskId = +params['id'];
    })


  }



}
