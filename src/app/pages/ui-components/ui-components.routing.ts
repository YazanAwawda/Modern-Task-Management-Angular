import { Routes } from '@angular/router';
import { TeamListComponent } from '../TeamComponents/team-list/team-list.component';
import {CreateTeamComponent} from "../TeamComponents/create-team/create-team.component";
import {ListProjectsComponent} from "../ProjectComponent/list-projects/list-projects.component";
import {CreateProjectComponent} from "../ProjectComponent/create-project/create-project.component";
import {ProjectDetailsComponent} from "../ProjectComponent/project-details/project-details.component";
import {CreateTaskComponent} from "../TaskComponent/create-task/create-task.component";
import {ViewTaskComponent} from "../TaskComponent/view-task/view-task.component";
import {ViewTasksOfProjectComponent} from "../TaskComponent/view-tasks-of-project/view-tasks-of-project.component";
import {SidenavTaskComponent} from "../TaskComponent/sidenav-task/sidenav-task.component";
import {AssignProjectTeamComponent} from "../ProjectComponent/assign-project-team/assign-project-team.component";
import {TeamDetailsComponent} from "../TeamComponents/team-details/team-details.component";
import {AssigneTaskComponent} from "../TaskComponent/assigne-task/assigne-task.component";
import {EditProjectComponent} from "../ProjectComponent/edit-project/edit-project.component";
import {EditTaskComponent} from "../TaskComponent/edit-task/edit-task.component";
import {EditTeamComponent} from "../TeamComponents/edit-team/edit-team.component";
import {TaskDetailsComponent} from "../TaskComponent/task-details/task-details.component";
import {ReplyFormComponent} from "../CommentsComponent/reply-form/reply-form.component";

// ui
// import { AppBadgeComponent } from './badge/badge.component';
// import { AppChipsComponent } from './chips/chips.component';
// import { AppListsComponent } from './lists/lists.component';
// import { AppMenuComponent } from './menu/menu.component';
// import { AppTooltipsComponent } from './tooltips/tooltips.component';

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
        component : CreateTeamComponent
      },
      {
        path : 'project-list' ,
        component : ListProjectsComponent
      },
      {
        path:'create-project' ,
        component : CreateProjectComponent
      }
      ,
      {
        path:'project/:id' ,
        component: ProjectDetailsComponent
      }
      , {
        path : 'create-task' ,
        component : CreateTaskComponent
      },
      {
        path : 'view-task/:id'
        ,component : ViewTaskComponent
      } ,
      {
        path : 'all-tasks/:id',
       component : ViewTasksOfProjectComponent
      } ,
      {
        path : 'assignation/:id' ,
        component  : AssignProjectTeamComponent
      } ,
      {
          path : 'team-details/:id'
        , component : TeamDetailsComponent
      }
      , {
         path: 'task-assignation',
        component : AssigneTaskComponent
      } ,
      {
        path:'edit-project/:id' ,
        component : EditProjectComponent
      },
      {
        path : 'edit-task/:id',
        component : EditTaskComponent
      },
       {
        path : 'edit-team/:id',
        component : EditTeamComponent
        },
        {
        path : 'task-details/:id',
        component : TaskDetailsComponent
        },
      {
        path : 'comment-form/:id',
        component : ReplyFormComponent
      }
    ],
  },
];
