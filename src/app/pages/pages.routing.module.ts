import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import {isUserLoggedInGuard} from "../Gurad/auth-guard";

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    canActivate : [
      isUserLoggedInGuard

    ] ,
    data: {
      title: 'Starter Page',
    },
  },
];
