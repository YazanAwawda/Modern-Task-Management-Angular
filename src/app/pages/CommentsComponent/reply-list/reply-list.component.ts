import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "../../../services/comment-service/comment.service";
import {ToastrService} from "ngx-toastr";
import {CommentState, editComment, taskComment} from "../../../Models/Comment/comment.model";

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.scss']
})
export class ReplyListComponent implements  OnInit {


  @Input()
  replies: (taskComment[] & CommentState[]) ;
  @Input()
  parent:(taskComment & CommentState)  ;
  @Input()
  userName: string ;

  zero : number = 0 ;

  @Input() taskId : number;
  constructor(
    private commentService: CommentService,
    private toasty: ToastrService
  ) { }


  ngOnInit(): void {
  }

  toggleReplies(reply: (taskComment & CommentState)) {
    if (!reply.areRepliesLoaded) {
      let result$ = this.commentService.getReplies(this.taskId!);
      result$.subscribe(
        replies => {
          reply.replies = replies;
          reply.areRepliesLoaded = true;
          reply.isViewing = true;
        },
        err => {
          console.log(err);
        }
      )
    }
    else {
      reply.isViewing = !reply.isViewing;
    }
  }

  delete(reply: (taskComment & CommentState)) {
    var result$ = this.commentService.delete(reply.id!);
    result$.subscribe(
      res => {
        this.toasty.success("Deleted successfully.");
        for (var i = 0; i < this.replies.length; i++) {
          if (this.replies[i].id === reply.id!) {
            this.replies.splice(i, 1);
            if (this.parent) {
              this.parent.numOfReplies!--;
            }
            break;
          }
        }
      },
      err => {
        this.toasty.error("Error occurred. Please try again!");
        console.log(err);
      }
    );
  }

}
