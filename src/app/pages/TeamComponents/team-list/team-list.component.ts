import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {GetTeam, GetTeamById, TeamMembers} from 'src/app/Models/Team/team.model';
import { TeamService } from 'src/app/services/team-service/team.service';
import {TeamParams} from "../../../Models/Pagination/TeamPagination/TeamParams";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {CreateTeamComponent} from "../create-team/create-team.component";
import {ITeamPagination} from "../../../Models/Pagination/TeamPagination/TeamPagination";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  randomColor: string;


  totalCount !: number ;

  teamParams_ = new TeamParams() ;


  teams : GetTeam []  = [] ;
  TeamMembers : TeamMembers[] = [] ;

  teamId : number ;
  constructor(private teamService : TeamService
    , public dialog : MatDialog ){

    this.randomColor = this.generateRandomColor();

  }
  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  ngOnInit(): void {

  this.getAllTeam();
  }



getAllTeam(){
this.teamService.GetAllTeamWithPagination(this.teamParams_).subscribe(
  (res : ITeamPagination) => {
    this.teams = res.data ;
    this.teamParams_.PageIndex = res.pageIndex ;
    this.teamParams_.PageSize = res.pageSize ;
    this.totalCount = res.count
    console.log(res) ;
  }, err => {
    console.log(err);
  }
);
}

onPageChanged(page : number){
    if(this.teamParams_.PageIndex ! == page)  {
      this.teamParams_.PageIndex = page ;
      this.getAllTeam() ;
    }
}






}
