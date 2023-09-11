import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {NotificationService} from "../../../services/notification-service/notification-service";
import {Notification} from "../../../Models/Notifications/notification";
import {AuthenticationService} from "../../../services/auth-service/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent  implements  OnInit{
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  msgs : Notification[]  = [];
  countMsg : number ;
  constructor(public dialog: MatDialog ,
              public authService : AuthenticationService,
              private  notificationService :  NotificationService) {}


  getAllMessages(){
    this.msgs = this.notificationService.notification;
    this.countMsg = this.msgs.length;
    this.notificationService.getNotifications();
  }

  ngOnInit(): void {
    this.getAllMessages();
  }


}
