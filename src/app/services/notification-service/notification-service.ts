import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Notification} from "../../Models/Notifications/notification";
import * as signalR from '@microsoft/signalr'
import {AuthenticationService} from "../auth-service/auth.service";
import {LogLevel} from "@microsoft/signalr";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";


@Injectable({
providedIn : 'root'
})

export  class NotificationService {

    public  hubConnection : signalR.HubConnection | undefined ;
    public  message : string | undefined ;
    public  notification : Notification[] ;
    public notifications$ : BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);
    public connectionId: string; // Store the connection ID here

    private  httpOptions = {
        headers : new HttpHeaders({
            'Content-Type':'application/json',
            'Accept' : 'application/json'
        })
    };

    constructor(private  http : HttpClient ,
                private  toasty : ToastrService ,
                private  authService : AuthenticationService) {
        this.httpOptions.headers.set("Authorization",this.authService.getToken());
        this.getNotifications();

    }

public  getNotifications(){
return this.http.get<Notification[]>("https://localhost:7011/api/Notification").
subscribe(res => {
    this.notification = res;
    this.notifications$.next(res)
    console.log(res);
});
}

public  getConnectionOnNotifications(){
    let token = this.authService.CurrentUser.token
    this.hubConnection = new signalR.HubConnectionBuilder()
        .configureLogging(LogLevel.Trace)
       .withUrl(`https://localhost:7011/notificationHub` , {
           skipNegotiation : true,
           transport : signalR.HttpTransportType.WebSockets,
           logger: LogLevel.Debug,
           accessTokenFactory(): string | Promise<string> {
               return token
           },
           headers : {
               'Content-Type':'application/json',
               'Accept' : 'application/json',
               "Authorization" : token

           }
       }).withAutomaticReconnect().build();

    this.hubConnection.start().then(() => {
        this.connectionId = this.hubConnection.connectionId; // Store the connection ID
        localStorage.setItem(this.connectionId, this.hubConnection.connectionId);
        this.ReceiveNotification();
    })
        .catch(err => console.error('Error while get notifications: ' +err));

}

  private   ReceiveNotification = () => {

        this.hubConnection.on('ReceiveNotification',
            (msg : Notification )  => {
            this.notification.push(msg);
                this.notifications$.next(this.notification)
           this.toasty.success(msg.message);
        });

}


    stopConnection() :any {
        console.log('Stopping');
        this.hubConnection.stop()
            .then(value => console.log(value))
            .catch(reason => console.log(reason));
    }





}
