import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TaskServices} from "../../../services/task-service/task-service";
import {ActivatedRoute, Router} from "@angular/router";
import {GetAllTasks} from "../../../Models/Tasks/task.model";
import {TaskParams} from "../../../Models/Pagination/TaskPagination/TaskParams";
import {TaskPriority, TaskStatus, TaskType} from "../../../Enum/enum.model";
import { enumToString } from 'src/app/EnumHelper/enum.helper';
import {Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'viewAllTasks',
  templateUrl: './view-tasks-of-project.component.html',
  styleUrls: ['./view-tasks-of-project.component.scss']
})

export class ViewTasksOfProjectComponent implements OnInit {

  //Project Manager (Create By)
  //Team Members


    @ViewChild('search', {static: false}) searchElement !: ElementRef;

  private searchInputSubject = new Subject<string>();
  searchResult: any;
  tableVisible: boolean = false;
  paginationVisible: boolean = false;
  @Input() projectId !: number;
  @Input() teamId !: number ;
  @Input() projectManagerInputId !: string;
  @Input() TeamLeadID !: string ;

   tasks : GetAllTasks[] ;
   task : GetAllTasks;
   role:{ role: string; colorClass: string; };

  selectedTask: any = null;


  taskParams: TaskParams = new TaskParams();

  totalCount !: number;

  isTeamLeader : boolean ;

  protected readonly enumToString = enumToString;
  employeeLeaderId:string;
  projectManagerId:string | null;
  constructor(private tasksServices: TaskServices,
              private route: Router,
              private  toastService: ToastrService ,
              private activeRoute: ActivatedRoute) {
  }


  toggleTable(event: any) {
    this.tableVisible = !this.tableVisible;
    this.paginationVisible = this.tableVisible;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(x => {
      this.projectId = Number(x["id"]);
      this.employeeLeaderId =  this.activeRoute.snapshot.paramMap.get('employeeIdAssigned') ?? this.TeamLeadID;
      this.projectManagerId = this.activeRoute.snapshot.paramMap.get('projectManagerId') ?? this.projectManagerInputId;
      this.teamId = this.teamId || Number(this.activeRoute.snapshot.paramMap.get('teamId'));
    });

    console.log(this.teamId);
    this.GetAllTasks();
  }

  GetAllTasks() {
    this.tasksServices.getAllTasksWithPagination(this.taskParams, this.projectId).subscribe((res) => {
      this.tasks = res.data;
      let projectId = this.projectId;
      this.taskParams.PageIndex = res.pageIndex;
      this.taskParams.PageSize = res.pageSize;
      this.totalCount = res.count;

      for (const res of this.tasks) {
           res.assignee.isTeamLeader = this.isTeamLeader ;
           this.role = this.printRole(this.isTeamLeader);
      }

      // // Loop through the tasks to access each task ID
      // for (let task of this.tasks) {
      //   this.selectedTask = task.id; // Assign the task ID to the variable
      //   console.log(this.selectedTask);
      //   // Perform any necessary operations with the task ID
      //   this.toggleTaskDetails(this.selectedTask)
      // }
      for (const re of this.tasks) {
         let x = enumToString( TaskStatus ,re.currentStatus) ;

         // let y =enumToString( TaskType , re.taskType );
         //
         // let z = enumToString( TaskPriority , re.priority) ;

        this.onColorTaskStatus(x);

        // this.onColorTaskPriority(y);
        //
        // this.onColorTaskType(z);
      }

      console.log(projectId);
      console.log(res.data);
      console.log(this.tasks);
    }, err => {
      console.log(err);
    })
  }

  onPageChanged(page: number) {
    if (this.taskParams.PageIndex !== page) {
      this.taskParams.PageIndex = page;
      this.GetAllTasks()
    }
  }

  clickReset() {
    this.searchElement.nativeElement.value = '';
    this.taskParams = new TaskParams();
    this.GetAllTasks();
    this.resetSearch();
  }

  resetSearch() {
    this.searchResult = [];
    this.searchInputSubject.next('');
  }

