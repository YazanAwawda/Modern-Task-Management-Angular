import {Component, Inject, Input} from '@angular/core';
import {CreateTasks} from "../../../Models/Tasks/task.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {enumValues} from "../../../EnumHelper/enum.helper";
import {TaskServices} from "../../../services/task-service/task-service";
import {ActivatedRoute} from "@angular/router";
import  * as enum_ from  "../../../Enum/enum.model";
import {TaskPriority, TaskType} from '../../../Enum/enum.model';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeamService} from "../../../services/team-service/team.service";
import {Employee, GetTeam, TeamMembers} from "../../../Models/Team/team.model";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {

  public enumValue = enumValues;
  public taskType = enum_.TaskType ;
  public selectedTaskType = enum_.TaskType.FeatureRemove ;

  public taskPriority = enum_.TaskPriority ;
  public selectedTaskPriority = enum_.TaskPriority.Low ;

   TaskFormGroup !: FormGroup<any>  ;
   tasks !: CreateTasks;
   @Input() projectID !: number ;
   projectName !: string ;

   dropdownList :TeamMembers[] = [];
   selectedItems: TeamMembers[] = [];
   employees: Employee[] = [];
   dropdownSettings = {};

   team:GetTeam;
   teamId!:number;
   empId :string | undefined;
  constructor(private  taskService : TaskServices ,
              private route: ActivatedRoute,
              private  teamService: TeamService,
              private  fb : FormBuilder ,
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
      name : ['' ] ,
      description : [''] ,
      projectId: [this.projectID] ,
      taskType : [this.selectedTaskType,Validators.required] ,
      taskPriority : [this.selectedTaskPriority,Validators.required] ,
      estimatedDueDate : [''],
      assignedTeamMember : this.fb.group({
        id: this.empId ,
        teamId:this.teamId
      })
    });
   this.getTeamMembersProject();
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
      taskType : this.taskType_?.value ,
      estimatedDueDate : this.estimatedDueDate?.value,
      priority : this.TaskPriority_?.value,
      projectId :  this.projectID as number ,
      assignedTeamMember : this.assignedTeamMember_?.value,
    }

     creatTask_!.assignedTeamMember!.id = this.empId;
    // Handle the response, update tasks array or perform other operations

    this.taskService.addTask(creatTask_).subscribe(task => {
      this.tasks = task ;
      console.log(task)
      // Close the dialog

      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

  getTeamMembersProject(){
   this.teamService.getTeamByID(this.teamId).subscribe(
     res => {


       this.team = res;
       this.dropdownList = this.team.teamMembers  ;
       this.selectedItems = this.team.teamMembers ;

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
     });


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
}
