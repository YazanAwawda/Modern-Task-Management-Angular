import {Component, Inject, Input} from '@angular/core';
import {CreateTasks} from "../../../Models/Tasks/task.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskServices} from "../../../services/task-service/task-service";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeamService} from "../../../services/team-service/team.service";
import {Employee, GetTeam, GetTeamMembers, TeamMembers} from "../../../Models/Team/team.model";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {TaskTypeService} from "../../../services/task-type-service/task-type";
import {TaskPriorityService} from "../../../services/task-priority-service/task-priority";
import {TaskPriority} from "../../../Models/TaskPriority/task-priority";
import { TaskType } from 'src/app/Models/TaskType/task-type';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {



   TaskFormGroup !: FormGroup<any>  ;
   tasks !: CreateTasks;
   @Input() projectID !: number ;
   projectName !: string ;

   dropdownList :GetTeamMembers[] = [];
   selectedItems: GetTeamMembers[] = [];
   employees: Employee[] = [];
   dropdownSettings = {};

   teamMembers:GetTeamMembers[];
   teamId!:number;
   empId :string | undefined;

  taskTypes : TaskType[] ;
  taskPriorities : TaskPriority[] ;


  constructor(private  taskService : TaskServices ,
              private route: Router,
              private  teamService: TeamService,
              private  fb : FormBuilder ,
              private  toasty : ToastrService ,
              private  taskTypeService : TaskTypeService ,
              private  taskPriorityService : TaskPriorityService ,
              private dialogRef: MatDialogRef<CreateTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any ) {

    this.projectID   = data.projectID; // Retrieve the project ID from the data object
    this.projectName = data.projectName; // Retrieve the project name from the data object
    this.tasks = data.tasks; // Retrieve the tasks from the data object
    this.TaskFormGroup = data.TaskFormGroup; // ....
    this.teamId = data.teamId;

  }



  ngOnInit(): void {

    this.projectID = this.data.projectID; // Retrieve the project ID from the data object
    this.projectName = this.data.projectName ; // Retrieve the project name from the data object
    this.tasks = this.data.tasks ; // Retrieve the tasks from the data object
    this.TaskFormGroup = this.data.TaskFormGroup; // ....


    this.TaskFormGroup = this.fb.group({
      name : ['' , Validators.required] ,
      description : ['' , Validators.required] ,
      projectId: [this.projectID ] ,
      taskType : ['',Validators.required] ,
      taskPriority : ['',Validators.required] ,
      estimatedDueDate : ['' , Validators.required],
      assignedTeamMember : this.fb.group({
        id: this.empId ,
        teamId:this.teamId
      })
    });
   this.getTeamMembersProject();
   this.getTaskPriority();
   this.getTaskTypes();
  }
  onSubmit() : void{

    this.addTask();

  }

  get name() {return this.TaskFormGroup?.get('name') ;}
  get description() {return this.TaskFormGroup?.get('description')}
  get taskType_() {return this.TaskFormGroup?.get('taskType') as FormControl<TaskType>;}
  get estimatedDueDate() {return this.TaskFormGroup?.get('estimatedDueDate');}

  get TaskPriority_() {return this.TaskFormGroup?.get('taskPriority') as FormControl<TaskPriority>;}

  get assignedTeamMember_() {return this.TaskFormGroup.get('assignedTeamMember') as FormGroup;}
  addTask() : void{
    const creatTask_ : CreateTasks = {
      name : this.name?.value ,
      description : this.description?.value ,
      taskTypeId : this.taskType_?.value ,
      estimatedDueDate : this.estimatedDueDate?.value,
      priorityId : this.TaskPriority_?.value,
      projectId :  this.projectID as number ,
      assignedTeamMember : this.assignedTeamMember_?.value,
    }

     creatTask_!.assignedTeamMember!.id = this.empId;
    // Handle the response, update tasks array or perform other operations

    this.taskService.addTask(creatTask_).subscribe(task => {
      this.tasks = task ;

      if(this.tasks){
        this.toasty.success("Task Created Successfully.")
        this.route?.navigate([`ui-components/all-tasks/${this.projectID}`])
      }
      console.log(task)
      // Close the dialog

      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

  getTeamMembersProject(){

   this.teamService.getTeamMembers(this.teamId).subscribe(res =>  {


     this.teamMembers = res;
     this.dropdownList = this.teamMembers  ;
     this.selectedItems = this.teamMembers;

     this.dropdownList.map(item => {
       return<TeamMembers>{
         employee : {
           id : item.employee.id ,
           name : item.employee.name
         }
       }
     });


     this.employees = this.dropdownList.map(x => {
       return x.employee;
     })

     this.dropdownSettings = <IDropdownSettings>{
       singleSelection: true,
       idField: 'id',
       textField: 'name',
       allowSearchFilter: true,
       closeDropDownOnSelection: false,
       showSelectedItemsAtTop: true,
       defaultOpen: false,
       itemsShowLimit: this.employees.length,
       selectedItems : this.selectedItems
     }
   })


    this.onEmployeeSelect(this.selectedItems);
    this.onEmployeeDeSelect(this.selectedItems);
    console.log(this.selectedItems);

  }
  onEmployeeSelect(item: any) {
    console.log(item);
    this.empId = item.id;
  }
  onEmployeeDeSelect(item: any) {
    console.log(item);
    this.empId = undefined;
  }

  getTaskTypes() {
  this.taskTypeService.getTaskTypes().subscribe(res =>
  {
  this.taskTypes = res;
  console.log(res);
  }
  )
  }

  getTaskPriority(){
    this.taskPriorityService.getTaskPriorities().subscribe(res => {
      this.taskPriorities = res ;
      console.log(res)
    })
  }


}
