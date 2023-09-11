import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";
import {ProfileService} from "../../../services/profile-service/profile-service";
import {GetUser} from "../../../Models/User/User";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements  OnInit {

  userId:string;
  user : GetUser ;
  constructor(private  userService : ProfileService,
              private  activeRoute : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userId = this.activeRoute.snapshot.paramMap.get('userId');
    this.getUserDetails();
  }

  getUserDetails(){
    this.userService.getUser(this.userId).subscribe(res => {
      this.user = res;
    });
  }


}
