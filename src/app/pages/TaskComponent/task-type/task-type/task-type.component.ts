import {Component, Inject, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import { TaskType } from 'src/app/Models/TaskType/task-type';
import {TaskTypeService} from "../../../../services/task-type-service/task-type";
import {PermissionService} from "../../../../services/permission-service/permission.service";

@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrls: ['./task-type.component.scss']
})
export class TaskTypeComponent {
  typeForm !: FormGroup<any>;
  taskType: TaskType[] = [];
  showEditForm = false;
  selectedTaskType: TaskType | undefined;
  hiddenItem: { [key: number]: boolean } = {};

  @ViewChild('deleteItem') deleteItemModal: TemplateRef<any>;
  private  deleteItemDialogRef : MatDialogRef<TemplateRef<any>>;
  constructor(private fb: FormBuilder,
              private toastyService: ToastrService,
              public dialogRef: MatDialog,
              public  permissionService : PermissionService ,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private taskTypeService: TaskTypeService) {
  }

  ngOnInit(): void {

    this.typeForm = this.fb.group({
      id: [],
      name: ['', Validators.required]
    });

    this.getAllTaskType();

  }

  getAllTaskType() {
    this.taskTypeService.getTaskTypes().subscribe(res => {
      this.taskType = res;
      console.log(res);
    })
  }

  onCreateType() {
    const createType: TaskType = {
      id : this.typeForm.value.id ,
      name: this.typeForm.value.name
    }
    this.taskTypeService.addTaskType(createType).subscribe(res => {
      this.selectedTaskType = res;
      console.log(res);
      this.getAllTaskType();
      if (this.showEditForm && this.selectedTaskType) {
        this.toggleEditForm(this.selectedTaskType);
      }

    })
  }

  toggleEditForm(id: any) {
    this.showEditForm = !this.showEditForm;
    this.hiddenItem = {}
    this.hiddenItem[id] = true;
  }


  cancelEdit(item: any) {
    this.showEditForm = false; // Hide the edit form
    this.hiddenItem = {}; // Reset hidden comments
  }


  onEditType(taskType_: TaskType) {

    const taskType: TaskType = {
      id: taskType_.id,
      name: this.typeForm.value.name
    }
    taskType_.id = taskType.id;
    taskType_.name = taskType.name;

    this.toggleEditForm(taskType_);

    this.taskTypeService.editTaskType(taskType)
        .subscribe(res => {
              if (res) {
                this.toastyService.success("TaskType Updated Success.")
              }
              console.log(res);
            }, error => {
              this.toastyService.error("An error occurred.", error)
            }
        );
  }


  onDeleteType(id:number){
    this.taskTypeService.deleteTaskType(id).subscribe(res => {
      console.log(res);
      this.getAllTaskType();
      this.toastyService.success("Deleted Done.")
    } , err => {
      this.toastyService.error("An Error Occurred.")
    })
  }


}
