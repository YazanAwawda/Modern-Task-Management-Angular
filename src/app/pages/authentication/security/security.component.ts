import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/auth-service/auth.service";
import {ResetPassword} from "../../../Models/User/User";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements  OnInit {

  formReset : FormGroup;
  formForget : FormGroup;

  constructor(private  fb : FormBuilder ,
              private  userService : AuthenticationService) {
  }
  ngOnInit(): void {

    this.formReset = this.fb.group({
      email : this.fb.control(''),
      newPassword : this.fb.control('' ),
      token : this.fb.control('')
    });

    this.formForget = this.fb.group({
      email1 : this.fb.control('')
    });
  }

  forgetPassword(){

  let  user : ResetPassword = {
  email : this.formForget.value.email
  }
  this.userService.ResetPassword(user).subscribe(res => {
  console.log(res);
  });
  }

  resetPassword(){

    let  user : ResetPassword = {
      email : this.formReset.value.email ,
      newPassowrd : this.formReset.value.newPassword ,
      token : this.formReset.value.token
    }

    this.userService.ResetPassword(user).subscribe(res => {
      console.log(res);
    });
  }

}
