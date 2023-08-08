import { Component } from '@angular/core';
import {User} from "../../../Models/User/User";
import {AuthenticationService} from "../../../services/auth-service/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  users !: User  | any;
  userFormGroup !: FormGroup<any> ;

  constructor(private  authService : AuthenticationService ,
              private  fb :  FormBuilder ,
              private  router : Router ) {

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
        if(this.users != null) {
          localStorage.setItem('token' , this.users.token);
          this.router?.navigate(['/ui-components/project-list']);
          this.authService.updateMenu.next();
        }else {
          alert('Login Failed')
        }
      });
    }


  }
}
