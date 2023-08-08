
import {GetAllTasks} from "../../Tasks/task.model";
export interface  ITaskPagination {

  pageIndex : number;

  pageSize : number ;

  count : number ;

  data: GetAllTasks[] ;

}
