
import {GetProjects} from "../../Project/project.model";
export interface  IProjectPagination {

pageIndex : number;

pageSize : number ;

count : number ;

data: GetProjects[] ;

}
