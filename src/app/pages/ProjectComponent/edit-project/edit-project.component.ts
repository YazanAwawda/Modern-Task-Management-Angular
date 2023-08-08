import {Component, OnInit} from '@angular/core';
import {EditProject, GetProjectById} from "../../../Models/Project/project.model";
import {ProjectService} from "../../../services/project-service/project.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements  OnInit {

  editProject : EditProject;
  projectEditForm :  FormGroup;
  projectId: number;
  project :GetProjectById;
  constructor(private  projectService : ProjectService ,
              private  fb : FormBuilder,
              private  route : ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.projectId = +params['id'];});

    this.projectEditForm = this.fb.group({
      name : ['' , Validators.required],
      description:[' ' , Validators.required]
    })

    this.getProjectByID();
  }
  editProjectData(){

    const editForm : EditProject = {
      id : this.projectId ,
      name : this.projectEditForm.get('name')?.value ,
      description : this.projectEditForm.get('description')?.value
    }
    this.projectService.editProject(editForm).subscribe(res=>{
      this.editProject = res ;
    });
}


getProjectByID(){
    this.projectService.getProjectByID(this.projectId).subscribe(
      res => {
        this.project = res;
      }
    )
}
}
