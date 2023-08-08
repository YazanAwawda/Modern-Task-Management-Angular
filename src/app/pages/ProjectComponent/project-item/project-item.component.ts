import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../../services/project-service/project.service";
import {GetProjects} from "../../../Models/Project/project.model";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements  OnInit {

  @Input("ProjectInput") project !: GetProjects ;
  @Output() deleteProject = new EventEmitter<number>();

  constructor(private  projectService : ProjectService) {
  }
  ngOnInit(): void {
  }

  onDeleteProject(project: GetProjects){
    this.deleteProject.emit(project.id);
  }
}
