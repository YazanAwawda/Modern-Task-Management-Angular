import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamService} from "../../../services/team-service/team.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EditTeam, Employee, GetTeam, TeamMembers} from "../../../Models/Team/team.model";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {IDropdownSettings, MultiSelectComponent} from "ng-multiselect-dropdown";
import {Observable, of, retry} from "rxjs";
import {cloneDeep} from "lodash-es";
import {CreateProject} from "../../../Models/Project/project.model";

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})

export class EditTeamComponent implements  OnInit {


//   teamId:number;
//   editTeamFormGroup : FormGroup;
//   team : GetTeam;
//   employeeId:string | undefined ;
//   editTeam : EditTeam ;
//   color: boolean = false;
//   changeColor= [this.color];
//
//
//   selectedEmployeeToAdd : TeamMembers | undefined;
//
//
//   teamMembers:TeamMembers[] = [] ;
//   allEmployees: Employee[] = [];
//
//   employeesToBeAdded : Employee [] = [] ;
//   dropdownListEmp : Employee [] = [ ] ;
//   selectedEmp : Employee [] = [] ;
//   dropdownSettingsEmp = {} ;
//   addMember: Employee[];
//   memberId:any ;
//
//   // dropdownSettings = {};
//   // private dropDownListObject: any;
//   constructor(private  fb :FormBuilder,
//               private  teamService : TeamService,
//               private  route : ActivatedRoute,
//               private router: Router,
//               private  dialog : MatDialog )
//   {}
//
//    ngOnInit() {
//
//     this.route.params.subscribe(params => {
//       this.teamId = +params['id'];
//     });
//
//   this.editTeamFormGroup = this.fb.group({
//     id :  [this.teamId] ,
//     teamName : new FormControl('' , Validators.required),
//     teamMembers : [
//       {
//         id : [''] ,
//         teamId : [this.teamId]
//       }
//     ]
//   })
//
//   this.getTeam();
//   this.getAlEmp();
//   }
//
//   onUpdateTeam(){
//
//   const  editTeam : EditTeam = {
//     id : this.editTeamFormGroup.get('id')?.value ,
//     teamName: this.editTeamFormGroup.get('teamName')?.value,
//     teamMembers : this.onAddMemberClicked()
//   }
//    const  xMembersArr : any []  =  editTeam.teamMembers;
//
//     xMembersArr.map(memberX => {
//     return<TeamMembers>{
//       employee : {
//         id : this.employeeId
//       }
//     }
//   });
//
//     this.allEmployees = xMembersArr.map(emp => {
//       return  emp.id;
//     });
//
//   this.teamService.updateTeam(editTeam).subscribe(res=> {
//   this.editTeam = res;
//   });
// }
//
//
//     getTeam(){
//
//      this.teamService.getTeamByID(this.teamId).subscribe(res => {
//
//       this.team = res;
//
//       // this.selectedItems = this.team.teamMembers ;
//       // this.teamMembers = this.team.teamMembers;
//
//
//       this.team.teamMembers.map(item => {
//         return<TeamMembers>{
//           employee : {
//             id : item.employee.id ,
//             name : item.employee.name
//           }
//         }
//       });
//
//       this.allEmployees =  this.team.teamMembers.map(x => {
//         return x.employee;
//       })
//
//       // this.dropdownSettings = <IDropdownSettings> {
//       //   singleSelection: false,
//       //   idField: 'id',
//       //   textField: 'name',
//       //   closeDropDownOnSelection: false,
//       //   showSelectedItemsAtTop: true,
//       //   defaultOpen: false,
//       //   itemsShowLimit: this.allEmployees.length,
//       //   limitSelection:1 ,
//       //   selectedItems : this.selectedItems
//       // }
//       //
//       // this.onEmployeeSelect(this.selectedItems);
//       // this.onEmployeeDeSelect(this.selectedItems);
//       // console.log(this.selectedItems);
//     });
//
//     }
//   // onEmployeeSelect(item:any){
//   //   console.log(item);
//   //   this.employeeId = item.id;
//   // }
//   // onEmployeeDeSelect(item:any){
//   //   console.log(item);
//   //   this.employeeId = undefined;
//   //
//   // }
//
//   removeTeamMember(member: any): void {
//     if (member) {
//       const empArr = this.teamMembers.map(item_ => {
//         return <TeamMembers>{
//           employee: {
//             id: item_.employee.id,
//             name: item_.employee.name
//           }
//         }
//       });
//
//       const team = empArr.find(i => {
//         i.employee.id = member.id
//       });
//
//       const index1 = empArr.indexOf(team!);
//
//       // empArr.splice(index1, 1);
//       this.changeColor[index1] = !this.changeColor[index1];
//
//
//       const emp = <Employee>{
//         id: member.id,
//         name: member.name
//       }
//
//       const item = this.allEmployees.find(i => i.id == emp.id);
//
//       const index2 = this.allEmployees.indexOf(item!);
//
//       // this.allEmployees.splice(index2,1);
//
//       this.changeColor[index2] = !this.changeColor[index2];
//
//     }
//
//
//   }
//   // addTeamMember(member : any){
//   //   let empArr = this.teamMembers.map(item_ => {
//   //     return <TeamMembers>{
//   //       employee : {
//   //         id: item_.employee.id,
//   //         name: item_.employee.name
//   //       }}
//   //   });
//   //
//   //   let team =  empArr.find(i => {
//   //     i.employee.id = member.id
//   //   });
//   //
//   //
//   //   let emp = <Employee>{
//   //     id : member.id,
//   //     name : member.name
//   //   }
//   //   let teamMember : TeamMembers ={
//   //     id : team?.id! ,
//   //     employee : {
//   //       id  :  emp.id ,
//   //       name : emp.name
//   //     } ,
//   //     isTeamLeader : false
//   //   }
//   //
//   //
//   //   let item =   this.allEmployees.find(i => i.id == emp.id);
//   //
//   //   // let  index = this.allEmployees.indexOf(item!);
//   //   empArr.push(teamMember);
//   //
//   //   this.allEmployees.push(emp);
//   // }
//
//   getAlEmp(){
//     this.teamService.getAllEmployees().subscribe(res => {
//     this.employeesToBeAdded = res;
//     this.dropdownListEmp = this.employeesToBeAdded;
//     this.selectedEmp = this.employeesToBeAdded ;
//      const emp =  this.employeesToBeAdded.map(item => {
//       return<Employee>
//         {
//         id : item.id ,
//         name : item.name
//         }
//     });
//       // Update addMember with the selected member
//       this.addMember = this.employeesToBeAdded.map(item => {
//         if (item.id  === this.memberId) {
//           return {
//             id: item.id,
//             name: item.name
//           };
//         } else {
//           return {
//             id: item.id,
//             name: item.name
//           };
//         }
//       })
//       // this.addMember.filter(employee =>  !this.allEmployees.includes(
//       //  employee = {
//       //    id: employee.id ,
//       //    name : employee.name
//       // }
//       // ));
//
//       this.addMember = this.addMember.
//       filter(employee =>
//         !this.allEmployees.some(emp => emp.id === employee.id));
//
//
//       this.dropdownSettingsEmp = <IDropdownSettings>
//      {
//
//          singleSelection: false,
//          idField: 'id',
//          textField: 'name',
//          closeDropDownOnSelection: false,
//          showSelectedItemsAtTop: true,
//          defaultOpen: false,
//          itemsShowLimit: this.employeesToBeAdded.length,
//          limitSelection:1 ,
//          selectedItems : this.selectedEmp
//      }
//      this.onMemberSelected(this.selectedEmp);
//     });
//   }
//
//
//
//   updateTeam(){
//     const editTeam : EditTeam = {
//       id : this.teamId,
//       teamName : this.editTeamFormGroup.get('teamName')?.value ,
//       teamMembers : [{
//         id : this.onMemberSelected(this.memberId),
//         teamId: this.teamId
//       }]
//     }
//     this.teamService.updateTeam(this.editTeam).subscribe(res=>{
//       this.editTeam = res;
//     })
//   }
//
//   onMemberSelected(member: any): any {
//     this.selectedEmployeeToAdd = {
//       isTeamLeader: false,
//       employee : {
//         id: member.id,
//         name: member.name
//       },
//       id : this.teamId
//     }
//   }
//
//     memberEmp :  {id : string , teamId:number} ;
//     onAddMemberClicked() : any {
//          if(this.selectedEmployeeToAdd !== undefined)
//            // this.allEmployees.push(this.memberEmp);
//
//            return this.memberEmp;
//
//   }
//
//   onMemberDeSelected(){
//    this.selectedEmployeeToAdd = undefined;
//   }
    constructor(private  fb :FormBuilder,
                private  teamService : TeamService,
                private  route : ActivatedRoute,
                private  dialog : MatDialog )
    {}

