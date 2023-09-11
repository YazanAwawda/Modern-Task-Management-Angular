import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetUser} from "../../Models/User/User";

@Injectable({
    providedIn : 'root'
})

export class ProfileService {

    constructor(private  http:HttpClient) {
    }

   getJobs(name:string):Observable<any>{
        return this.http.get<any>( `https://localhost:7011/api/Profile/SuggestJobTitles?name=${name}`);
   }


   getUser(id :string):Observable<GetUser>{
      return this.http.get<GetUser>(`https://localhost:7011/api/Profile/${id}`);
   }


}
