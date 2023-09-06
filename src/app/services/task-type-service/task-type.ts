import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {TaskType} from "../../Models/TaskType/task-type";
import {TaskPriority} from "../../Models/TaskPriority/task-priority";


@Injectable({
  providedIn : 'root'
})
export  class TaskTypeService {

  constructor(private  http : HttpClient) {
  }
  private  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type':'application/json',
      'Accept' : 'application/json'
    })
  };

  getTaskTypes() : Observable<TaskType[]>{
    return  this.http.get<TaskType[]>("https://localhost:7011/api/TaskType");
  }

  addTaskType(taskType : TaskType): Observable<TaskType> {
    return  this.http.post<TaskType>("https://localhost:7011/api/TaskType", taskType)
  }

  editTaskType(taskType : TaskType):Observable<TaskType> {
    return this.http.patch<TaskType>("https://localhost:7011/api/TaskType", taskType)
  }

  deleteTaskType(id:number):Observable<TaskType>{
    return this.http.delete<TaskType>("https://localhost:7011/api/TaskType" ,{
      body: {
        "id":id
      }
    }).pipe(
        map(res => {
          return res;
        })
    );
  }
}
