import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../../../services/project-service/project.service";
import {GetProjects} from "../../../Models/Project/project.model";
import {ProjectParams} from "../../../Models/Pagination/ProjectPagination/ProjectParams";
import {ProjectStatus} from "../../../Enum/enum.model";
import {enumValues} from "../../../EnumHelper/enum.helper";
import {Router} from "@angular/router";
import {classNames} from "@angular/cdk/schematics";


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

   enumValue : any = enumValues;

   selected_projectStatus : ProjectStatus[] ;
   checked_ !: boolean ;
  sortOptions = [
    {name:"Alphabetical",value:"name"},
    {name:"Project:Low to High",value:"projectAsc"},
    {name:"Project:High to Low",value:"projectDesc"},
  ]

   show !:string  ;
  constructor(private  projectService : ProjectService , private  router : Router) {
  }

    ngOnInit(): void {
    this.getProjects();
    }

    getProjects(){
    this.projectService.getAllProjectsWithPagination(this.projectParams).subscribe((response) => {
      this.projects = response.data;
      this.projectParams.PageIndex = response.pageIndex ;
      this.projectParams.PageSize = response.pageSize;
      this.totalCount = response.count;
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

}
