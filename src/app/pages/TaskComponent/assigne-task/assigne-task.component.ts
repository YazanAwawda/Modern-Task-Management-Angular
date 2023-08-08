import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../services/project-service/project.service";
import {ProjectParams} from "../../../Models/Pagination/ProjectPagination/ProjectParams";
import {GetProjects} from "../../../Models/Project/project.model";
import {Router} from "@angular/router";
import {GetAllTasks} from "../../../Models/Tasks/task.model";

@Component({
  selector: 'app-assigne-task',
  templateUrl: './assigne-task.component.html',
  styleUrls: ['./assigne-task.component.scss']
})
export class AssigneTaskComponent implements  OnInit {

  // Get Project List in Table
  // When click in a project view to me task
  // After We View Task we get team members to assign the task

  projectParams : ProjectParams = new ProjectParams();
  projectData  : GetProjects[] ;
  totalCount : number ;
  projectId:number ;
  task:GetAllTasks ;
 constructor(private  projectService : ProjectService , private  router : Router) {
 }
  ngOnInit(): void {
   this.getTableProjects();
  }

  getTableProjects(){
   this.projectService.getAllProjectsWithPagination(this.projectParams).subscribe(res => {
     this.projectData = res.data ;
     for (const re of this.projectData) {
      // this.projectId =  re.id ;
      // this.projectId = this.task.projectId;
      this.onViewTask(this.projectId);
     }
     this.projectParams.PageIndex = res.pageIndex ;
     this.projectParams.PageSize = res.pageSize ;
     this.totalCount = res.count ;
     console.log(res);
   },(err:any)=>{
     console.log(err);
   })
  }

  onPageChanged(page : number){
    if(this.projectParams.PageIndex !== page)
    {
      this.projectParams.PageIndex = page ;
      this.getTableProjects();
    }
  }

  onViewTask(id:any){
  this.router?.navigate(['ui-components/view-task',id]);
  }

  onSearch(){

  }

  onReset(){

  }

}

