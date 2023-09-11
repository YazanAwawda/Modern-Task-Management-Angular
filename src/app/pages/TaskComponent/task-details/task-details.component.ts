import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {CommentService} from "../../../services/comment-service/comment.service";
import {getComment} from "../../../Models/Comment/comment.model";
import {TaskServices} from "../../../services/task-service/task-service";
import {EditTask, GetTask} from "../../../Models/Tasks/task.model";
import {TaskFlowService} from "../../../services/task-flow-service/task-flow";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../../services/auth-service/auth.service";
import { TeamService } from 'src/app/services/team-service/team.service';
import {GetTeamMembers, TeamMembers } from 'src/app/Models/Team/team.model';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {CreateTaskComponent} from "../create-task/create-task.component";
import {ReassingeEmployeeComponent} from "../reassinge-employee/reassinge-employee.component";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})

export class TaskDetailsComponent implements  OnInit , OnDestroy {

  //Project Manager
  //Team Members
  //Task Manager

  taskId: number;
  attachmentId: number;
  task: GetTask;
  type: string = "Tasks";
  typeId: string = "taskId";
  public taskStatus: string;
  employeeLeaderId: string;
  projectManagerId: string | null;
  teamMembers : GetTeamMembers[];
  teamId : number ;
  constructor(private route: ActivatedRoute,
              private taskFlowService: TaskFlowService,
              private taskService: TaskServices,
              private  toasty : ToastrService ,
              private router: Router ,
              private  dialog : MatDialog ,
              private commentService: CommentService,
              private authService: AuthenticationService) {
  }


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.taskId = +params['id'];
      this.employeeLeaderId = this.route.snapshot.paramMap.get('employeeIdAssigned')!;
      this.projectManagerId = this.route.snapshot.paramMap.get('projectManagerId');
      this.teamId = Number(this.route.snapshot.paramMap.get('teamId'));
      console.log(this.teamId);
      console.log(this.employeeLeaderId, this.projectManagerId);
      this.commentService.startConnection(this.taskId);
      this.commentService.getReplies(this.taskId).subscribe((res: getComment[]) => {
        this.commentService.commentSubject.next(res);
        console.log(res);
      });
    })

    this.getTaskDetails();
    console.log(this.taskStatus);

  }

  getTaskDetails() {
    this.taskService.getTaskByID(this.taskId).subscribe(res => {
      this.task = res;
      this.taskStatus = this.task.currentStatus.name;

      this.progressBarValue = this.task.durationProgress ;
      console.log(this.progressBarValue);
      for(let re of this.task.attachments) {
        this.attachmentId = re.id;
        console.log(this.attachmentId);
      }
      console.log(this.authService.CurrentUser.id);
      console.log(res);
    })
  }

  ngOnDestroy() {
    this.commentService.stopConnection();
  }



  progressBarValue : number  = 0;

  increaseProgress(amount: number) : any {
    amount = this.progressBarValue
    if (this.progressBarValue < 100) {
      this.progressBarValue += 10;
      this.task.durationProgress =  this.progressBarValue ;
      return  this.progressBarValue ;

    }
  }

  decreaseProgress(amount: number) : any {
    amount = this.progressBarValue
    if (this.progressBarValue > 0) {
      this.progressBarValue -= 10;
      this.task.durationProgress =  this.progressBarValue ;
      return  this.progressBarValue
    }
  }

  startTask(id: number) {
    //when task status is new button start is showen to employee only and only employeee click start
    this.taskFlowService.startTask(id).subscribe(res => {
      this.toasty.success("Task is started.")
      this.getTaskDetails();
      console.log(res);
    });
  }

  reopenTask(id: number) {
    this.taskFlowService.reopenTask(id).subscribe(res => {
      this.toasty.success("Task is reopened.")
      this.getTaskDetails();
      console.log(res);
    });
  }

  declineTask(id: number) {
    this.taskFlowService.declineTask(id).subscribe(res => {
      this.toasty.success("Task is declined. ")
      this.getTaskDetails();
      console.log(res);
    });
  }

  resolveTask(id: number) {
    this.taskFlowService.resolveTask(id).subscribe(res => {
      this.toasty.success("Task has been resolved.")
      this.getTaskDetails();
      console.log(res);
    } , error => {
      this.toasty.error( "You are not allowed to view this task");
      this.router?.navigate(['/ui-components/project-list']);
    });
  }




  closeTask(id: number) {
    this.taskFlowService.closeTask(id).subscribe(res => {
      this.toasty.success("Task has been closed.")
      this.getTaskDetails();
      console.log(res);
    });
  }



  changeProgressTask() {

    let taskProgress: EditTask = {
      id: this.taskId,
      name: this.task.name,
      description : this.task.description,
      taskTypeId: this.task.type.id,
      priorityId: this.task.priority.id,
      progress: this.progressBarValue
    }
// Update taskProgress.progress based on conditions
    if (this.progressBarValue > 0) {
      taskProgress.progress = this.increaseProgress(taskProgress.progress);
      this.task.durationProgress = taskProgress.progress;
    }

    if (this.progressBarValue < 100) {
      taskProgress.progress = this.decreaseProgress(taskProgress.progress);
      this.task.durationProgress = taskProgress.progress;
    }
    this.taskService.editTask(taskProgress).subscribe(res => {
      this.task.durationProgress = taskProgress.progress;
      this.toasty.success("Progress Submitted Successfully");
      this.getTaskDetails();
      console.log(res);
    });
  }
   checkForStart(){
    // اظهار زري البداية والحل في حالة المهمة كانت جديدة للتو او في حالة تكليف الموظف بالمهمة بناءا على مقارنة الحالة ومقارنة الموظف المكلف بعمل المهمة مع مدير المشروع والموظف القائد
    return this.authService.CurrentUser.id === this.task.assignedEmployee.id &&
        ( this.task.currentStatus.status === 0 ) ;
   }

  checkForResolve(){
    // اظهار زري البداية والحل في حالة المهمة كانت جديدة للتو او في حالة تكليف الموظف بالمهمة بناءا على مقارنة الحالة ومقارنة الموظف المكلف بعمل المهمة مع مدير المشروع والموظف القائد
    return this.authService.CurrentUser.id === this.task.assignedEmployee.id &&
        ( this.task.currentStatus.status === 4  ) ;
  }


  checkForReOpen(){
    return (this.authService.CurrentUser.id === this.task.createdBy.employee.id ||
        this.authService.CurrentUser.id === this.employeeLeaderId ||
        this.authService.CurrentUser.id === this.projectManagerId ) && this.task.currentStatus.status === 7
  }

  checkForClose(){
    return (this.authService.CurrentUser.id === this.task.createdBy.employee.id ||
        this.authService.CurrentUser.id === this.employeeLeaderId ||
        this.authService.CurrentUser.id === this.projectManagerId ) && this.task.currentStatus.status === 7
  }

  checkForDeclined(){
   return (this.authService.CurrentUser.id ===
       this.task.createdBy.employee.id ||  this.authService.CurrentUser.id === this.employeeLeaderId ||
    this.authService.CurrentUser.id === this.projectManagerId )
       && (this.task.currentStatus.status === 6  || this.task.currentStatus.status === 0)
  }

  checkForClosed(){
   return this.authService.CurrentUser.id === this.task.assignedEmployee.id &&
       ( this.task.currentStatus.status === 7  ) ;
  }


//   In Progress --> Resolved: When the work on an "In Progress" task
//   is completed by the assignee he can issue a transition
//   to the "Resolved" state and team lead will get notified to take further actions.

  checkForInProgress(){
  return this.authService.CurrentUser.id === this.task.assignedEmployee.id &&
      this.task.currentStatus.status === 7
  }

  checkForReAssigned() {
    return this.authService.CurrentUser.id === this.task.assignedEmployee.id &&
        ( this.task.currentStatus.status === 7   ) ||
        ( this.task.currentStatus.status === 4 ) ||
        ( this.task.currentStatus.status === 1   ) ||
        (this.task.currentStatus.status  === 0);
  }

  isPopupOpened : boolean;

  openDialogEmp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '750px';
    dialogConfig.height = "425px" ;
    dialogConfig.data = {
      taskId: this.taskId,
      teamId: this.teamId
    };

    this.isPopupOpened = true;
    const dialogRef =
      this.dialog.open(ReassingeEmployeeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output:", data);
      this.isPopupOpened = false;
    });
  }


}
