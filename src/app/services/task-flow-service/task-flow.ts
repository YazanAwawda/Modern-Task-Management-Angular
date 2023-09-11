import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn : 'root'
})


export  class  TaskFlowService {

  private baseUrl = 'https://localhost:7011/api/Tasks'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  // to start  task
  startTask(taskId:number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/Start`,{
      "id" : taskId
    });
  }

  // to reassign a task
  assignTask(taskId : number ,employeeId: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/AssignTeamMember`,{
      "taskId": taskId ,
      "employeeId": employeeId
    });
  }

  //  to mark a task as "In Progress"
  markTaskInProgress(taskId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/InProgress/${taskId}`,{
      "id" : taskId
    });
  }

  //  to mark a task as "Resolved"
  markTaskResolved(taskId: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/Resolve`,{
      "id" : taskId
    });
  }

  //  to reopen a task
  reopenTask(taskId: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/Reopen`,{
      "id" : taskId
    });
  }

  //  to decline a task
  declineTask(taskId: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/Decline`,{
      "id" : taskId
    });
  }
  //  to mark a task as "Closed"
  closeTask(taskId: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/Close`,{
      "id" : taskId
    });
  }


  //to resolve task
  resolveTask(taskId:number) : Observable<any>{
    return this.http.patch<any>("https://localhost:7011/api/Tasks/Resolve" ,{
      "id" : taskId
    });
  }

}
