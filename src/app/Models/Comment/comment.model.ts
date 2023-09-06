import {emp} from "../User/User";
import {Observable} from "rxjs";

export interface editComment {
    id ?: number | undefined ,
    content  : string | null
}

export  interface  getComment {

  content : string,
  parentCommentId? : number,
  replies ?: getComment[] | undefined,
    taskId ?: number,
    username: string,
    createdAt: Date,
    lastUpdatedAt: Date,
  attachments ?: commentAttachment[],
  id : number
  showEdit ?: boolean
}

export interface commentAttachment {
    fileName: string,
    fileType:string,
    fileSize: string,
    id : number ;
}
export interface  deleteComment {
    id : number
}

export  interface  uploadFileComment {
    OwnerId : number ,
    File : File
}
export  interface  uploadFilesComment {
    OwnerId:number | null | undefined ,
    File : File[]
}

export interface  downloadCommentAttachment {
    commentId : number ,
    attachmentId:number
}
export interface  removeCommentAttachment {
    commentId : number ,
    attachmentId:number
}
export interface  taskComment {
     id ?: number  | null;
     content: string,
     parentCommentId ?: number | null,
     author ?: emp
     taskId ?: number,
     replies ?: (taskComment & CommentState) [] | undefined | any ;
}

export interface CommentState extends  taskComment {
    connectionId ?: string
    isNew ?: boolean;
    isReplying ?: boolean;
    isViewing ?: boolean;
    isEditing ?: boolean;
    areRepliesLoaded ?: boolean;
    numOfReplies ?: number;
    createdDate ?: Date | undefined | null;
    modifiedDate ?: Date | undefined | null;
}

export interface  commentAdded {
  id ?: number | null |undefined ,
  commentUser  ?: (taskComment  & CommentState)
}

export  const  findReplayInComment  = (id: number, comment: (CommentState & taskComment) ) : (CommentState & taskComment) | null  => {
  if (!comment || !comment.replies)
    return null;

  let result1 = comment.replies.find((r:any) => r && r.id == id)!;
  if (result1)
    return result1;
  else {
    for (let i = 0; i < comment.replies.length; i++) {
      let reply :taskComment = comment.replies[i];
      let result2 = findReplayInComment(id, reply);
      if (result2)
        return result2;
    }
    return null;
  }
}

export  const mergeNewComment = (orgComment : (CommentState & taskComment),
                                 newComment : (CommentState & taskComment)) : (CommentState & taskComment) => {
  if (orgComment.id == newComment.id) {
    let isNew = orgComment.isNew;
    let isReplying = orgComment.isReplying;
    let isViewing = orgComment.isViewing;
    let isEditing = orgComment.isEditing;
    let areRepliesLoaded = orgComment.areRepliesLoaded;
    let numOfReplies = orgComment.numOfReplies;
    let replies = orgComment.replies.slice();
    if (newComment.isNew)
      isNew = true;
    if (newComment.isViewing)
      isViewing = true;

    orgComment = newComment;

    orgComment.isNew = isNew;
    orgComment.isReplying = isReplying;
    orgComment.isViewing = isViewing;
    orgComment.isEditing = isEditing;

    if (areRepliesLoaded) {
      if (newComment.areRepliesLoaded) {
        orgComment.replies.forEach((newReply : (taskComment)) => {
          let orgReply  = replies.find((r:any) => r.id == newReply.id)!;
          if (orgReply)
            newReply = mergeNewComment(orgReply, newReply);
        });
      }
      else {
        orgComment.numOfReplies = numOfReplies;
        orgComment.replies = replies;
      }
    }
  }

  return orgComment;
}
