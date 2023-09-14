import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TreeItem, TreeviewComponent, TreeviewConfig, TreeviewItem} from "@charmedme/ngx-treeview";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Permission, PermissionKeyValue, Role, RolePermissions} from "../../../Models/Permission/permission-model";
import {RoleService} from "../../../services/role-service/role-service";
import {ToastrService} from "ngx-toastr";
import {PermissionService} from "../../../services/permission-service/permission.service";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements  OnInit {

  @ViewChild(TreeviewComponent) NgxViewTree: TreeviewComponent;

  roleName: string ;

  formRole1 !: FormGroup;
  roleDataCreated : RolePermissions;
  rolesArr : Role[]  = [];
  permissionArr : Permission[] ;

  items1: TreeviewItem [] = [] ;
  roleItems1: any = new TreeviewItem({
    text: '' ,
    value: '' as any
    , children: ([
      {
        text: '',
        value: 0
      }
    ]  as TreeItem[])
  });

  values1: number [] = [] ;
  config1: TreeviewConfig = {
    hasAllCheckBox: true,
    compact: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400,
    hasDivider: true
  };
  constructor(private   roleService: RoleService,
              private   toastyService:ToastrService,
              public permissionService : PermissionService,
              private  route : ActivatedRoute,
              private  navRoute : Router ,
              private   fb:FormBuilder) {
  }

  ngOnInit(): void {

   this.roleName = this.route.snapshot.paramMap.get('roleName')!;

        this.formRole1 = this.fb.group({
      roleName1: new FormControl('' , Validators.required),
      permission1 : new FormArray([])
    })

    this.getRoles();
    this.getPermissions();
    this.getRolesPermissions(this.roleName);

  }



  updateRole() {

    let roleData : RolePermissions = {
      roleName  : this.formRole1.value.roleName1 ,
      permissions : this.formRole1.value.permissions1
    }
    roleData.permissions = this.values1;
    this.roleService.UpdateRolePermission(roleData).subscribe(() => {
      this.roleDataCreated = roleData;
      this.toastyService.success("Updated  Role Successfully");
      this.navRoute.navigate([`/ui-components/user-role`]);
      console.log(roleData);

    },()=>{
      this.toastyService.error("Update Failure");
    });

  }


  getRoles(){

    this.roleService.GetRoles().subscribe(res => {
      this.rolesArr = res ;
      console.log(res);
    });

  }


  getPermissions(){

    this.roleService.GetPermissions().subscribe(res => {

      this.permissionArr = res;

      this.roleItems1 = res;
      this.items1 = this.getItems(this.roleItems1);


      console.log(res);
    });

  }

  getItems(items : Permission[]) : TreeviewItem[]{

    return  items.map(item => new TreeviewItem(<TreeItem>{
      text: item.permissionType,
      checked: false,
      children: item.permissions.map(item => <TreeItem>{
        text: item.permissionDisplayNames,
        value: item.permissionValues,
        checked: false
      })
    })) ;
  }



  getRolesPermissions(nameRole :string){
    this.roleService.GetRolePermissions(nameRole).subscribe
    (res => {
      let selectedItems : number[] ;
      selectedItems =       res.flatMap((item : Permission) => {
        return item.permissions.flatMap((item : PermissionKeyValue) => {
          return item.permissionValues
        })
      })

      this.NgxViewTree.items.forEach(x => x.children.forEach(x => {
        x.checked = false;
      }))
      for (let selectedItemsvalue in selectedItems) {
        this.NgxViewTree.items.forEach(x => x.children.forEach(x => {
          if(x.value == selectedItemsvalue){
            x.checked = true;
          }
        }))
      }
    })
  }

}
