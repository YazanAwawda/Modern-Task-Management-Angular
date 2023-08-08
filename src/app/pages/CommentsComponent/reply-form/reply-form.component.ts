import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from "../../../services/comment-service/comment.service";
import {ToastrService} from "ngx-toastr";
import {CommentState, getComment, taskComment} from "../../../Models/Comment/comment.model";


@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.scss']
})
export class ReplyFormComponent implements OnInit {

  @Input()   taskId : number ;
  @Input()   parent: (taskComment & CommentState);
  isSubmitting: boolean = false;
  comments : getComment[];
   public  newComment : (taskComment & CommentState) = {

    content : "" ,
    author : {
      DisplayEmail : "" ,
      email : " "
    },
     connectionId : "" ,
     isNew : true ,
     isReplying : false ,
     isViewing : false ,
     isEditing : false ,
     areRepliesLoaded : false ,
     numOfReplies : 0 ,
     replies : [],
     createdDate : null,
     modifiedDate : null,
     parentCommentId : null
   }

   @Input()
   comment : (taskComment & CommentState)


   constructor(private  commentService : CommentService ,
               private  _toastr  : ToastrService) {
   }
    ngOnInit(): void {

     this.newComment = {
       ...this.newComment ,
       taskId  : this.taskId
     }

     this.commentService.startConnection(this.taskId);

     this.getCommentsByTaskId();
   }

   ngAfterViewInit() {
     this.newComment.parentCommentId = this.comment?.parentCommentId;
   }

   resetNewReply(){
     this.newComment = {
       content : "" ,
       author : {
         DisplayEmail : "" ,
         email : " "
       },
       connectionId : "",
       isNew : true ,
       isReplying : false ,
       isEditing : false ,
       isViewing : false ,
       areRepliesLoaded : false ,
       numOfReplies : 0 ,
       replies : [] ,
       createdDate : null ,
       modifiedDate  : null ,
       taskId : this.taskId
     }
   };

   submitReply() {
     // this.isSubmitting = true; // Add this property to your component


     let res = this.commentService.create(this.newComment) ;
     res.subscribe(comment => {
       this.newComment = comment;

      this._toastr.success("Posted Successfully.");
       // this.isSubmitting = false;

     });

     let res2 = this.commentService.getReplies(this.comment.parentCommentId!);
     res2.subscribe(
       replies => {
         this.comment.replies = replies;
         this.comment.numOfReplies = replies.length;
         this.comment.isReplying = false;
         this.comment.isViewing = true;
         this.comment.areRepliesLoaded = true;

       } ) , (err:any)=> {
       console.log(err);
       this.isSubmitting = false;

     };
     this.resetNewReply();
   }


  getCommentsByTaskId(){
    this.commentService.getReplies(this.taskId).subscribe(res => {
      this.comments = res;
      console.log(res);
    });
  }




}
