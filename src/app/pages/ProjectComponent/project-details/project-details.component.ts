import {Component, ElementRef, ViewChild,TemplateRef } from '@angular/core';
import {Attachments, downloadFileProject, GetProjectById} from "../../../Models/Project/project.model";
import {ActivatedRoute, Router} from "@angular/router";
import * as enumModal from "../../../Enum/enum.model";
import {enumToString} from "../../../EnumHelper/enum.helper";
import {ProjectService} from "../../../services/project-service/project.service";
import {MatDialog, MatDialogConfig , MatDialogRef} from "@angular/material/dialog";
import {CreateTaskComponent} from "../../TaskComponent/create-task/create-task.component";
import {CreateTasks} from "../../../Models/Tasks/task.model";
import {ProjectStatus} from "../../../Enum/enum.model";
import {TeamMembers} from "../../../Models/Team/team.model";


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})

export class ProjectDetailsComponent {

  @ViewChild('search' , {static : false}) searchElement !: ElementRef ;

  searchTerm : string = "" ;
  AllEmp : TeamMembers[] = [] ;
  filteredEmp : TeamMembers[] = [] ;

  isPopupOpened  = true ;

  public projects_ !: GetProjectById ;
  public projectID !: number  ;


  teamMembers : TeamMembers;

  tasksData: CreateTasks;
  tasksArray : any [] = [] ;

  teamId:number;

  colorStatus : string;
  projectStatus : any ;

  timeCount : any ;
  timeRemaining : string ;

  date:Date =  new Date();
  role:{ role: string; colorClass: string; };

  isTeamLeader : boolean  ;


  fileDownload : downloadFileProject ;
  fileName : string ;
  constructor(private  projectService : ProjectService ,
              private route : ActivatedRoute ,
              private  router : Router,
              private  dialog : MatDialog) {
  }
  openDialog(projectID: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      projectID: this.projectID, // Pass the project ID to the modal component .
      projectName: this.projects_.name // Pass the name project to the modal component .
      ,tasksData : this.tasksData ,// Pass tasks data to the modal component .
      teamId:this.projects_.team.id // Pass team ID to Create Task.
    };

    this.isPopupOpened = true;
    const dialogRef =
      this.dialog.open(CreateTaskComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output:", data);
      if (data) {
        this.tasksArray.push(data);
        console.log("Returned task:", data);
        // Perform any necessary actions with the returned task
      }
      this.isPopupOpened = false;
    });
  }
  onColorStatus(val: any){
    let color : any;
    if( val === "New")
    {
      return color = "badge text-bg-secondary bg-opacity-75" ;
    }
    if ( val === "Open")
    {
      return color   = "badge text-bg-success" ;
    }
    if ( val === "InProgress")
    {
      return color = "badge text-bg-warning" ;
    }
    if ( val === "Completed")
    {
      return color = "badge text-bg-primary" ;

    }
    if (val === "Canceled")
    {
      return color = "badge text-bg-danger" ;
    }
    return color as string;
  }




   ngOnInit(){


     this.route.params.subscribe(params => {
       this.projectID = +params['id'];});

     this.projectService.getProjectByID((this.projectID)).subscribe(
       (project_:GetProjectById  ) => {
         this.projects_ = project_;
         this.projectID = project_.id! ;



         // For show the value string of Team Leader Of Project
         for(const res of this.projects_.team.teamMembers){
           this.teamMembers = res;
           this.projects_.team.teamMembers.map(item => {
             return<TeamMembers> {
               isTeamLeader : this.teamMembers.isTeamLeader
             }});


           //Search..Employees
           this.filteredEmp = this.projects_.team.teamMembers ;
           this.AllEmp = this.projects_.team.teamMembers;

           //For specify the admin employee from normal employee.
           this.role = this.printRole(this.isTeamLeader);

         }


         // For show the value string of Current Status Of Project
         this.projectStatus = enumToString(enumModal.ProjectStatus , this.projects_.currentStatus ) ;
         this.projects_.currentStatus = this.projectStatus;

         // For color status
         this.colorStatus = this.onColorStatus(this.projectStatus);
         let eventStartTime = (new Date(this.projects_.estimatedStartDate)); //Start Date
         // let eventEndTime = +(new Date(this.projects_.endDate)); //End Date
         let eventEndTime  = (new Date (this.projects_.estimatedEndDate)) ; //Date Now
         this.timeCount = eventEndTime.getTime() - eventStartTime.getTime() ;
         if(this.timeCount <= 0) {
           this.timeRemaining = 'Time expired';
         }
         else
         {
           let days =  Math.floor(this.timeCount / (24 * 60 * 60 * 1000));
           let hours =  Math.floor((this.timeCount % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
           let minutes=   Math.floor((this.timeCount % (1000 * 60 * 60)) / (1000 * 60));
           let seconds =     Math.floor((this.timeCount % (1000 * 60)) / 1000);
           this.timeRemaining    = `${this.formatNumber(days)}d`;
         }

       });
     //For Files
     // this.fileDownload.projectId = this.projectID ;
     // this.projects_.attachments.map(item =>  {
     //   return<downloadFileProject> {
     //     attachmentId : this.fileDownload.attachmentId
     //   }
     // })
     // this.projects_.attachments.map(item => {
     //   return<Attachments>{
     //     fileName : this.fileName
     //   }
     // })
  }


  onSearchEmployee(){
  const searchTerm = this.searchTerm.trim();
  this.filteredEmp = this.AllEmp.filter(item =>
    (item.employee.name.toLowerCase().includes(searchTerm) ||
      (item.employee.name.toUpperCase().includes(searchTerm)) || (item.employee.name.includes(searchTerm)) ));
  }

  formatNumber(val :  number ) : string {
    return val.toString().padStart(2,'0');
  }



  onAddTaskForProject() {
    this.router?.navigate([`/create-task/${this.projectID}`])
  }

  openDialog_(matDialog:TemplateRef<any>):MatDialogRef<any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.position = {
      right: '45px', // Adjust the left position as needed
    };
    return this.dialog.open(matDialog,dialogConfig);
  }
  protected readonly enumToString = enumToString;
  protected readonly ProjectStatus = ProjectStatus;


  printRole(role_: any) {
    let roleEmp: string;
    let color: string;

    if (role_) {
      roleEmp = "Team-Lead";
      color = "badge text-bg-primary";
    } else {
      roleEmp = "Employee";
      color = "badge text-bg-success";
    }

    return { role: roleEmp, colorClass: color };
  }

  // downloadFile() {
  //   this.projectService.downloadFile().subscribe(
  //     (res: any) => {
  //       if (res instanceof ArrayBuffer) {
  //         // Handle ArrayBuffer
  //         // For example, if you want to save it as a file
  //         const fileName = 'downloaded_file.txt'; // Set the desired file name
  //         const blob = new Blob([res], { type: 'application/octet-stream' });
  //         saveAs(blob, fileName);
  //       } else {
  //         // Handle downloadFileProject object
  //         // Example: You may use the response for other purposes
  //       }
  //     },
  //     error => {
  //       console.error('Error downloading file:', error);
  //     }
  //   );
  // }

 }