    teamFormGroup : FormGroup ;
    teamMemberFormGroup : FormGroup ;
    team : GetTeam;
    teamId: number;
    Team !: EditTeam;
    TeamMember : TeamMembers[] ;
    AllEmployees : Employee[] = [];
    dropdownList: Employee[]  = [];
    selectedItems: Employee[]  = [];
    EmployeeSelectedToAdd !: Employee  ;
    employeeId  :string ;
    dropdownSettings = {};
    changeColor = true;
    classColor = 'bg-success';
    @ViewChild("TeamMemberSelectDropDown") TeamMemberSelectDropDown : MultiSelectComponent;

    ngOnInit() {
      this.buildEditTeamForm();
      this.GetTeam();
      this.GetAllEmployees();
      this.TeamData();
    }

    buildEditTeamForm(){

      this.teamMemberFormGroup = this.fb.group(
          {
              id: new FormControl('') ,
              teamId : new FormControl()
          }
      )


      this.teamFormGroup = this.fb.group({
      id : new  FormControl(this.teamId) ,
      teamName : new  FormControl('') ,
      teamMembers : this.TeamMember
      })
    }

    GetTeam(){
      this.route.params.subscribe(params => {
      this.teamId = +params['id']
      })
        this.teamService.getTeamByID(this.teamId).subscribe(res => {
        this.team = res;

        this.TeamMember = this.team.teamMembers;

        this.TeamMember.map(member => {

          return<TeamMembers>{

            id : this.teamId ,
            employee : {
              id : member.employee.id,
              name : member.employee.name
            },
            isTeamLeader : member.isTeamLeader
          }

        });



            this.AllEmployees =  this.TeamMember.map(item => {
             return item.employee;
               });

        this.AllEmployees = this.TeamMember.map(emp => {
          return <Employee> {
            id : emp.employee.id ,
            name : emp.employee.name
          }
        });
        });
    }
      GetAllEmployees(){
      this.teamService.getAllEmployees().subscribe(res => {
        this.AllEmployees = res;
        this.dropdownList = this.AllEmployees ;
        this.selectedItems = this.AllEmployees ;

        this.dropdownList = this.AllEmployees.map(emp => {
          return <Employee> {
            id : emp.id ,
            name : emp.name
          }
        });

      // Update addMember with the selected member
      this.AllEmployees.map(item => {
        if (item.id  === this.employeeId) {
          return {
            id: item.id,
            name: item.name
          };
        } else {
          return {
            id: item.id,
            name: item.name
          };
        }
      })


          // Create a set of employee IDs that are part of the TeamMember array for efficient lookup.
          const teamMemberIds =
              this.TeamMember.map(member  => member.employee.id )!;

          // Filter out employees who are already part of the team members list.
          this.AllEmployees = this.AllEmployees.filter
          (employee => !teamMemberIds.includes(employee.id));

          this.onEmployeeSelect(this.selectedItems);
          this.onEmployeeDeSelect(this.selectedItems);

          this.dropdownSettings = <IDropdownSettings>{
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            limitSelection:     this.AllEmployees.length  , // For disabled item that not selected alone item of others .for logic at line 114
            enableCheckAll: false,
            itemsShowLimit:     this.AllEmployees.length,
            allowSearchFilter: true,
            closeDropDownOnSelection: false,
            showSelectedItemsAtTop: true,
            defaultOpen: false,
            selectedItems :this.selectedItems
        };


      })}

