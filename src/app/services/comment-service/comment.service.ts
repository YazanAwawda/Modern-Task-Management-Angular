import {Injectable, InjectionToken} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {
  commentAdded,
  CommentState,
  editComment,
  getComment,
  taskComment,
    uploadFileComment
} from "../../Models/Comment/comment.model";
import {
    BehaviorSubject,
    catchError,
    concatMap,
    interval,
    map,
    Observable,
    Subject,
    Subscriber,
    switchMap,
    throwError
} from "rxjs";
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions,
  LogLevel
} from '@microsoft/signalr';
import {Router} from "@angular/router";
import {AuthenticationService} from "../auth-service/auth.service";
import {FileUploadService} from "../file-service/file.service";


@Injectable()
export class CommentService {


  private  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json',
      'Accept' : 'application/json'
    })
  };



   public  hubConnection : HubConnection   ;
   public  connectionId : string ;


   public submitComment : Observable<commentAdded> =
     new Observable<commentAdded>(e => this.emitter = e);
   public emitter : Subscriber<commentAdded>;


  public  commentSubject : BehaviorSubject<getComment[]> = new BehaviorSubject<getComment[]>([]);
  public  comments$ : Observable<getComment[]> = this.commentSubject.asObservable();


  public subject = new Subject();

    constructor(private  http: HttpClient ,
                private  router : Router,
                private  fileService : FileUploadService,
                private authService: AuthenticationService)
    {
      this.httpOptions.headers.set("Authorization",this.authService.getToken())
    }

    public  startConnection = (taskId: number) => {
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

      this.hubConnection.start().then(value => {
        this.addSubmitCommentListener();
      })
        .catch(err => console.error('Error while starting connection: ' + err));
    }





       private  addSubmitCommentListener = () => {


       this.hubConnection.on('GetCommentsForTask' ,(res) => {
        console.log(res);

       let comment = <(taskComment & CommentState & getComment)> res ;
         this.commentSubject.next(res)

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
             id : temp.id! ,
             commentUser : comment
           };

           this.emitter.next(output);
         }
       }

      });

    }


    stopConnection() :any {

       console.log('Stopping');
       this.hubConnection.stop()
         .then(value => console.log(value))
         .catch(reason => console.log(reason));

    }


    uploadAttachmentFileComment(commentFile : uploadFileComment) : Observable<HttpEvent<any>>{
        let formData: FormData = new FormData();
        formData.append('OwnerId', commentFile.OwnerId.toString());
        formData.append('File', commentFile.File);

        const reqPost =
            this.http.post("https://localhost:7011/api/Comment/Upload", formData,
                {
                    reportProgress: true,
                    observe: "events"
                });

        return reqPost.pipe(
            map(res => {
                return res;
            }))
    }
    create(comment : (taskComment & CommentState) ):
        Observable<(taskComment & CommentState) | any | HttpEvent<any> >  {

        // let  issuesList: any[] = [];

      return this.http.post("https://localhost:7011/api/Tasks/submit-comment" , comment , this.httpOptions)
        .pipe(map(res => {
       return  <(CommentState & taskComment)>res ;
          // setDisplayName(comment.author!);
        }),
        //     concatMap((val : any ) => {
        //         for (let item of val.body) {
        //             issuesList.push(item);
        //         }
        //       return this.uploadAttachmentFileComment(commentFile)
        //),map(() => {}) }

            catchError((err : any):any=>{
          let errorMessage= 'Unknown error!';

          if(err.error instanceof  ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${err.error.message}`;
          } else  {
            // Server-side errors
            if(err.status == 401 ){
            this.router?.navigate(['/authentication/login'])
            }
          }
          errorMessage = `Error Code: ${err.status}\n Message: ${err.message}`
           return throwError(errorMessage);
         }));
    }

    edit(comment:editComment) : Observable<editComment> {
      return this.http.patch<editComment>("https://localhost:7011/api/Comment",comment)
    }

   delete(commentId:number){
      return this.http.delete("https://localhost:7011/api/Comment" + '/' + commentId , this.httpOptions).pipe(
        map(res => {
        return res;
        })
      );
   }

   getReplies(taskId ?:number ) :Observable<getComment[] | any>{
      return this.http.get<getComment[] | any>("https://localhost:7011/api/Comment" + '/' + taskId , this.httpOptions)
        .pipe(map(res => {
          let comments = <(taskComment[] & CommentState[])> res;
          comments.forEach((comment) => {
          // setDisplayName(comment.author!)
         //   comment.replies = [];
          });
          return comments;
        }))
   }






    handelWindowLoad(val ?: any){
      this.subject.next(val);
    }


}
