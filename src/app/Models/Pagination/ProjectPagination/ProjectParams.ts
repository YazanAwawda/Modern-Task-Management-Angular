import * as enum_ from "../../../Enum/enum.model";

export  class ProjectParams {

ProjectStatusToDisplay ?: enum_.ProjectStatus[] = [0] ;

PageIndex  : number  = 1;

PageSize : number = 6;

Sort : string  ;

Search : string ;

constructor() {
}
}
