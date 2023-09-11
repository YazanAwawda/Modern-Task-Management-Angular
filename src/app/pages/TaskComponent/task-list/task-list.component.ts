import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {GetAllTasks} from "../../../Models/Tasks/task.model";
import {TaskServices} from "../../../services/task-service/task-service";
import {Router} from "@angular/router";
import {TaskParams} from "../../../Models/Pagination/TaskPagination/TaskParams";
import {enumToString} from "../../../EnumHelper/enum.helper";


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @ViewChild('Search',{static:false})  searchElement!: ElementRef;

  tasks !: GetAllTasks[] ;

  @Input() projectId !: number  ;

  taskParams : TaskParams = new TaskParams();

  totalCount !: number ;

  // taskType : any  = TaskType;
  // taskPriority : any  = TaskPriority;
  // taskStatus : any   = TaskStatus ;


  protected readonly enumToString = enumToString;


  constructor(private  tasksServices : TaskServices ,
              private  router : Router ) {
  }

  ngOnInit(): void {
    this.getTasks(this.projectId);
  }

  getTasks(projectId : any ){
    this.tasksServices.getAllTasksWithPagination(this.taskParams,this.projectId).subscribe((res) => {
      this.tasks = res.data;
      projectId = this.projectId ;
      this.taskParams.PageIndex = res.pageIndex ;
      this.taskParams.PageSize = res.pageSize ;
      this.totalCount = res.count ;
      console.log(res);


    } , err => {
      console.log(err);
    })
  }

  onPageChanged(page : number){
    if(this.taskParams.PageIndex !== page)  {
      this.taskParams.PageIndex = page ;
      this.getTasks(this.projectId) ;
    }

  }
  onSearch(){
    this.taskParams.Search  = this.searchElement.nativeElement.value ;
    this.taskParams.PageIndex = 1 ;
    this.getTasks(this.projectId);
  }
  onReset(){
    this.searchElement.nativeElement.value = '' ;
    this.taskParams = new TaskParams() ;
    this.getTasks(this.projectId);
  }

  onSeeDetails(taskId : number){
    this.router?.navigate(['/ui-components/task-details/',taskId]);
  }


}
