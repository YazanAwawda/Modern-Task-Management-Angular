import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RoleService} from "../../../services/role-service/role-service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
    Permission, PermissionKeyValue,
    Role,
    RolePermissions
} from "../../../Models/Permission/permission-model";
import {ToastrService} from "ngx-toastr";
import {TreeItem, TreeviewComponent, TreeviewConfig, TreeviewItem} from "@charmedme/ngx-treeview";
import {PermissionService} from "../../../services/permission-service/permission.service";

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements  OnInit{
    @ViewChild('search' , {static : false}) searchElement !: ElementRef ;

    searchTerm : string = "" ;
    rolesArr : Role[]  = [];
    filteredRole : Role[] = [] ;

    constructor(private   roleService: RoleService,
              private   toastyService:ToastrService,
              public permissionService : PermissionService,
              private   fb:FormBuilder) {
  }

  ngOnInit(): void {

      this.getRoles();

  }




getRoles(){

    this.roleService.GetRoles().subscribe(res => {
      this.rolesArr = res ;
      this.filteredRole = this.rolesArr;
        console.log(res);
    });

}



    onSearchRole(){
        let searchTerm = this.searchTerm.trim() ;
        this.filteredRole = this.rolesArr.filter(item =>
                (item.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.roleName.toUpperCase().includes(searchTerm.toUpperCase())) ||
                (item.roleName.includes(searchTerm))));
}

onRemoveRole(name:string){
        this.roleService.DeleteRole(name).subscribe(res =>{
           console.log(res);
           this.toastyService.error("Role Removed.");
           this.getRoles();
        });
}

}
