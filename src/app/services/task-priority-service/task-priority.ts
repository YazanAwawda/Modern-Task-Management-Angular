import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, Subscription} from "rxjs";
import {TaskPriority} from "../../Models/TaskPriority/task-priority";


@Injectable({
  providedIn  : 'root'
})

export  class TaskPriorityService {


 constructor(private  http : HttpClient) {
 }


 private  httpOptions = {
  headers : new HttpHeaders({
   'Content-Type':'application/json',
   'Accept' : 'application/json'
  })
 };


 getTaskPriorities() : Observable<TaskPriority[]>{
 return  this.http.get<TaskPriority[]>("https://localhost:7011/api/TaskPriority");
 }

 addTaskPriority(taskPriority : TaskPriority): Observable<TaskPriority> {
 return  this.http.post<TaskPriority>("https://localhost:7011/api/TaskPriority", taskPriority)
 }

 editTaskPriority(taskPriority : TaskPriority):Observable<TaskPriority> {
 return this.http.patch<TaskPriority>("https://localhost:7011/api/TaskPriority", taskPriority)
 }

 deleteTaskPriority(id:number):Observable<TaskPriority>{
  return this.http.delete<TaskPriority>("https://localhost:7011/api/TaskPriority",{
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
