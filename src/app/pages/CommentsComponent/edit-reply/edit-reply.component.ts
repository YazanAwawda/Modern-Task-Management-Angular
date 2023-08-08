import {Component, Input, OnInit} from '@angular/core';
import {CommentState, editComment, taskComment} from "../../../Models/Comment/comment.model";
import {CommentService} from "../../../services/comment-service/comment.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-reply',
  templateUrl: './edit-reply.component.html',
  styleUrls: ['./edit-reply.component.scss']
})
export class EditReplyComponent implements  OnInit {

  @Input() comment  : (taskComment & CommentState) ;
  @Input() taskId : number ;

  constructor(private  commentService : CommentService ,
              private  toastrService : ToastrService) {
  }

  ngOnInit(): void {
  }

  submitReply(){
    let res = this.commentService.edit({id : this.taskId!
                                          , content : this.comment.content});
    res.subscribe(comment => {
      console.log(comment);
      this.toastrService.success("Updated successfully. ");
    }, err => {
      console.log(err);
    });
  }


}


