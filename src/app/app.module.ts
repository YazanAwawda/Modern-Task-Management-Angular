import {CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

// Icons & Animated Icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
//Import all material modules
import { MaterialModule } from './material.module';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';

//Team Component
import { TeamListComponent } from './pages/TeamComponents/team-list/team-list.component';
import { TeamService } from './services/team-service/team.service';
import {CreateTeamComponent} from "./pages/TeamComponents/create-team/create-team.component";
import {NgOptimizedImage} from "@angular/common";

//Project Component
import {ListProjectsComponent} from "./pages/ProjectComponent/list-projects/list-projects.component";
import {ProjectService} from "./services/project-service/project.service";
import {PagingFooterComponent} from "./shared/paging-footer/paging-footer.component";
import {PagingHeaderComponent} from "./shared/paging-header/paging-header.component";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {AuthenticationService} from "./services/auth-service/auth.service";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {CreateProjectComponent} from "./pages/ProjectComponent/create-project/create-project.component";
import { ToastrModule } from 'ngx-toastr';
import {ProjectItemComponent} from "./pages/ProjectComponent/project-item/project-item.component";
import {ProjectDetailsComponent} from "./pages/ProjectComponent/project-details/project-details.component";
import {TaskListComponent} from "./pages/TaskComponent/task-list/task-list.component";
import {CreateTaskComponent} from "./pages/TaskComponent/create-task/create-task.component";
import {PipeModule} from "./PipeModule/pipe.module";
import {TaskServices} from "./services/task-service/task-service";
import {ViewTaskComponent} from "./pages/TaskComponent/view-task/view-task.component";
import {ViewTasksOfProjectComponent} from "./pages/TaskComponent/view-tasks-of-project/view-tasks-of-project.component";
import {ToggleComponent} from "./pages/toggle/toggle.component";
import {SidenavTaskComponent} from "./pages/TaskComponent/sidenav-task/sidenav-task.component";
import {AssignProjectTeamComponent} from "./pages/ProjectComponent/assign-project-team/assign-project-team.component";
import {TeamDetailsComponent} from "./pages/TeamComponents/team-details/team-details.component";
import {AssigneTaskComponent} from "./pages/TaskComponent/assigne-task/assigne-task.component";
import {EditProjectComponent} from "./pages/ProjectComponent/edit-project/edit-project.component";
import {EditTaskComponent} from "./pages/TaskComponent/edit-task/edit-task.component";
import {EditTeamComponent} from "./pages/TeamComponents/edit-team/edit-team.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DataService} from "./services/data-service/data.service";
import {TaskDetailsComponent} from "./pages/TaskComponent/task-details/task-details.component";
import {ReplyFormComponent, TypeofPipe} from "./pages/CommentsComponent/reply-form/reply-form.component";
import {CommentService} from "./services/comment-service/comment.service";
import {PermissionService} from "./services/permission-service/permission.service";
import {ReplyTemplateComponent} from "./pages/CommentsComponent/reply-form/reply-template/reply-template.component";
import {AccessDeniedComponent} from "./layouts/access-denied/access-denied.component";
import {hasChildAccessPage} from "./Gurad/global-route-guard";


import {TaskPriorityService} from "./services/task-priority-service/task-priority";
import {TaskTypeService} from "./services/task-type-service/task-type";
import {TaskTypeComponent} from "./pages/TaskComponent/task-type/task-type/task-type.component";
import {TaskPriorityComponent} from "./pages/TaskComponent/task-priority/task-priority/task-priority.component";
import {UploadMultipleFilesComponent} from "./pages/upload-multiple-files/upload-multiple-files.component";
import {FileUploadService} from "./services/file-service/file.service";
import {ProfileUserComponent} from "./pages/ProfileComponent/profile-user/profile-user.component";
import {UserRoleComponent} from "./pages/RoleComponent/user-role/user-role.component";
import {RoleService} from "./services/role-service/role-service";
import {TreeviewModule} from "@charmedme/ngx-treeview";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {ProfileService} from "./services/profile-service/profile-service";
import {UpdateRoleComponent} from "./pages/RoleComponent/update-role/update-role.component";
import {AddRoleComponent} from "./pages/RoleComponent/add-role/add-role.component";
import {ListUserPermissionComponent} from "./pages/RoleComponent/list-user-permission/list-user-permission.component";
import {TaskFlowService} from "./services/task-flow-service/task-flow";
import 'datatables.net-fixedheader-bs5'
import { NgFixedHeaderModule } from 'angular-fixed-header-table';
import {NotificationService} from "./services/notification-service/notification-service";
import {ReassingeEmployeeComponent} from "./pages/TaskComponent/reassinge-employee/reassinge-employee.component";
import {ModalModule} from "ngx-bootstrap/modal";
import {ListUserComponent} from "./pages/RoleComponent/list-user/list-user.component";
import {SecurityComponent} from "./pages/authentication/security/security.component";


export const INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UserRoleComponent),
  multi: true,
};
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    TeamListComponent,
    CreateTaskComponent,
    CreateTeamComponent,
    ListProjectsComponent
    ,PagingFooterComponent
    ,PagingHeaderComponent
    ,CreateProjectComponent ,
    ProjectItemComponent,
    ProjectDetailsComponent ,
    TaskListComponent,
    ViewTaskComponent,
    ViewTasksOfProjectComponent,
    CreateTaskComponent,
    EditProjectComponent,
    EditTaskComponent,
    SidenavTaskComponent,
    ToggleComponent,
    AssignProjectTeamComponent,
    TeamDetailsComponent ,
    AssigneTaskComponent,
    EditTeamComponent,
    TaskDetailsComponent,
    ReplyFormComponent ,
    ListUserComponent ,
    ReplyTemplateComponent,
    AccessDeniedComponent,
    TaskTypeComponent,
    TaskPriorityComponent,
    UploadMultipleFilesComponent,
    ProfileUserComponent,
    UserRoleComponent,
    AddRoleComponent,
    ListUserPermissionComponent,
    ReassingeEmployeeComponent,
    TypeofPipe,
    UpdateRoleComponent, SecurityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgFixedHeaderModule,
    MaterialModule,
    DropDownListModule,
    TablerIconsModule.pick(TablerIcons),
    NgOptimizedImage,
    MatDialogModule,
    PaginationModule,
    AutocompleteLibModule,
    PipeModule.forRoot(),
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    NoopAnimationsModule ,
    TreeviewModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],

  providers:[
       TeamService ,
       ProjectService,
       TaskServices ,
       DataService,
       FileUploadService,
       PermissionService ,
       TaskPriorityService ,
       TaskTypeService,
       TaskFlowService,
       ProfileService,
       RoleService,
       NotificationService,
       CommentService
    ,{ provide: MatDialogRef, useValue: {}}
      ,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    AuthenticationService , {
      provide : HTTP_INTERCEPTORS ,
      useClass : AuthInterceptor ,
      multi : true
    } ,
    INPUT_VALUE_ACCESSOR

  ],
  entryComponents:[CreateTaskComponent , ReassingeEmployeeComponent]
  , schemas :  [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AppModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}