    // onToggleColor(index: number): void {
    //     let changeColor: boolean[] = Array(this.TeamMember.length).fill(false);
    //     changeColor[index] = true;
    //     setTimeout(() => {
    //         changeColor[index] = false;
    //     }, 300); // Change the background color for 300 milliseconds (adjust the duration as needed)    }
    // }

// Function to check if a member exists in the newlyAddedMembers array


    tempTeam : any[ ] ;

    isInNewlyAddedMembers(member: TeamMembers): boolean {
        return this.tempTeam.some((item) => item.employee.id === member.employee.id);
    }
    onRemoveMember(member:any) {
    if(member){
       this.tempTeam = this.TeamMember ;
       const item = this.tempTeam.find(x => x.employee.id == member.id)!;
       const index =      this.tempTeam.indexOf(item!);
    // this.changeColor = !this.changeColor;
    // this.classColor = this.changeColor ? 'bg-success' : 'bg-warning';
        this.tempTeam.splice(index,1);
     }
    }

   onAddEmployee(item : any){
       const existingMember = this.TeamMember.find(member => member.employee.id === this.EmployeeSelectedToAdd.id);
       if (!existingMember) {
       this.TeamMember.push({
          isTeamLeader : false ,
          employee : this.EmployeeSelectedToAdd,
          id : this.teamId
      });
       }
   }

   onRemoveEmployee(item:any){

       if (this.EmployeeSelectedToAdd) {
           this.TeamMember = this.TeamMember.filter(
               (member) =>
                    member.employee.id
                   !== this.EmployeeSelectedToAdd.id
           );
           console.log("Employee with ID", item, "removed from TeamMember array.");
       }

   }
  onEmployeeSelect(item:any){

    this.EmployeeSelectedToAdd = {
     id : item.id ,
     name : item.name
      }

      console.log(this.EmployeeSelectedToAdd);
    }

  onEmployeeDeSelect(item :any){
      console.log(item);
  }
    openDialog(matDialog:TemplateRef<any>):MatDialogRef<any> {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '550px';
        dialogConfig.height = "250px"
        dialogConfig.position = {
            top:'10px',
            right:'10px'
        };
        return this.dialog.open(matDialog,dialogConfig);
    }


    TeamData() : EditTeam {
        return this.Team = {
            id : this.teamFormGroup?.value.id ,
            teamName : this.teamFormGroup?.value.name,
            teamMembers : this.teamFormGroup?.value.teamMembers
        };

    }
    UpdateTeam(){
      this.TeamData();
        const  xMembersArr : any []  =  this.TeamData().teamMembers;
            xMembersArr.map(memberX => {
           return<TeamMembers>{
           employee : {
           id : this.EmployeeSelectedToAdd?.id
           }
         }
        });

    this.AllEmployees = xMembersArr.map(emp => {
      return  emp.id;
    });

        this.teamService.updateTeam(this.TeamData()).subscribe(res => {
            this.Team = res ;
        })
    }

}
