import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../services/team-service/team.service";
import {GetTeam} from "../../../Models/Team/team.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements  OnInit {

  teamData : GetTeam ;
  teamId:number ;

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
      console.log(res);
    });
  }


}
