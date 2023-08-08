import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CreateTasks, DeleteTask, EditTask, GetAllTasks, GetTask} from "../../Models/Tasks/task.model";
import { Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {TaskParams} from "../../Models/Pagination/TaskPagination/TaskParams";
import {ITaskPagination} from "../../Models/Pagination/TaskPagination/TaskPagination";

@Injectable({
  providedIn: 'root'
})
export class TaskServices {

  private taskUrl : string = "https://localhost:7011/api/Tasks" ;

  private task !: GetAllTasks ;
  //Create Object call Http Headers to set a header
  private  httpOptions = {
    header: new HttpHeaders(
      {
        'Content-Type' : 'application/json'
      }
    )
  };
  // Create Object call HttpParams to set a params
  private  httpParams = new HttpParams();
  constructor(private  http : HttpClient , private route : ActivatedRoute) { }
  addTask ( createTasks ?: CreateTasks) :Observable<CreateTasks> {
    return  this.
    http.post<CreateTasks>(`${this.taskUrl}`, createTasks);
  }

  getTaskByProjectID(projectId : number ):Observable<GetAllTasks[]>{
    //set request params
    let params =  this.httpParams.set('projectId', projectId);
    return this.http.get<GetAllTasks[]>(`${this.taskUrl}`,{'headers': this.httpOptions.header , params : params});
  }
  getTaskByID(taskId : number) : Observable<GetTask> {
    return  this.http.get<GetTask>(`https://localhost:7011/api/Tasks/${taskId}` );
  }

  getAllTasksWithPagination(params : TaskParams , projectID : number):Observable<ITaskPagination>{
    let params_ : HttpParams = new HttpParams();

    if(params.ProjectId)
      projectID = params.ProjectId ;
      params_ = params_.append('ProjectId',projectID);

    if(params.TaskStatusToDisplay)
      for(const TaskStatusToDisplayKey in params.TaskStatusToDisplay){
     //TODO:   params_ = params_.append("TaskStatusToDisplay" , TaskStatusToDisplayKey);
      }

    if(params.TaskPrioritiesFilter)
      for(const TaskPrioritiesFilterKey in params.TaskPrioritiesFilter){
      //TODO:  params_ = params_.append("TaskPrioritiesFilter" , TaskPrioritiesFilterKey);
      }

    if(params.TaskTypesFilter)
      for(const TaskTypesFilterKey in params.TaskTypesFilter){
     //TODO:   params_ = params_.append("TaskTypesFilter" , TaskTypesFilterKey);
      }

    if(params?.PageIndex)
      params_ = params_.append('PageIndex' , params.PageIndex) ;
    if(params?.PageSize)
      params_ = params_.append('PageSize', params.PageSize ) ;
    if(params?.Sort)
      params_ = params_.append('Sort' , params.Sort) ;
    if(params?.Search)
      params_ = params_.append('Search' , params.Search);
    return this.http.get<ITaskPagination>("https://localhost:7011/api/Tasks",{params: params_});
  }

  editTask(editTask:EditTask) : Observable<EditTask>{
    return this.http.patch<EditTask>("https://localhost:7011/api/Tasks" , editTask);
  }

  deleteTaskById(id : number):Observable<DeleteTask>{
    return  this.http.delete<DeleteTask>(`${this.taskUrl}/${id}`);
  }
}
