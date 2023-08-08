import {Component, Inject, OnInit} from '@angular/core';
import {TeamService} from "../../../services/team-service/team.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Employee, GetAvailableTeams, TeamMembers} from "../../../Models/Team/team.model";
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IDropdownSettings} from 'ng-multiselect-dropdown';

import {ProjectService} from "../../../services/project-service/project.service";
import {ProjectAddTeam} from "../../../Models/Project/project.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-assign-project-team',
  templateUrl: './assign-project-team.component.html',
  styleUrls: ['./assign-project-team.component.scss']
})
export class AssignProjectTeamComponent implements OnInit {

    projectID : number;

    teamId : number | FormControl<number> | any;
    employeeId : string | FormControl<string> ;
    teamName : string  | FormControl<string> | any;



    teams : GetAvailableTeams []  = [] ;

    teamMembers : TeamMembers[] | string ;

    employees : Employee [] = [ ];

    dropdownList : GetAvailableTeams [] = [];

    selectedItems  :GetAvailableTeams [] = [] ;


    dropdownSettings = {};

    AddTeamProjectForm : FormGroup ;
    TeamProject  : ProjectAddTeam ;

  constructor(
    private   teamService : TeamService,
    private   projectService : ProjectService,
    private   fb : FormBuilder ,
    private  route : ActivatedRoute ,
    private   dialogRef:MatDialogRef<AssignProjectTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any )
  {
    this.projectID = data.projectID ;
    this.teams = data.teams;
    this.AddTeamProjectForm = data.AddTeamProjectForm;

    console.log(data.projectID);
  }

  ngOnInit(): void {
    this.returnAllEmployees();
    this.returnAllTeam();
    this.buildTeamProjectForm();
    this.getSingleProject();
  }

  getSingleProject(){
      this.route.params.subscribe(params => {
      this.projectID = +params['id'];});

      this.projectService.getProjectByID(this.projectID).subscribe(res => {
        console.log(res);
    });
  }
  buildTeamProjectForm(){
    this.AddTeamProjectForm = this.fb.group({
      id : [this.projectID , Validators.required],
      teamId : [this.teamId , Validators.required]
    })
  }



  returnAllEmployees(){
    this.teamService.getAllEmployees().subscribe(employees => {

      this.employees = employees ;

      for (const employee of employees) {
        this.employeeId = employee.id ;
        this.teamMembers = this.employees.filter(x => x.id == employee.id)[0].id;
      }


     console.log(employees);
    })
  }
  returnAllTeam() {
    this.teamService.GetAvailableTeam().subscribe(res => {

      this.teams = res ;

      this.dropdownList = this.teams;

      this.selectedItems = this.teams.map(item => {
        return <GetAvailableTeams>{
          id: item.id  ,
          teamName: item.teamName
        }
      });

      for (const re of this.teams) {
        this.teamId  = re.id ;
      }


      console.log(this.selectedItems);

      this.onTeamSelect(this.selectedItems);
      this.onTeamDeSelect(this.selectedItems);

      this.dropdownSettings = <IDropdownSettings> {
        singleSelection: true,
        idField: 'id' ,
        textField: 'teamName',
        limitSelection: 1,
        enableCheckAll: false,
        itemsShowLimit: this.teams.length,
        allowSearchFilter: true,
        closeDropDownOnSelection: false,
        showSelectedItemsAtTop: true,
        defaultOpen: false,
        selectedItems : this.selectedItems ,
      };
    });


  }

  onTeamProjectAdoption(id:any){
    this.selectedItems = this.teams.map(item => {
      return <GetAvailableTeams>{
        id: item.id ,
        teamName: item.teamName
      }
    });

    const teamProject  : ProjectAddTeam = {
      id : this.projectID ,
      teamId : this.teamId
    }
    this.projectService.addProjectTeam(teamProject).subscribe(res => {
    this.TeamProject = res;
    console.log(res);
  });

  }
  onTeamSelect(item: any){
     console.log(item);
  }

  onTeamDeSelect(item:any){
    console.log(item);
  }


}
