import {Component, EmbeddedViewRef, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskPriorityService} from "../../../../services/task-priority-service/task-priority";
import {TaskPriority} from "../../../../Models/TaskPriority/task-priority";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {PermissionService} from "../../../../services/permission-service/permission.service";

@Component({
  selector: 'app-task-priority',
  templateUrl: './task-priority.component.html',
  styleUrls: ['./task-priority.component.scss']
})
export class TaskPriorityComponent implements  OnInit {

    priorityForm !: FormGroup<any>;
    taskPriority: TaskPriority[] = [];
    showEditForm = false;
    selectedTaskPriority: TaskPriority | undefined;
    hiddenItem: { [key: number]: boolean } = {};

    @ViewChild('deleteItem') deleteItemModal: TemplateRef<any>;
    private  deleteItemDialogRef : MatDialogRef<TemplateRef<any>>;
    constructor(private fb: FormBuilder,
                private toastyService: ToastrService,
                public dialogRef: MatDialog,
                public  permissionService : PermissionService,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private taskPriorityService: TaskPriorityService) {
    }

    ngOnInit(): void {

        this.priorityForm = this.fb.group({
            id: [],
            name: ['', Validators.required]
        });

        this.getAllTaskPriority();

    }

    getAllTaskPriority() {
        this.taskPriorityService.getTaskPriorities().subscribe(res => {
            this.taskPriority = res;
            console.log(res);
        })
    }

    onCreatePriority() {
        const createPriority: TaskPriority = {
            id : this.priorityForm.value.id ,
            name: this.priorityForm.value.name
        }
        this.taskPriorityService.addTaskPriority(createPriority).subscribe(res => {
            this.selectedTaskPriority = res;
            console.log(res);
            this.getAllTaskPriority();
            if (this.showEditForm && this.selectedTaskPriority) {
                this.toggleEditForm(this.selectedTaskPriority);
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


    onEditPriority(taskPriority_: TaskPriority) {

        const taskPriority: TaskPriority = {
            id: taskPriority_.id,
            name: this.priorityForm.value.name
        }
        taskPriority_.id = taskPriority.id;
        taskPriority_.name = taskPriority.name;

        this.toggleEditForm(taskPriority_);

        this.taskPriorityService.editTaskPriority(taskPriority)
            .subscribe(res => {
                    if (res) {
                        this.toastyService.success("Priority Updated Success.")
                    }
                    console.log(res);
                }, error => {
                    this.toastyService.error("An error occurred.", error)
                }
            );
    }


    onDeletePriority(id:number){
    this.taskPriorityService.deleteTaskPriority(id).subscribe(res => {
        console.log(res);
        this.toastyService.success("Deleted Done.")
    } , err => {
        this.toastyService.error("An Error Occurred.")
    })
    }


}

