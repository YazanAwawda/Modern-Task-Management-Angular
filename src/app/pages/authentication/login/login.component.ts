import { Component } from '@angular/core';
import {User} from "../../../Models/User/User";
import {AuthenticationService} from "../../../services/auth-service/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PermissionService} from "../../../services/permission-service/permission.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  users !: User  | any;
  userFormGroup !: FormGroup<any> ;
  isAuth !: boolean ;

  constructor(private  authService : AuthenticationService ,
              private  fb :  FormBuilder ,
              private  toasty : ToastrService ,
              private  permissionService : PermissionService ,
              private  router : Router) {

    localStorage.clear();
  }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      email : [' ']   ,
      password : [ ' '  ]
    });

  }
  get email_() {return this.userFormGroup.get('email') ;}
  get password_() {return this.userFormGroup.get('password');}



  onLogin() : void{
    const loginObj : User = {
      email : this.email_?.value ,
      password : this.password_?.value
    }

    if(this.userFormGroup.valid){
      this.authService.On_Login(loginObj).subscribe((user: any) => {
        this.users = user ;
        this.authService.isAuthenticatedValue = true;
          if(this.users != null || this.authService.isAuthenticated()) {
          localStorage.setItem('token' , this.users.token);
          this.router?.navigate(['/ui-components/project-list']);
          this.authService.updateMenu.next();
          this.toasty.success("Login Successfully");
        }
          this.authService.SaveTokens(this.users);
         this.permissionService.getAllPermission();
      }, err => {
          this.toasty.error("Login Failed , " +
              "Rewrite the right email and password");
        }
      );
    }


  }
}
