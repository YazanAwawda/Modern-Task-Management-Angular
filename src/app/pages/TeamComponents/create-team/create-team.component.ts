import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TeamService} from "../../../services/team-service/team.service";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateTeam, EditTeam, Employee, TeamLeader} from "../../../Models/Team/team.model";
import {IDropdownSettings, MultiSelectComponent} from 'ng-multiselect-dropdown';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable , of , map} from "rxjs";
// import deepClone from 'deep-clone';
import  {cloneDeep} from "lodash-es";
import {types} from "sass";
import String = types.String;
import {ListItem} from "ng-multiselect-dropdown/multiselect.model";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent  implements  OnInit{

    TeamFormGroup !: FormGroup  ;
    private  employeeData : [] = [] ;
    actionBtn : string = 'Save';
    @ViewChild("EmployeesSelectDropDown") EmployeesSelectDropDown : MultiSelectComponent;
    createTeam : CreateTeam ;

    allEmployees:Employee[] = [];
    ExcludedEmployees:Observable<Employee[]>;
    AllEmps : Employee [] = [] ;
    EmployeesObservable : Observable<Employee[]> ;

    teamLeader : TeamLeader[] = [] ;
    selectedTeamLeaders : TeamLeader[] = [] ;
    selectedTeamLeader : TeamLeader | undefined ;
    dropdownList : any ;
    selectedItems : any[] = [];
    dropdownSettingsTeamLeader = {};
    dropdownSettingsEmployees = {};


  constructor(
     private  teamServices  : TeamService
    ,private  fb : FormBuilder ,
     private matDialogRef : MatDialogRef<CreateTeamComponent> ,
     @Inject(MAT_DIALOG_DATA) public addData : any) {}

  ngOnInit(): void {
  this.buildTeamForm();
  this.getAllEmployees();
  }


  buildTeamForm(){
    this.TeamFormGroup = this.fb.group({
      teamName : ['' ,Validators.required],
      teamLeader :  this.fb.group( ['' , Validators.required]),
      employees :this.fb.array([this.fb.group(['' , Validators.required])] )});
  }

getAllEmployees(){
this.teamServices.getAllEmployees().subscribe((employees :Employee[]) => {
  this.allEmployees = employees ;
  this.AllEmps = employees ;
  this.dropdownList = employees ;

  this.ExcludedEmployees = of(this.allEmployees) ;
  this.EmployeesObservable = of(this.AllEmps) ;

  this.dropdownSettingsEmployees = <IDropdownSettings>{
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    limitSelection: this.allEmployees.length - 1 , // For disabled item that not selected alone item of others .for logic at line 114
    enableCheckAll: false,
    itemsShowLimit: this.allEmployees.length,
    allowSearchFilter: true,
    closeDropDownOnSelection: false,
    showSelectedItemsAtTop: true,
    defaultOpen: false,
    selectedItems : employees
  }
  this.dropdownSettingsTeamLeader = {
    ...this.dropdownSettingsEmployees,
    singleSelection: true,
    itemsShowLimit : this.AllEmps.length,
    limitSelection : 1
  }

  console.log(this.allEmployees);
});
}

getAllTeamLeaders() : Observable<Employee[]>{
   return  this.ExcludedEmployees;
}
getEmployees() : Observable<Employee[]>
{
  return  this.EmployeesObservable ;
}
   onCreateTeam(){
 // const team : CreateTeam = this.TeamFormGroup.value ;
  const team: CreateTeam = {
    teamName: this.TeamFormGroup.get("teamName")?.value,
    teamLeader: this.selectedTeamLeader != null ? this.selectedTeamLeader : <Employee>{},
    employees : this.EmployeesSelectDropDown.selectedItems.map((value) => {
      return <Employee>{
        id: value.id,
        name: value.text
      }
    })
  }
  if(this.selectedTeamLeader == undefined) return;

  this.teamServices.CreateTeam(team).subscribe(team => {
    console.log(team);
  })
     console.log(this.TeamFormGroup.value);
   }

  onEmployeesSelect(emp:any) {
    const tempEmps = cloneDeep(this.AllEmps);
    const item = this.AllEmps.find( x=> x.id == emp.id);
    const index = this.AllEmps.indexOf(item!);

      tempEmps.splice(index, 1);

    console.log(item);
    this.EmployeesObservable = of(tempEmps);
    this.AllEmps = tempEmps;
  }
  onDeselectEmployees(emp:any){

    const tempEmps = cloneDeep(this.AllEmps) ;
    const item = this.AllEmps.find(x => x.id == emp.id) ;
    const index = this.AllEmps.indexOf(item!);
    let emps_ : Employee = {
      id : emp.id ,
      name :emp.name
    }
    tempEmps.push(emps_);
    this.EmployeesObservable = of(tempEmps);
    this.AllEmps = tempEmps;
  }

  onTeamLeaderSelect(emp:any){

      let tempEmployees = cloneDeep(this.allEmployees); // edit not efecte to original all employees array.
      const item = this.allEmployees.find(x=> x.id == emp.id);
      const index = this.allEmployees.indexOf(item!);
      console.log(index);
      if(index !== -1)
      tempEmployees.splice(index,1);
      console.log(tempEmployees);
      this.ExcludedEmployees = of(tempEmployees);
      this.allEmployees = tempEmployees;
      this.selectedTeamLeader = item;
  }
  onTeamLeaderDeSelect(emp:any){

    const tempEmployees = cloneDeep(this.allEmployees);
    const item = this.allEmployees.find(x => x.id == emp.id);
    const index = this.allEmployees.indexOf(item!);
    let  teamLeader_ : TeamLeader = {
      id : emp.id,
      name : emp.name
    }
    tempEmployees.push(teamLeader_);
    this.ExcludedEmployees = of(tempEmployees);
    this.allEmployees = tempEmployees;
  }

}
