import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, concatMap, map, Observable, of, throwError} from "rxjs";
import {
  CreateProject,
  DeleteProject,
  downloadFileProject,
  EditProject,
  GetProjectById,
  GetProjects, ProjectAddTeam, uploadFilesProject
} from "../../Models/Project/project.model";
import {IProjectPagination} from "../../Models/Pagination/ProjectPagination/ProjectPagination";
import {ProjectParams} from "../../Models/Pagination/ProjectPagination/ProjectParams";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn : 'root'
})
export class ProjectService {

  private  projectUrl : 'https://localhost:7011/api/Project';
  file_s !: uploadFilesProject ;


  //Create Object call Http Headers to set a header
  private  httpOptions = {
    header: new HttpHeaders(
      {
        'Content-Type' : 'application/json'
      }
    )
  };

  //Create Object call HttpParams to set a params
  private  httpParams = new HttpParams();

  constructor(private  http : HttpClient) {
  }

  getAllProjects() : Observable<GetProjects>{
   return this.http.get<GetProjects>(`${this.projectUrl}`);
  }
  getAllProjectsWithPagination(params : ProjectParams) : Observable<IProjectPagination >{

      let  params_ = new HttpParams() ;

      if(params?.ProjectStatusToDisplay)
      for (const projectStatusToDisplayKey in params.ProjectStatusToDisplay) {
        params_ = params_.append("ProjectStatusToDisplay",projectStatusToDisplayKey)
      }
      if(params?.PageIndex)
      params_ = params_?.append('PageIndex' , params.PageIndex);
      if(params?.PageSize)
      params_ = params_?.append('PageSize' , params.PageSize) ;
      if(params?.Sort)
      params_ = params_?.append('Sort' , params.Sort);
      if(params?.Search)
      params_ = params_?.append('Search' , params.Search);

   return this.http.get<IProjectPagination>("https://localhost:7011/api/Project",{params : params_});
  }

  getProjectByID(Id: number): Observable<GetProjectById> {

    return this.http.get<GetProjectById>(`https://localhost:7011/api/Project/${Id}`);
  }

  addProject(project: CreateProject): Observable<CreateProject> {
    return this.http.post<CreateProject>(`${this.projectUrl}`, project);
  }

  deleteProject(Id: number): Observable<DeleteProject> {
    return this.http.delete<DeleteProject>(`${this.projectUrl}/${Id}`);
  }

  editProject(project: EditProject): Observable<EditProject> {
    return this.http.patch<EditProject>('https://localhost:7011/api/Project', project);
  }


  addProjectTeam(ProjectAddTeam_: ProjectAddTeam): Observable<ProjectAddTeam> {
    return this.http.post<ProjectAddTeam>("https://localhost:7011/api/Project/AddTeam", ProjectAddTeam_);
  }

  //**
  createProject(files : File[] | undefined, project: CreateProject)  : Observable<any> {
    let file : any;
    if (files) {
       file = files[0];
    }
    const formData : FormData = new FormData();
    return this.http.post<number | any>("https://localhost:7011/api/Project", project).pipe(
      map(x => {
        if(file) {
          formData.append("OwnerId", x.toString());
          formData.append("File", file, file?.name);
          return formData;
        }
        return null;
      }),
      concatMap(val =>
        typeof(val) === typeof(FormData) ?
          this.http.post<number | any>('https://localhost:7011/api/Project/Upload',val) : of()

      ))
  }




  // Handles errors for catch error
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordintly .
      console.error('An error occured:', error.error);
    } else if (error.status === 400) {
      return throwError(error.error);
    }
    else if (error.status === 413) {
      return throwError(error.error);
    }
    else {
      // The backend returned an un successfully response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happen; please try again later.')
  }



}
