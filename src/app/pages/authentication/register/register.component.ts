import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../../services/auth-service/auth.service";
import {User, userRegister} from "../../../Models/User/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent implements  OnInit{

  userRegistration !: userRegister ;
  formReg !: FormGroup ;
  constructor(private router: Router , private  form : FormBuilder,
              private  authService : AuthenticationService) {
    localStorage.clear();

  }
  ngOnInit(): void {
    this.formReg = this.form.group({
      uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
   // this.submit();
  }


  get f() {
    return this.formReg.controls;
  }

  get userName_() {
    return this.formReg.get('uname') ;
  }
  get email_(){
    return this.formReg.get('email');
  }
  get password_(){
    return this.formReg.get('password');
  }

  submit() {

    let user : userRegister = {
      email: this.email_?.value,
      password: this.password_?.value,
      userName: this.userName_?.value
    }
    this.authService.On_Register(user).subscribe(()=> {
    this.userRegistration  = user ;
    console.log(user);
})
    // console.log(this.form.value);
    this.router?.navigate(['/dashboard']);
  }


}
