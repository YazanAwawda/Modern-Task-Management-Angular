import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {
  CommentState,
  editComment,
  getComment,
  taskComment,
  uploadFileComment, uploadFilesComment
} from "../../../../Models/Comment/comment.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommentService} from "../../../../services/comment-service/comment.service";
import {ToastrService} from "ngx-toastr";
import {TaskComment} from "../../../../Models/Tasks/task.model";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-reply-template',
  templateUrl: './reply-template.component.html',
  styleUrls: ['./reply-template.component.scss']
})
export class ReplyTemplateComponent {

  selectedFiles : uploadFilesComment;
  progressInfos: any[] = [];
  message: string[] = [];


  @Input() taskId: number;


  @Input()  comments: Observable<getComment[]> | undefined;

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



    this.getCommentsByTaskId();


    this.editFormGroup = this.fb.group({
      content: [' ']
    });

  }

  commentFileSelected(event:any){
    this.message  = [] ;
    this.progressInfos = [] ;
    this.selectedFiles.File = event.target.files ;
    if(this.selectedFiles.File.length === 0 ) {
      this.selectedFiles.File = event.target.files[0];
    }
  }



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

      })

  }


  submitReply() {
    let taskComment = <TaskComment>{
      taskId: this.taskId,
      content: this.newComment.content
    }
    if(taskComment) {
      let res = this.commentService.
      create(taskComment );
      res.subscribe(() => {
      this._toastr.success("Uploaded comment successfully.")
      });

    }


  }


  getCommentsByTaskId() {
    this.commentService.getReplies(this.taskId).subscribe((res: getComment[]) => {
      this.commentService.commentSubject.next(res);
      console.log(res);
    });
  }


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
  // uploadFilesComment(){
  //   this.message = [];
  //   if(this.selectedFiles) {
  //     for (let i = 0; i < this.selectedFiles.File.length; i++) {
  //       if(this.selectedFiles.File.length > 0) {
  //         // let file :uploadFileComment  = {
  //         //   File : this.selectedFiles.File[i] ,
  //         //   OwnerId :this.newComment.id!
  //         // }
  //         this.submitReply(i );
  //       }
  //       if(this.selectedFiles.File.length === 0 ) {
  //         // let file : uploadFileComment = {
  //         //   File : this.selectedFiles.File[0] ,
  //         //   OwnerId : this.newComment.id!
  //         // }
  //         this.submitReply(i );
  //       }
  //     }
  //   }
  // }

}
