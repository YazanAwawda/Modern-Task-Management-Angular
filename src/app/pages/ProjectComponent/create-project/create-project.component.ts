import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,FormControl,  Validators} from "@angular/forms";
import {ProjectService} from "../../../services/project-service/project.service";
import {CreateProject} from "../../../Models/Project/project.model";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {IDropdownSettings, NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {TeamService} from "../../../services/team-service/team.service";
import {GetAvailableTeams} from "../../../Models/Team/team.model";
import {PermissionService} from "../../../services/permission-service/permission.service";
import {PermissionKeyValue} from "../../../Models/Permission/permission-model";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";

// https://lordicon.com/icons/wired/flat?group=free&categoryId=98
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements  OnInit{

  projectForm !: FormGroup ;
  project_ !: CreateProject ;
  availableTeams !: GetAvailableTeams[] ;
  file !: File[];
  teamID !: number;
  dropdownList:GetAvailableTeams[] = [];
  selectedItems : GetAvailableTeams[] = [];
  dropdownSettings = {};

  constructor(private  projectService : ProjectService ,
              private  teamServices : TeamService ,
              private toasty: ToastrService,
              private  fb : FormBuilder,
               private  permission : PermissionService
              , private  router : Router) {
  }
  ngOnInit(): void {

    this.projectForm = new FormGroup<any>({
      name : new FormControl('') ,
      description : new  FormControl(''),
      estimatedStartDate : new FormControl ('') ,
      estimatedEndDate : new FormControl(' ') ,
      teamId : new FormControl('')
    });

    this.GetAvailableTeam();
  }







  projectData() : CreateProject {
    return this.project_ = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
      estimatedStartDate: this.projectForm.value.estimatedStartDate ,
      estimatedEndDate : this.projectForm.value.estimatedEndDate ,
      teamId : this.teamID
    };
  }
  // } , error : (error : any) => {
  //
  //     // if (error.status === 400) {
  //     //   // Handle name duplication error
  //     //   this.toasty.error('Project name already exists.');
  //     // } else if (error.status === 400 && error.error === 'DescriptionTooShort') {
  //     //   // Handle description length error
  //     //   this.toasty.error('Description must be at least 30 characters.');
  //     // } else if (error.status === 400 && error.error === 'TeamIdRequired') {
  //     //   // Handle missing team ID error
  //     //   this.toasty.error('Team ID is required.');
  //     // } else {
  //     //   // Handle other errors
  //     //   this.toasty.error('An error occurred while creating the project.');
  //     // }

  onShow(){
    return          this.toasty.success('Project created successfully.', 'Success');
  }
  onSubmit(){
     this.projectService.createProject(this.file,this.project_ ).subscribe({
       next: () => {
          this.onShow();
       },
       error: (err : any) => {
         this.toasty.success('Project created successfully.');
         this.router.navigate(['/ui-components/project-list'])

       }
      });

    if(this.file != undefined || this.file != null ){
      this.handleFileInput(event);
    }
     this.projectData();
  }

  handleFileInput(event :Event | any){
    let projectFile = this.fb.group({
      files : [(event.target as HTMLInputElement).files]
    });
    (event.target as HTMLInputElement).files = null ;
    (event.target as HTMLInputElement).value = "" ;
  }

  onFileSelected(event : any){
    this.file = event.target.files ;
  }

  GetAvailableTeam(){
 this.teamServices.GetAvailableTeam().subscribe(res=>{

   this.availableTeams = res;
   this.dropdownList = this.availableTeams ;

   this.availableTeams.map(item => {
     return<GetAvailableTeams>{
       id:item.id ,
       teamName : item.teamName
     }
   });


   for (const re of res) {
     this.teamID = re.id;
   }


   this.dropdownSettings = <IDropdownSettings> {
     singleSelection: true,
     idField: 'id',
     textField: 'teamName',
     allowSearchFilter: true,
     closeDropDownOnSelection: false,
     showSelectedItemsAtTop: true,
     defaultOpen: false,
     itemsShowLimit: this.availableTeams.length,
     selectedItems : this.availableTeams
   };


   this.onTeamSelect(this.selectedItems);
   this.onTeamDeSelect(this.selectedItems);
   console.log(this.selectedItems);

   });

  }

  onTeamSelect(item: any){
    console.log(item);
  }

  onTeamDeSelect(item:any){
    console.log(item);
  }

isControlInvalid(
  controlName : string ,
  errName? : string){
const control =
  this.projectForm.get(controlName);
if(!control) {
  return false ;
}
return  errName ? control.hasError(errName) : control.invalid ;
}


  isControlTouched(controlName : string) : boolean{
   const control = this.projectForm.get(controlName) ;
   return  control ? control.touched  : false;
  }

}

// this.toastr.warning('Please wait for uploaded');
// setTimeout(() => {
//   this.toastr.success("You have successfully posted a new project");
//   this.router?.navigate(['/ui-components/project-list']);
//   this.projectForm.reset();
// }, 3000);
// }, (err : HttpErrorResponse) => {
//   const DateNow = new Date() ;
//   if(err.status === 500 )
//   {
//     this.toastr.error('You can not have the same project name at the same time , you must change it.  ' );
//     throwError(err);
//   }
//   if (formatDate(this.projectData().estimatedStartDate) === formatDate(DateNow)) {
//     this.toastr.error(`The Date must be greater than ${formatDate(DateNow)}`);
//     throwError(err) ;
//   }
//   if(this.projectData().estimatedStartDate === null
//     && this.projectData().name === ''
//     && this.projectData().description === '' ){
//     this.toastr.error("Kindly provide the required fields");
//   }
// });
