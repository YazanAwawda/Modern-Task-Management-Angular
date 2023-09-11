import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder ,FormGroup} from "@angular/forms";
import {TeamService} from "../../../services/team-service/team.service";
import {ActivatedRoute} from "@angular/router";
import {CheckBoxEmployee, EditTeam, Employee, GetTeam, TeamMembers} from "../../../Models/Team/team.model";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import { MultiSelectComponent} from "ng-multiselect-dropdown";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})

export class EditTeamComponent implements  OnInit {

  teamForm : FormGroup;
  teamId : number ;
  employees : Employee[]  = [];
  employees1 : Employee[]  = [];
  selectedItems : any[] = [];
  employeeId  :string ;
  @ViewChild("EmployeesSelectDropDown") EmployeesSelectDropDown : MultiSelectComponent;
  teamData : GetTeam ;
  teamMembers : TeamMembers[] = [] ;
  originalTeamMembers : TeamMembers[] = [] ;
  checkboxList : CheckBoxEmployee[] =[]

  public  team : EditTeam = {
    id : 0 ,
    teamName : "" ,
    teamMembers : [{
      id : ""
    } ]
  }
    modalRef?: BsModalRef;
  constructor(  private  teamService : TeamService,
                private  route : ActivatedRoute,
                private  fb : FormBuilder,
                private  toast : ToastrService ,
                private modalService: BsModalService)
    {}

  ngOnInit(): void {


    this.route.params.subscribe(x => {
    this.teamId = x['id'];
    });

      this.team = {
          ...this.team,
          id: this.teamId
      }

      this.getOnlyTeam();
    this.getEmployees().subscribe(res => {

        this.employees = res
        this.employees = this.employees.filter(employee => {
            return !this.teamMembers.some(emp1 => emp1.employee.id === employee.id);
        });
    });;




  }

    openModal(template: TemplateRef<any>) {
    this.getEmployees().subscribe(res => {

        this.employees = res
        this.employees = this.employees.filter(employee => {
            return !this.teamMembers.some(emp1 => emp1.employee.id === employee.id);
        });

        this.checkboxList = this.employees.map(x => <CheckBoxEmployee>{
            id: x.id,
            name: x.name,
            email: x.email,
            imageUrl: x.imageUrl,
            checked: false
        });
        this.modalRef = this.modalService.show(template);

    });

    }
updateTeam(){
      let team : EditTeam = {
        id : this.teamId ,
        teamName : this.teamForm.value.teamName,
        teamMembers :  this.teamMembers.map(x => {
         return {
           id: x.employee.id
         }
        })
      }
      console.log(team);
      this.teamService.editTeam(team).subscribe(res => {
          for (const re of res.succes) {
            this.toast.success(re)
          }
          for (const re of res.errors) {
              this.toast.error(re)
          }
        console.log(res);
      })
}

getOnlyTeam(){
    this.teamService.getTeamByID(this.teamId).subscribe(res => {
        this.teamForm = this.fb.group({
            teamName : this.fb.control(res.teamName)
        })
      this.teamData = res;
      this.teamMembers = this.teamData.teamMembers;
      this.originalTeamMembers = this.teamData.teamMembers;
      this.teamMembers.map(member => {

        return<TeamMembers>{

          id : this.teamId ,
          employee : {
            id : member.employee.id,
            name : member.employee.name
          },
          isTeamLeader : member.isTeamLeader
        }

      });

      this.employees1 =  this.teamMembers.map(item => {
        return item.employee;
      });

      this.employees1 = this.teamMembers.map(emp => {
        return <Employee> {
          id : emp.employee.id ,
          name : emp.employee.name
        }
      });
      console.log(this.employees1);
      console.log(res);



       this.employees = this.employees.filter(employee => {
        return !this.employees1.some(emp1 => emp1.id === employee.id);
      });
       console.log(this.employees);
    });
}
getEmployees() : Observable<Employee[]> {
 return this.teamService.getAllEmployees();
}





  removeEmployee(member: any) {
      if (member) {
          // Find the index of the member you want to remove based on some criteria
          const indexToRemove = this.teamMembers.findIndex(item => {
              // Replace this condition with your criteria for matching the member to remove
              return item.employee.id === member.employee.id;
          });

          // Check if the member to remove was found
          if (indexToRemove !== -1) {
              // Use splice to remove the member at the found index
              this.teamMembers.splice(indexToRemove, 1);


          }
      }

      this.employeeId = member.id
      this.employeeId = "" ;
      return  this.employeeId;
    }

  // onAddEmployee(item : any){
  // this.employees.map(item => {
  //   return <Employee> {
  //     id : item.id ,
  //     name : item.name
  //   }
  // })
  // this.teamMembers.push({
  //   employee : {
  //     id : item.id ,
  //     name : item.name
  //   },
  //   isTeamLeader : false
  // });
  //     this.EmployeesSelectDropDown.data = this.EmployeesSelectDropDown.data.filter(x => x.id === item.id);
  // this.employeeId = item.id ;
  // return this.employeeId;
  // }

AddEmployees(){
    let teamMembersToAdd = this.checkboxList.filter(x => x.checked).map(x => <TeamMembers>{
        employee: <Employee>{
            id: x.id,
            name: x.name,
            email: x.email,
            imageUrl: x.imageUrl
        },
        isTeamLeader: false
    })
   this.teamMembers =  this.teamMembers.concat(teamMembersToAdd)
    this.modalRef.hide()
}



}
