import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import {AccessDeniedComponent} from "../../layouts/access-denied/access-denied.component";
import {hasChildAccessPage} from "../../Gurad/global-route-guard";

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path : 'access-denied' ,
        component : AccessDeniedComponent
      }
    ],
  },
];
