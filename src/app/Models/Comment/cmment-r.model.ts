
export  interface  SubmitComment {
   id?:number ;
   content: string,
   parentCommentId: number  | null,
   taskId?: number,
   connectionId ?: string
}

export enum ActiveCommentTypeEnum {
  replying = 'replying',
  editing = 'editing',
}

export interface ActiveCommentInterface {
  id ?: number;
  type ?: ActiveCommentTypeEnum;
}
