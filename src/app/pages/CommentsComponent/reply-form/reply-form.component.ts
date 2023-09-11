import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {CommentService} from "../../../services/comment-service/comment.service";
import {ToastrService} from "ngx-toastr";
import {
  CommentState,
  editComment,
  getComment,
  taskComment,
  uploadFileComment,
  uploadFilesComment
} from "../../../Models/Comment/comment.model";
import {FormBuilder, FormGroup} from '@angular/forms';
import {TaskComment} from "../../../Models/Tasks/task.model";
import {isObservable, Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";


@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.scss']
})

export class ReplyFormComponent implements OnInit {

  selectedFiles : uploadFilesComment;
  progressInfos: any[] = [];
  message: string[] = [];
  fileComment  : uploadFileComment ;


  @Input() taskId: number;


  @Input()  comments: Observable<getComment[]> | undefined;
  @Input()  comment: getComment;
  @Input()  replies: getComment[] | undefined;

  selectedComment: { id: number | any, content: string | any } | null = null;

  updateComment: editComment;
  editFormGroup: FormGroup;

  hiddenComment: { [key: number]: boolean } = {}; // Use an object to keep track of hidden comments

  hiddenReply: { [key: number]: boolean } = {};

  public newComment: (taskComment & CommentState) = {
    content: "",
    author: {
      DisplayEmail: "",
      email: " "
    },
    isNew: true,
    isReplying: false,
    isViewing: false,
    isEditing: false,
    areRepliesLoaded: false,
    replies: [],
    createdDate: null,
    modifiedDate: null,
    parentCommentId: null
  }



  showEdit = false;
  selectedCommentId: number | null = null;
  commentContent: string | null = null;

  showReplies: boolean = true;
  constructor(private commentService: CommentService,
              private fb: FormBuilder,
              private _toastr: ToastrService) {
    this.selectedFiles = {
      OwnerId : this.newComment.id ,
      File : []
    }
  }

  ngOnInit(): void {

    this.newComment = {
      ...this.newComment,
      taskId: this.taskId
    }

    this.comments = this.commentService.comments$;





    this.editFormGroup = this.fb.group({
      content: [' ']
    });

  }


// commentFileSelected(event:any){
// this.message  = [] ;
// this.progressInfos = [] ;
// this.selectedFiles.File = event.target.files ;
// if(this.selectedFiles.File.length === 0 ) {
//   this.selectedFiles.File = event.target.files[0];
// }
// }

  toggleReplies(id: any) {
    this.selectedCommentId = id;
    this.showReplies = !this.showReplies;
    this.hiddenReply = {}; // Reset hidden comments
    this.hiddenReply[id] = true; // Hide the selected comment
  }

  cancelReply({}: any) {
    this.showReplies = false; // Hide the edit form
    this.hiddenReply = {}; // Reset hidden comments
  }

  postReply(comment?: any) {
    const reply: (taskComment & CommentState) = {
      id: null,
      taskId: this.taskId,
      content: this.editFormGroup.value.content,
      parentCommentId: comment.id
    }
    if(reply)
    this.commentService.create( reply).subscribe(() => {
      this._toastr.success("Replied Successfully.")
    });

  }


  submitReply(id:number ) {
    let taskComment = <TaskComment>{
      taskId: this.taskId,
      content: this.newComment.content
    }
    if(taskComment) {
      let res = this.commentService.
      create(taskComment );
      res.subscribe( () => {

      });

    }

    //   let res = this.commentService.
    //   create(file ,taskComment );
    //   res.subscribe(comment => {
    //     this.newComment = comment;
    //
    //     this._toastr.success("Posted Successfully.");
    //
    //
    // });

  }


// uploadFilesComment(){
//     this.message = [];
//     if(this.selectedFiles) {
//       for (let i = 0; i < this.selectedFiles.File.length; i++) {
//        if(this.selectedFiles.File.length > 0) {
//          let file :uploadFileComment  = {
//            File : this.selectedFiles.File[i] ,
//            OwnerId : this.newComment.id!
//          }
//          this.postReply(i , file);
//          this.submitReply(i , file);
//       }
//        if(this.selectedFiles.File.length === 0 ) {
//          let file : uploadFileComment = {
//             File : this.selectedFiles.File[0] ,
//             OwnerId : this.newComment.id!
//          }
//          this.postReply(i , file);
//          this.submitReply(i , file);
//        }
//       }
//     }
// }


  toggleEdit({id, content}: { id: number, content: string } | getComment) {
    this.selectedCommentId = id;
    this.commentContent = content; // Initialize the edited content
    this.selectedComment = {
      id: this.selectedCommentId!,
      content: this.commentContent!
    }
    this.showEdit = true; // Show the edit form
    this.hiddenComment = {}; // Reset hidden comments
    this.hiddenComment[id] = true; // Hide the selected comment
  }

  cancelEdit({}: any) {
    this.showEdit = false; // Hide the edit form
    this.selectedCommentId = null;
    this.commentContent = null;
    this.hiddenComment = {}; // Reset hidden comments
  }


  editComment(comment: any) {

    this.updateComment = {
      id: this.selectedCommentId!,
      content: this.editFormGroup.value.content
    }
    if (this.selectedComment !== comment) {

      let res = this.commentService.edit(this.updateComment);
      res.subscribe(comment => {


          console.log(comment);

          this._toastr.success("Updated successfully.");

          this.showEdit = false;
          this.updateComment.content = this.commentContent;
          this.selectedComment = null;


        }
        , err => {
          console.log('Error editing comment:', err);
        });
    } else {
      this.showEdit = false;
      this.selectedComment = null;

    }
    this.cancelEdit(this.updateComment);
  }


  deleteComment(id: number) {
    let res = this.commentService.delete(id);
    res.subscribe(res => {

      console.log(res);
      this._toastr.error("Deleted Successfully.");

    });
  }


  protected readonly Observable = Observable;
}
@Pipe({
  name: 'typeof'
})
export class TypeofPipe implements PipeTransform {

  transform(value: any): any {
    console.log("Pipe works ", typeof value);
    return isObservable(value);
  }

}
