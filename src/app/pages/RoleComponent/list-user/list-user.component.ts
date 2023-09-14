import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../services/team-service/team.service";
import {Employee} from "../../../Models/Team/team.model";
import {Role} from "../../../Models/Permission/permission-model";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements  OnInit {

  employeesSystem : Employee[];

  constructor(private  teamService :TeamService) {
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(){
   this.teamService.getAllEmployees().subscribe(res => {
     this.employeesSystem = res ;
     console.log(res);
   })
  }

}
