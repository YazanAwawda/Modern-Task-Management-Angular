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
  countMsg : number ;
  constructor(public dialog: MatDialog ,
              public authService : AuthenticationService,
              public  notificationService :  NotificationService) {}


  getAllMessages(){
    this.notificationService.notifications$.subscribe(res => this.countMsg = res.length);
  }

  ngOnInit(): void {
    this.getAllMessages();
  }


}
