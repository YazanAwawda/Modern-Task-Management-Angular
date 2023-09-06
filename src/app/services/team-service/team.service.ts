import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable} from "rxjs";
import {
  CreateTeam,
  EditTeam,
  Employee,
  GetAvailableTeams,
  GetTeam,
  GetTeamMembers,
  UpdateLeader
} from "../../Models/Team/team.model";
import {TeamParams} from "../../Models/Pagination/TeamPagination/TeamParams";
import {ITeamPagination} from "../../Models/Pagination/TeamPagination/TeamPagination";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private  teamUrl =  'https://localhost:7011/api/Team';
  // Create Object call Http Headers to set a header
  private  httpOptions = {
    header: new HttpHeaders(
      {
        'Content-Type' : 'application/json'
      }
    )
  };
  // Create Object call HttpParams to set a params
  private  httpParams = new HttpParams();
  constructor(private  http: HttpClient) { }

  // Create Team
  CreateTeam(creatTeam : CreateTeam) : Observable<CreateTeam>{
    return this.http.post<CreateTeam>(`${this.teamUrl}`,creatTeam);
  }
  // Get All Teams
 getAllTeams() : Observable<GetTeam[]>{
    return this.http.get<GetTeam[]>(`${this.teamUrl}` );
 }

  // Get all teams with pagination
  GetAllTeamWithPagination(params : TeamParams): Observable<ITeamPagination>{
    // set headers
    let  params_ = new HttpParams() ;
    //if(params?.teamId)
    //TODO:  params_ = params_?.append('teamId' ,    1028 );
    if(params?.PageIndex)
      params_ = params_?.append('pageIndex' , params.PageIndex);
    if(params?.PageSize)
      params_ = params_?.append('pageSize' , params.PageSize) ;
    if(params?.Sort)
      params_ = params_?.append('sort' , params.Sort);
    if(params?.Search)
      params_ = params_?.append('search' , params.Search);

    return this.http.get<ITeamPagination>('https://localhost:7011/api/Team' ,
      { params : params_});
      }

      // All Employees
     getAllEmployees():Observable<Employee[]>{
     return  this.http.get<Employee[]>("https://localhost:7011/api/Employee/GetEmployees");
    }

    // Update Team
    updateTeam(editTeam : EditTeam) : Observable<EditTeam>{
    return this.http.patch<EditTeam>(`${this.teamUrl}` , editTeam);
    }

    // Get Team By ID
  getTeamByID(teamId : number) : Observable<GetTeam> {
    return this.http.get<GetTeam>(`${this.teamUrl}/${teamId}`);
  }

  // Delete Team ID
  RemoveTeam(teamID : number) : Observable<GetTeam>{
    return this.http.delete<GetTeam>(`${this.teamUrl}/${teamID}`);
  }

  // Get Available Team
  GetAvailableTeam(): Observable<GetAvailableTeams[]>{
    return this.http.get<GetAvailableTeams[]>(`https://localhost:7011/api/Team/GetAvailableTeams`) ;
  }

  // Update Team Leader
  updateLeader(teamLeader : UpdateLeader) : Observable<GetTeam>{
  return this.http.patch<GetTeam>(`${this.teamUrl}/UpdateLeader` , teamLeader) ;
  }

  // GetTeamMembers
  getTeamMembers(id : number) : Observable<GetTeamMembers[]> {
  return this.http.get<GetTeamMembers[]>(`https://localhost:7011/api/Team/${id}/TeamMembers`)
  }


}
