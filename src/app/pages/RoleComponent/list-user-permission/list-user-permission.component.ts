import {Component, OnInit, ViewChild} from '@angular/core';
import {RoleService} from "../../../services/role-service/role-service";
import {
  Permission,
  PermissionKeyValue,
  Role,
  UpdateUserRoleWithPermissions
} from "../../../Models/Permission/permission-model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TreeItem, TreeviewComponent, TreeviewConfig, TreeviewItem} from "@charmedme/ngx-treeview";
import {TeamService} from "../../../services/team-service/team.service";
import {Employee, GetTeamMembers, TeamMembers} from "../../../Models/Team/team.model";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-user-permission',
  templateUrl: './list-user-permission.component.html',
  styleUrls: ['./list-user-permission.component.scss']
})
export class ListUserPermissionComponent implements  OnInit {

     userForm : FormGroup ;
     employees: Employee[] = [] ;


     dropdownList :Employee[] = [];
     selectedItems: Employee[] = [];
     dropdownSettings = {};

     dropdownList1 :Role[] = [];
     selectedItems1: Role[] = [];
     dropdownSettings1 = {};

     roles : Role [] ;
     permissions : Permission[] ;

     selectedRole :string ;

     selectedEmail : string ;

    @ViewChild(TreeviewComponent) NgxViewTree: TreeviewComponent;

     items2: TreeviewItem [] = [] ;
     roleItems2: any = new TreeviewItem({
     text: '' ,
     value: '' as any
    , children: ([
      {
        text: '',
        value: 0
      }
    ]  as TreeItem[])
  });

  values2: number [] = [] ;
  config2: TreeviewConfig = {
    hasAllCheckBox: true,
    compact: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 250,
    hasDivider: true
  };
  constructor(private  roleService: RoleService ,
              private  teamService : TeamService ,
              private  toastService : ToastrService,
              private  fb:FormBuilder) {
  }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      roleName : this.fb.control('' , Validators.required),
      permissions : this.fb.array([]),
      userEmail : this.fb.control('' , Validators.required)
    });

    this.getEmployees();
    this.getRoles();
    this.getPermissions();
  }

  getEmployees(){

    this.teamService.getAllEmployees().subscribe(res => {

    this.employees = res;
    this.dropdownList = this.employees;
    this.selectedItems = this.employees;


      this.dropdownList.map(item => {
        return {
          employee : {
            id : item.id ,
            name : item.email
          }
        }
      });


      this.employees = this.dropdownList.map(employee => {
        return employee;
      })

      this.dropdownSettings = <IDropdownSettings>{
        singleSelection: true,
        idField: 'id',
        textField: 'email',
        allowSearchFilter: true,
        closeDropDownOnSelection: false,
        showSelectedItemsAtTop: true,
        defaultOpen: false,
        itemsShowLimit: this.employees.length,
        selectedItems : this.selectedItems
      }
    })

    console.log(this.selectedItems);
    console.log(this.employees);
  }

  onItemSelect(item : any){
    console.log(item)
    this.selectedEmail = item ;
    this.userForm.value.userEmail = item.userEmail;
    this.toastService.success(`${item.email} selected`)
  }


  onDeselectItem(item : any){
    this.userForm.value.userEmail = undefined;
    console.log(item);
  }


  getRoles(){
  this.roleService.GetRoles().subscribe(res => {

    this.roles = res;
    this.dropdownList1 = this.roles;
    this.selectedItems1 = this.roles;

    this.dropdownList1.map(item1 => {
      return {

          id : item1.roleId ,
          name : item1.roleName

      }
    });


    this.roles = this.dropdownList1.map(role => {
      return role;
    })


    this.dropdownSettings1 = <IDropdownSettings>{
      singleSelection: true,
      idField: 'roleId',
      textField: 'roleName',
      allowSearchFilter: true,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: true,
      defaultOpen: false,
      itemsShowLimit: this.employees.length,
      selectedItems : this.selectedItems
    }

    console.log(res);
  })
  }
  onItemSelect1(item1 : any){
    console.log(item1)
    this.selectedRole = item1.roleName;
    this.toastService.success(`${item1.roleName} selected`)
  }


  onDeselectItem1(item1 : any){
    console.log(item1);
    this.selectedRole = undefined;
  }
  getPermissions(){
  this.roleService.GetPermissions().subscribe(res => {
    this.permissions = res ;
    this.roleItems2 = res;
    this.items2 = this.getItems(this.roleItems2);
    console.log(res);
  })
  }


  getRolePermissions(roleName: string){
    this.roleService.GetRolePermissions(roleName).subscribe(res => {

      let selectedItems : number[] ;
      selectedItems = res.flatMap((item : Permission) => {
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

  updateUserRolePermission(){
    let userRole : UpdateUserRoleWithPermissions = {
      roleName : this.userForm.value.roleName ,
      permissions : this.userForm.value.permissions ,
      userEmail : this.userForm.value.userEmail
    }
    userRole.roleName = this.selectedRole;
    userRole.permissions = this.values2;
    userRole.userEmail = this.selectedEmail;

   this.roleService.UpdateUserRoleWithPermission(userRole).
   subscribe(res => {
     this.toastService.success("Permissions Updated Successfully.");
     console.log(res);
   })
  }

}
