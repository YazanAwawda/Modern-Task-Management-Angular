import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../../../services/project-service/project.service";
import {GetProjects} from "../../../Models/Project/project.model";
import {ProjectParams} from "../../../Models/Pagination/ProjectPagination/ProjectParams";
import {ProjectStatus, TaskType} from "../../../Enum/enum.model";
import {enumToString, enumValues} from "../../../EnumHelper/enum.helper";
import {Router} from "@angular/router";
import {PermissionService} from "../../../services/permission-service/permission.service";
import {Permission} from "../../../Models/Permission/permission-model";
import {Observable} from "rxjs";
import {TeamService} from "../../../services/team-service/team.service";
import {GetTeam, TeamMembers} from "../../../Models/Team/team.model";


@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements  OnInit{


  @ViewChild('Search',{static:false})  searchElement!: ElementRef;

   projects ?: GetProjects[] ;
   projectId: number ;

   projectParams  = new ProjectParams();

    totalCount !: number ;

    hasEditProject : Observable<boolean>  ;
    hasViewProject : boolean ;
    hasDeleteProject : boolean ;

    selected_projectStatus : ProjectStatus[] ;
    checked_ !: boolean ;
    permissionArr: Permission[];
  sortOptions = [
    {name:"Alphabetical",value:"name"},
    {name:"Project:Low to High",value:"projectAsc"},
    {name:"Project:High to Low",value:"projectDesc"},
  ]

   show !:string  ;
   teams : GetTeam ;
  constructor(private  projectService : ProjectService ,
              private  router : Router ,
              private  teamService : TeamService ,
              public  permissionService : PermissionService) {
  }

    ngOnInit(): void {
    this.getProjects();
    this.getAllPermission();

    }

   getAllPermission(){
   //   this.permissionService.getAllPermission();
       // Subscribe to the currentPermission$ observable
       this.permissionService.getCurrentPermission$().subscribe((res) => {
           // Check if the user has permission with key 7
           console.log(res);
           this.permissionService.Permissions = res ;
           this.hasViewProject = this.permissionService.hasPermissionForOperation(7);
           this.hasEditProject = this.permissionService.checkPermission( [12] ) ;
        console.log(this.hasViewProject) ;
        console.log(     this.hasEditProject) ;
       });
   }

   teamId : number ;
    getProjects(){
    this.projectService.getAllProjectsWithPagination(this.projectParams).subscribe((response) => {
      this.projects = response.data;
      this.projectParams.PageIndex = response.pageIndex ;
      this.projectParams.PageSize = response.pageSize;
      this.totalCount = response.count;

      for (const re of this.projects) {
        let x = enumToString( ProjectStatus ,re.currentStatus) ;
        this.teamId = re.teamId;
        this.onColorProjectStatus(x);
      }

      console.log(response);
    } , err => {
      console.log(err);
    })


    }

    onPageChanged(page : number){
    if(this.projectParams.PageIndex !== page)
    {
      this.projectParams.PageIndex = page ;
      this.getProjects();
    }
    }
  onStatusChange( checked : any, statusOption : ProjectStatus){
    this.checked_ = checked ;
    if (checked) {
      // Add the selected status to the array of selected statuses
     this.selected_projectStatus.push(statusOption);
    } else {
      // Remove the deselected status from array of selected statuses
      const index = this.selected_projectStatus.indexOf(statusOption);
      if(index !== -1) {
        this.selected_projectStatus.splice(index,1);
      }
      // You can perform additional actions or call other functions here
      // For example , update the projectParams and call getProjects() again
       this.projectParams.ProjectStatusToDisplay = this.selected_projectStatus ;
       this.getProjects() ;
    }
}
 onSortSelected(Sort: string ){
    this.projectParams.Sort = Sort ;
    this.getProjects();
 }
 onSearch(){
    this.projectParams.Search  = this.searchElement.nativeElement.value ;
    this.projectParams.PageIndex = 1 ;
    this.getProjects();
 }
 onReset(){
    this.searchElement.nativeElement.value = '' ;
    this.projectParams = new ProjectParams() ;
    this.getProjects();
 }

 deleteProject($event : number | any){
this.projectService.getProjectByID($event).subscribe(()=>{
  this.projects?.forEach((project, index) => {
    if(project.id == $event) {
      this.projects?.splice(index, 1);
    }
  })
  if(this.totalCount > 0) {
    this.totalCount = -1 ;
  }
  else {
    this.totalCount = 0 ;
  }
})
 }

 onViewTeam(id :any) {
    this.router?.navigate(['/ui-components/team-details',id]);
 }
 onAssignTeam(id :any){
   this.router?.navigate(['/ui-components/assignation',id]);
 }


  transform(text: string): string {
    const maxCharacters = 60; // Maximum characters for two lines
    const maxLines = 2;       // Maximum lines

    const words = text.split(' ');
    let truncatedText = '';

    for (const word of words) {
      if ((truncatedText + word).length <= maxCharacters) {
        truncatedText += (truncatedText.length === 0 ? '' : ' ') + word;
      } else {
        if (truncatedText.split('\n').length >= maxLines) {
          truncatedText += '...';
          break;
        }
        truncatedText += '\n' + word;
      }
    }

    return truncatedText;
  }

  onColorProjectStatus(val:string)  {

    let colorStatus : any ;

      if( val === "New")
      {
          return colorStatus = "badge text-bg-secondary" ;
      }
      if ( val === "Open")
      {
          return colorStatus   = "badge text-bg-success" ;
      }
      if ( val === "InProgress")
      {
          return colorStatus = "badge text-bg-warning" ;
      }
      if ( val === "Completed")
      {
          return colorStatus = "badge text-bg-primary" ;

      }
      if (val === "Canceled")
      {
          return colorStatus = "badge text-bg-danger" ;
      }

    return colorStatus as string ;

  }



  protected readonly TaskType = TaskType;
  protected readonly ProjectStatus = ProjectStatus;
  protected readonly enumToString = enumToString;
}
