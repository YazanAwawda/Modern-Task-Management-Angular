import {Injectable, InjectionToken} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  commentAdded,
  CommentState,
  editComment,
  getComment,
  taskComment,
  uploadComment
} from "../../Models/Comment/comment.model";
import {catchError, map, Observable, Subscriber, throwError} from "rxjs";
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions,
  LogLevel
} from '@microsoft/signalr';
import {Router} from "@angular/router";
import {setDisplayName} from "../../Models/User/User";
import {AuthenticationService} from "../auth-service/auth.service";

export const TASK_ID_TOKEN = new InjectionToken<number>('task_id_token');

@Injectable()
export class CommentService {


  private  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json',
      'Accept' : 'application/json'
    })
  };



   private  hubConnection : HubConnection ;
   private  connectionId : string ;

  comment : (taskComment & CommentState) ;

   public submitComment : Observable<commentAdded> =
     new Observable<commentAdded>(e => this.emitter = e);
   public emitter : Subscriber<commentAdded>;


    constructor(private  http: HttpClient ,
                private  router : Router,
                private authService: AuthenticationService)
    {
      this.httpOptions.headers.set("Authorization",this.authService.getToken())
      this.startConnection();
      this.addSubmitCommentListener();
    }

    public  startConnection = (taskId ?: number) => {
      let token = this.authService.getToken()
      this.hubConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Trace)
        .withUrl(`https://localhost:7011/commentsHub?taskId=${taskId}`,{
           skipNegotiation: true,
           transport: HttpTransportType.WebSockets,
           logger: LogLevel.Debug,
           accessTokenFactory(): string | Promise<string> {
            return token
          },
          headers : {
            'Content-Type':'application/json',
            'Accept' : 'application/json',
            "Authorization" : token

          }
        })
        .withAutomaticReconnect()
        .build();

      this.hubConnection.start()
        .then(()=> {
          this.hubConnection.invoke("GetConnectionID").then((connectionId:any) => {
            console.log("Connection ID: " + connectionId);
            this.connectionId = connectionId;
          });
         console.log("Connection started");
        })
        .catch(err => console.error('Error while starting connection: ' +err))

    }



       private  addSubmitCommentListener = () => {


       this.hubConnection.on('submitTask' ,(res) => {

       let comment = <(taskComment & CommentState)> res ;
       if(comment.connectionId != this.connectionId)

       {
         let temp = comment;

         while (temp.replies && temp.replies.length > 0 ){

           // setDisplayName(temp.author!);

           temp.isViewing = true;
           temp.areRepliesLoaded = true

           let index = 0 ;

           for(let i = 0 ; i < temp.replies.length; i++) {

             let c :(taskComment & CommentState)  = temp.replies[i];

             // setDisplayName(c.author!);

             if(c.connectionId == temp.connectionId){

               index = i ;
             }
             temp = temp.replies[index];
           }

           temp.isNew = true ;

           // setDisplayName(temp.author!);

           temp.isViewing = true;

           temp.areRepliesLoaded = true;

           let  output : commentAdded = {
             id : temp.id ,
             commentUser : comment
           };

           this.emitter.next(output);
         }
       }

      });

    }


    create(comment : (taskComment & CommentState)):Observable<(taskComment & CommentState) | any>  {
      comment.connectionId = this.connectionId ;
      return this.http.post("https://localhost:7011/api/Tasks/submit-comment" , comment , this.httpOptions)
        .pipe(map(res => {
          let comment = <(CommentState & taskComment)>res ;
          // setDisplayName(comment.author!);
          return comment ;
        }),catchError((err : any):any=>{
          let errorMessage= 'Unknown error!';

          if(err.error instanceof  ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${err.error.message}`;
          } else  {
            // Server-side errors
            if(err.status == 401 ){
            this.router?.navigate([''])
            }
          }
          errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`
           return throwError(errorMessage);
         }));
    }

    edit(comment:editComment) : Observable<editComment> {
      let formData = new FormData();
      formData.append('Id' , comment.id.toString());
      formData.append('Content',comment.content);

      return this.http.patch<editComment>("https://localhost:7011/api/Comment" + '/' , formData)
    }

   delete(commentId:number){
      return this.http.delete("https://localhost:7011/api/Comment" + '/' + commentId , this.httpOptions).pipe(
        map(res => {
        return res;
        })
      );
   }

   getReplies(taskId:number) :Observable<getComment[] | any>{
      return this.http.get<getComment[]>("https://localhost:7011/api/Comment" + '/' + taskId , this.httpOptions)
        .pipe(map(res => {
          let comments = <(taskComment[] & CommentState[])> res;
          comments.forEach((comment) => {
          // setDisplayName(comment.author!)
            comment.replies = [];
          });
          return comments;
        }))
   }

   save(comment : uploadComment){

    let  formData  = new FormData();

    formData.append("OwnerId" , comment.OwnerId.toString());

    comment.File.forEach((file ,index) => {
      formData.append(`File[${index}]` , file);
    });
    this.http.post("https://localhost:7011/api/Comment",formData)
   }
}
