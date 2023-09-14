import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TeamService} from "../../../services/team-service/team.service";
import {GetTeam, TeamMembers} from "../../../Models/Team/team.model";
import {ActivatedRoute} from "@angular/router";
import * as enumModal from "../../../Enum/enum.model";
import {enumToString} from "../../../EnumHelper/enum.helper";
import {GetProjects} from "../../../Models/Project/project.model";

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements  OnInit {
  enumModal = enumModal ;
  teamData : GetTeam ;
  teamId:number ;
  @ViewChild('search' , {static : false}) searchElement !: ElementRef ;
  role:{ role: string; colorClass: string; };

  searchTerm : string = "" ;
  AllEmp : TeamMembers[] = [] ;
  filteredEmp : TeamMembers[] = [] ;

  searchTerm1 : string = "" ;
  filteredProject : GetProjects [] = [] ;
  allProject : GetProjects [] = [] ;
  constructor(private  teamService : TeamService , private  route : ActivatedRoute) {
  }
  ngOnInit( ): void {
    this.getTeamData();
  }

  getTeamData(){
    this.route.params.subscribe( x =>
     this.teamId = +x['id'])
    this.teamService.getTeamByID(this.teamId).subscribe(res => {

      this.teamData = res;

      this.AllEmp = this.teamData.teamMembers ;
      this.filteredEmp = this.AllEmp;

      this.allProject = this.teamData.projects;
      this.filteredProject = this.allProject ;

      console.log(res);
      this.getTeamLeader();
    });
  }

  onSearchEmployee(){
    let searchTerm = this.searchTerm.trim();
    this.filteredEmp = this.AllEmp.filter(item =>
        (item.employee.name.toLowerCase().includes(searchTerm) ||
            (item.employee.name.toUpperCase().includes(searchTerm))
            || (item.employee.name.includes(searchTerm)) ));
  }

  onSearchProject(){
    let searchTerm = this.searchTerm1.trim();
    this.filteredProject = this.allProject.filter(item =>
        (item.name.toLowerCase().includes(searchTerm) ||
            (item.name.toUpperCase().includes(searchTerm))
            || (item.name.includes(searchTerm)) ));
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
  getTeamLeader():string {
    return this.teamData.teamMembers.filter(x => x.isTeamLeader === true)[0].employee.id;
  }

  protected readonly enumToString = enumToString;
}
