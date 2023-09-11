import { Routes } from '@angular/router';
import { TeamListComponent } from '../TeamComponents/team-list/team-list.component';
import {CreateTeamComponent} from "../TeamComponents/create-team/create-team.component";
import {ListProjectsComponent} from "../ProjectComponent/list-projects/list-projects.component";
import {CreateProjectComponent} from "../ProjectComponent/create-project/create-project.component";
import {ProjectDetailsComponent} from "../ProjectComponent/project-details/project-details.component";
import {CreateTaskComponent} from "../TaskComponent/create-task/create-task.component";
import {ViewTaskComponent} from "../TaskComponent/view-task/view-task.component";
import {ViewTasksOfProjectComponent} from "../TaskComponent/view-tasks-of-project/view-tasks-of-project.component";
import {AssignProjectTeamComponent} from "../ProjectComponent/assign-project-team/assign-project-team.component";
import {TeamDetailsComponent} from "../TeamComponents/team-details/team-details.component";
import {AssigneTaskComponent} from "../TaskComponent/assigne-task/assigne-task.component";
import {EditProjectComponent} from "../ProjectComponent/edit-project/edit-project.component";
import {EditTaskComponent} from "../TaskComponent/edit-task/edit-task.component";
import {EditTeamComponent} from "../TeamComponents/edit-team/edit-team.component";
import {TaskDetailsComponent} from "../TaskComponent/task-details/task-details.component";
import {ReplyFormComponent} from "../CommentsComponent/reply-form/reply-form.component";
import {hasChildAccessPage} from "../../Gurad/global-route-guard";
import {TaskPriorityComponent} from "../TaskComponent/task-priority/task-priority/task-priority.component";
import {TaskTypeComponent} from "../TaskComponent/task-type/task-type/task-type.component";
import {UserRoleComponent} from "../RoleComponent/user-role/user-role.component";
import {AddRoleComponent} from "../RoleComponent/add-role/add-role.component";
import {UpdateRoleComponent} from "../RoleComponent/update-role/update-role.component";
import {AppSideRegisterComponent} from "../authentication/register/register.component";
import {ProfileUserComponent} from "../ProfileComponent/profile-user/profile-user.component";

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [

    {
      path:'teams' ,
      component:TeamListComponent
   }
   , {
        path : 'create-team' ,
        component : CreateTeamComponent ,
        canActivate : [hasChildAccessPage] ,
          data: {requiredPermissions: [39]}
      },
      {
        path : 'project-list' ,
        component : ListProjectsComponent ,
         canActivate:[hasChildAccessPage],
          data : {requiredPermissions: [8,9] }

      }
      ,
      {
        path:'create-project' ,
        component : CreateProjectComponent ,
        canActivate :[hasChildAccessPage] ,
        data : {requiredPermissions: [10]}
      }
      ,
      {
        path:'project/:id' ,
        component: ProjectDetailsComponent ,
        canActivate : [hasChildAccessPage] ,
        data : {requiredPermissions: [7] }
      }
      , {
        path : 'create-task' ,
        component : CreateTaskComponent ,
        canActivate : [hasChildAccessPage] ,
        data : {requiredPermissions: [19]}
      },
      {
        path : 'view-task/:id'
        ,component : ViewTaskComponent,
        canActivate : [hasChildAccessPage] ,
        data : {requiredPermissions: [21]}
      } ,
      {
        path : 'all-tasks/:id/:employeeIdAssigned/:projectManagerId/:teamId',
       component : ViewTasksOfProjectComponent,
          canActivate : [hasChildAccessPage] ,
          data : {requiredPermissions: [19,20]}
      } ,
      {
        path : 'assignation/:id' ,
        component  : AssignProjectTeamComponent
      } ,
      {
          path : 'team-details/:id'
        , component : TeamDetailsComponent ,
          canActivate : [hasChildAccessPage] ,
          data : {requiredPermissions: [40]}
      }
      , {
         path: 'task-assignation',
        component : AssigneTaskComponent ,
            canActivate : [hasChildAccessPage] ,
            data : {requiredPermissions: []}
      } ,
      {
        path:'edit-project/:id' ,
        component : EditProjectComponent,
        canActivate: [hasChildAccessPage] ,
        data : {requiredPermissions: [12]}
      },
      {
        path : 'edit-task/:id',
        component : EditTaskComponent,
        canActivate: [hasChildAccessPage],
        data: { requiredPermissions: [28] }
      } ,

       {
        path : 'edit-team/:id',
        component : EditTeamComponent ,
           canActivate : [hasChildAccessPage] ,
           data :{requiredPermissions: [44]}
        },
        {
        path : 'task-details/:id/:employeeIdAssigned/:projectManagerId/:teamId',
        component : TaskDetailsComponent ,
            canActivate : [hasChildAccessPage] ,
            data :{requiredPermissions: [21]}
        },
      {
         path : 'comment-form/:id',
          component : ReplyFormComponent ,
          canActivate : [hasChildAccessPage] ,
          data : {requiredPermissions: [1]}
      } ,
        {
         path : 'task-priority',
         component : TaskPriorityComponent ,
         canActivate : [hasChildAccessPage] ,
         data : {requiredPermissions: [61]}
        }  ,
        {
         path:"task-type" ,
          component:TaskTypeComponent,
          canActivate : [hasChildAccessPage] ,
          data :{requiredPermissions: [58]}
        } ,
        {
            path : "user-role" ,
            component:UserRoleComponent,
            canActivate :[hasChildAccessPage],
            data : {requiredPermissions: [55 ,57]}
        }
        ,{
           path:"add-role" ,
           component : AddRoleComponent ,
        },
        {
            path:"update-role/:roleName" ,
            component : UpdateRoleComponent ,
        },
        {
            path: 'create-user',
            component: AppSideRegisterComponent,
            canActivate : [hasChildAccessPage] ,
            data : {requiredPermissions: [47]}
        },
      {
        path:'user-details/:userId' ,
        component : ProfileUserComponent ,
        canActivate : [hasChildAccessPage] ,
        data : {requiredPermissions: [100]}
      }
    ],
  },
];