  clickSearch() {
    const searchTerm = this.searchElement.nativeElement.value;

    if (searchTerm.trim().length === 0) {
      this.clickReset();
      return;
    }

    this.taskParams.Search = searchTerm;
    this.taskParams.PageIndex = 1;

    setTimeout(() => {
      this.GetAllTasks();
    }, 300);

  }

  onSearchInputChange() {
    const searchTerm = this.searchElement.nativeElement.value.trim();
    this.searchInputSubject.next(searchTerm);
  }


  toggleTaskDetails(taskId: any): void {
    if (this.selectedTask === taskId) {
      this.selectedTask = null; // Deselect the task if it's already selected
    } else {
      this.selectedTask = taskId; // Select the clicked task
    }
  }


  onColorTaskType(val: any){
    let color : any ;
    if( val === "BugFix")
    {
      return   color = "badge text-bg-warning" ;
    }
    if ( val === "FeatureAdd")
    {
      return   color = "badge text-bg-success" ;
    }
    if ( val === "FeatureRemove")
    {
      return   color  = "badge text-bg-secondary" ;
    }
    return color  as string;
  }
  onColorTaskPriority(val:string) {
    let color :any ;
    if( val === "VeryHigh")
    {
    return  color = "badge text-bg-danger" ;
    }
    if ( val === "High")
    {
     return color = "badge text-bg-warning" ;
    }
    if ( val === "Moderate")
    {
    return  color = "badge text-bg-warning bg-opacity-75" ;
    }
    if ( val === "Low")
    {
   return   color = "badge text-bg-primary" ;

    }
    if (val === "VeryLow")
    {
   return   color = "badge text-bg-success" ;
    }
    return color as string ;

  }
  onColorTaskStatus(val:string)  {
    let color : any ;
    if( val === "Assigned")
    {
     return color = "badge text-bg-primary" ;
    }
    if ( val === "Canceled")
    {
      return   color = "badge text-bg-secondary bg-opacity-75" ;
    }
    if ( val === "Closed")
    {
      return   color = "badge text-bg-success bg-opacity-50" ;
    }
    if ( val === "Declined")
    {
      return     color = "badge text-bg-danger" ;

    }
    if (val === "Draft")
    {
      return     color = "badge text-bg-warning bg-opacity-25" ;
    }

    if ( val === "InProgress")
    {
      return     color = "badge text-bg-warning bg-opacity-50"  ;

    }
    if (val === "Pending")
    {
      return     color = "badge text-bg-info" ;
    }
    if (val === "Projected")
    {
      return  color = "badge text-bg-info bg-opacity-75" ;
    }

    if ( val === "Removed")
    {
      return     color = "badge text-bg-secondary bg-opacity-50" ;

    }
    if (val === "Finished")
    {
      return     color = "badge text-bg-success" ;
    }
    return color as string ;

  }

  onRemoveTask(id:any){
    this.tasksServices.deleteTaskById(id).subscribe(res => {
     this.toastService.error("You Removed Task");
     window.location.reload();
      console.log(res);
    });
  }

   transform(text: string): string {
    const maxCharacters = 60; // Maximum characters for two lines
    const maxLines = 2;       // Maximum lines

    const words = text.split(' ');

    const truncatedText = words.reduce((result, word) => {
      if (result.length + word.length <= maxCharacters) {
        result += (result ? ' ' : '') + word;
      } else if (result.split('\n').length < maxLines) {
        result += `\n${word}`;
      }
      return result;
    }, '');

    return words.length > truncatedText.split(' ').length
      ? `${truncatedText}...`
      : truncatedText;
  }


  printRole(role_: any) {
    let roleEmp: string;
    let color: string;

    if (role_) {
      roleEmp = "Team-Lead";
      color = "badge text-bg-primary";
    } else {
      roleEmp = "Employee";
      color = "badge text-bg-success";
    }

    return { role: roleEmp, colorClass: color };
  }
  // protected readonly TaskPriority = TaskPriority;
  // protected readonly TaskType = TaskType;
  protected readonly TaskStatus = TaskStatus;
}
