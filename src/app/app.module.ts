import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import {EditReplyComponent} from "./pages/CommentsComponent/edit-reply/edit-reply.component";
import {ReplyFormComponent} from "./pages/CommentsComponent/reply-form/reply-form.component";
import {ReplyListComponent} from "./pages/CommentsComponent/reply-list/reply-list.component";
import {CommentService, TASK_ID_TOKEN} from "./services/comment-service/comment.service";

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
    EditReplyComponent ,
    ReplyFormComponent ,
    ReplyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DropDownListModule,
    TablerIconsModule.pick(TablerIcons),
    NgOptimizedImage,
    MatDialogModule,
    PaginationModule,
    PipeModule.forRoot(),
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    NoopAnimationsModule

  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],

  providers:[
       TeamService ,
       ProjectService,
       TaskServices ,
       DataService,
       CommentService
    ,{ provide: MatDialogRef, useValue: {}},
    { provide: MAT_DIALOG_DATA, useValue: {} },
    AuthenticationService , {
      provide : HTTP_INTERCEPTORS ,
      useClass : AuthInterceptor ,
      multi : true
    }
    // SignalRService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (signalrService: SignalRService) => () => signalrService.initiateSignalrConnection(),
    //   deps: [SignalRService],
    //   multi: true,
    // }
  ],
  entryComponents:[CreateTaskComponent]
  , schemas :  [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AppModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
