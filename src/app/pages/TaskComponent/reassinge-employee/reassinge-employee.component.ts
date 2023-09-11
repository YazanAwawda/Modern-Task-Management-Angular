import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Employee, GetTeamMembers, TeamMembers} from "../../../Models/Team/team.model";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {TeamService} from "../../../services/team-service/team.service";
import {TaskFlowService} from "../../../services/task-flow-service/task-flow";
import {ToastrService} from "ngx-toastr";
import {CreateTaskComponent} from "../create-task/create-task.component";
import {TaskServices} from "../../../services/task-service/task-service";
import {Router} from "@angular/router";

@Component({
  selector: 'assing-employee',
  templateUrl: './reassinge-employee.component.html',
  styleUrls: ['./reassinge-employee.component.scss']
})
export class ReassingeEmployeeComponent  implements  OnInit {

 @Input() teamId : number ;
 @Input() taskId : number ;
  dropdownList :GetTeamMembers[] = [];
  selectedItems: GetTeamMembers[] = [];
  employees: Employee[] = [];
  dropdownSettings = {};

  teamMembers:GetTeamMembers[];
  constructor(
    private  dialogRef: MatDialogRef<ReassingeEmployeeComponent>,
    private  teamService : TeamService ,
    private  flowService : TaskFlowService,
    private  router :  Router,
    private   toasty : ToastrService ,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.teamId = data.teamId;
    this.taskId = data.taskId ;

  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.teamId = this.data.teamId;
    this.taskId = this.data.taskId;
    this.getEmployees();
  }

  getEmployees(){

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
  empId :string | undefined;

  onEmployeeSelect(item: any) {
    console.log(item);
    this.empId = item.id;
  }
  onEmployeeDeSelect(item: any) {
    console.log(item);
    this.empId = undefined;
  }

  ReAssignTask(taskId:number ,id: string) {
    this.flowService.assignTask(this.taskId ,this.empId).subscribe(res => {
      this.toasty.success("Task has been redirected.")
      console.log(res);
      this.close();
      window.location.reload();
    });
  }


}
