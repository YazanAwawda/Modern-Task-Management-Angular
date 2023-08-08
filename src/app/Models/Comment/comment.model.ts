import {emp} from "../User/User";

export interface editComment {
    id : number ,
    content  :string
}

export  interface  getComment {

  content: string,
  parentCommentId: number,
  replies: [],
  taskId: number,
  attachments: [],
  id: number
}

export interface  deleteComment {
    id : number
}

export  interface  uploadComment {
    OwnerId:number ,
    File : string[]
}

export interface  downloadComment {
    commentId : number ,
    attachmentId:number
}

export interface  taskComment {
     id ?: number ;
     content: string,
     parentCommentId ?: number | null,
     author ?: emp
     taskId ?: number,
     replies : taskComment[] ;
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
  id ?: number ,
  commentUser  ?: (taskComment  & CommentState)
}

export  const  findReplayInComment  = (id: number, comment: (CommentState & taskComment) ) : (CommentState & taskComment) | null  => {
  if (!comment || !comment.replies)
    return null;

  let result1 = comment.replies.find(r => r && r.id == id)!;
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
          let orgReply  = replies.find(r => r.id == newReply.id)!;
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
