import {GetTeam} from "../../Team/team.model";

export  interface  ITeamPagination {
  pageIndex : number;

  pageSize : number ;

  count : number ;

  data : GetTeam[] ;
}
