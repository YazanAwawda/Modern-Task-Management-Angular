import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TreeItem, TreeviewComponent, TreeviewConfig, TreeviewItem} from "@charmedme/ngx-treeview";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Permission, PermissionKeyValue, Role, RolePermissions} from "../../../Models/Permission/permission-model";
import {RoleService} from "../../../services/role-service/role-service";
import {ToastrService} from "ngx-toastr";
import {PermissionService} from "../../../services/permission-service/permission.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements  OnInit {
  @ViewChild('search' , {static : false}) searchElement !: ElementRef ;
  @ViewChild(TreeviewComponent) NgxViewTree: TreeviewComponent;

  searchTerm : string = "" ;
  formRole !: FormGroup;
  formRole1 !: FormGroup;
  roleDataCreated : RolePermissions;
  rolesArr : Role[]  = [];
  permissionArr : Permission[] ;
  filteredRole : Role[] = [] ;
  items: TreeviewItem[] = [];
  roleItems: any = new TreeviewItem({
    text: '' ,
    value: '' as any
    , children: ([
      {
        text: '',
        value: 0
      }
    ]  as TreeItem[])
  });

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

  values: number[] = [];
  values1: number [] = [] ;
  config: TreeviewConfig = {
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
              private navRoute:Router,
              private   fb:FormBuilder) {
  }

  ngOnInit(): void {

    this.formRole = this.fb.group({
      roleName : new FormControl('' , Validators.required),
      permissions : new FormArray([])
    });

    this.formRole1 = this.fb.group({
      roleName1: new FormControl('' , Validators.required),
      permission1 : new FormArray([])
    })

    this.getRoles();
    this.getPermissions();

  }



  createRole() {

    let roleData : RolePermissions = {
      roleName  : this.formRole.value.roleName ,
      permissions : this.formRole.value.permissions
    }
    roleData.permissions = this.values;
    this.roleService.AddRole(roleData).subscribe(() => {
      this.roleDataCreated = roleData;
      this.toastyService.success("Created  Role Successfully");
      this.navRoute?.navigate(['/ui-components/user-role']);
      console.log(roleData);
    });

  }


  getRoles(){

    this.roleService.GetRoles().subscribe(res => {
      this.rolesArr = res ;
      this.filteredRole = this.rolesArr;
      console.log(res);
    });

  }


  getPermissions(){

    this.roleService.GetPermissions().subscribe(res => {

      this.permissionArr = res;

      this.roleItems = res;
      this.items = this.getItems(this.roleItems);


      this.roleItems1 = this.roleItems;
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

  onSearchRole(){
    let searchTerm = this.searchTerm.trim() ;
    this.filteredRole = this.rolesArr.filter(item =>
        (item.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.roleName.toUpperCase().includes(searchTerm.toUpperCase())) ||
            (item.roleName.includes(searchTerm))));
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
      //  this.NgxViewTree.selection.checkedItems = selectedItems;
    })
  }

}
