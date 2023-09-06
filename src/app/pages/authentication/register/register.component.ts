import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../../services/auth-service/auth.service";
import {userRegister} from "../../../Models/User/User";
import {RoleService} from "../../../services/role-service/role-service";
import {Permission, PermissionKeyValue, Role} from "../../../Models/Permission/permission-model";
import {TreeItem, TreeviewComponent, TreeviewConfig, TreeviewItem} from "@charmedme/ngx-treeview";
import {ProfileService} from "../../../services/profile-service/profile-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles:[`
    #container {
      background: rgb(255, 255, 255);
      height: 950px;
      position: relative;
      width: 100%;
    }

    #content {
      background: white;
      margin-left: 175px;
      bottom: 0;
      height: 950px;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 700px;

    }
  `]
})
export class AppSideRegisterComponent implements  OnInit {

    userRegistration !: userRegister;
    formReg !: FormGroup;
    rolesArr: Role[];
    selectedRole: string;
    permissions: Permission[];
    @ViewChild(TreeviewComponent) NgxViewTree: TreeviewComponent;

    items: TreeviewItem[];
    dropdownEnabled = true;

    buttonClasses = [
        'btn-outline-primary',
        'btn-outline-secondary',
        'btn-outline-success',
        'btn-outline-danger',
        'btn-outline-warning',
        'btn-outline-info',
        'btn-outline-light',
        'btn-outline-dark'
    ];
    buttonClass = this.buttonClasses[0];
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

    values: number[] = [];


    constructor(private   router: Router,
                private   form: FormBuilder,
                private   roleService: RoleService,
                private   toastyService:ToastrService,
                private   profileService :ProfileService ,
                private   authService: AuthenticationService) {

    }

    ngOnInit(): void {
        this.formReg = this.form.group({
            uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            fName : new FormControl('' , [Validators.required]),
            lName : new FormControl('' , [Validators.required]),
            jobTitle : new FormControl('' , [Validators.required]),
            roleName : new FormControl('' , [Validators.required]),
            permissions: new FormArray([])
        });
        this.getRoles();
        this.getPermission();
        this.getJobs(this.keyword);

    }


    submit() {

        let user: userRegister = {
            email: this.formReg.value.email,
            password: this.formReg.value.password,
            userName: this.formReg.value.uname,
            jobTitle : this.formReg.value.jobTitle,
            firstName : this.formReg.value.fName,
            lastName : this.formReg.value.lName,
            roleName : this.formReg.value.roleName,
            permissions : this.formReg.value.permissions
        }
        user.permissions = this.values;
        this.authService.On_Register(user).subscribe(() => {
            this.userRegistration = user;
            if(user) {
                this.toastyService.success("Created User Successfully.");
                this.router?.navigate(['/dashboard']);
            }
            console.log(user);
        }, error =>{
            this.toastyService.error("Created Failure, Please fill required data.");
            this.router?.navigate(['/authentication/create-user']);

        })
        // console.log(this.form.value);
    }


    onFilterChange(value: string) {
        console.log('filter:', value);
    }
    getRoles() {
        this.roleService.GetRoles().subscribe(res => {
            this.rolesArr = res;
        })
    }

    getPermission() {
        this.roleService.GetPermissions().subscribe(res => {
            this.roleItems = res;
/*            this.permissions.map((item: any) => {
                return <Permission>{
                    permissionType: item.permissionType,
                    permissions: item.permissions
                }
            });*/
            // this.rolePermission.forEach((value) => {
            //     this.roleItems.text = value.permissionType;
            //     this.roleItems.children = value.permissions;
            //     value.permissions.forEach((value1) => {
            //         this.roleItems.text = value.permissionType;
            //         this.roleItems.children.map(() => {
            //                 return <PermissionKeyValue>{
            //                     permissionDisplayNames: value1.permissionDisplayNames,
            //                     permissionValues: value1.permissionValues
            //                 }
            //             })
            //         }
            //     )
            // })
            // this.onFilterChange(   this.roleItems.text )
            // this.values = this.roleItems.values;
            this.items = this.getItems(this.roleItems);
            console.log(this.items);
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
    config: TreeviewConfig = {
        hasAllCheckBox: true,
        compact: true,
        hasFilter: true,
        hasCollapseExpand: true,
        decoupleChildFromParent: false,
        maxHeight: 150,
        hasDivider: true
    };

    getRolePermissions(name :string){
        this.roleService.GetRolePermissions(name).subscribe
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

    data = [];
    getJobs(name:any){
        this.keyword = name;
        this.profileService.getJobs(this.keyword).subscribe(res => {
            this.data = res;
            console.log(res);
        })
    }

    protected readonly HTMLSelectElement = HTMLSelectElement;
    keyword = 'name';



    selectEvent(item : any) {
        // do something with selected item
    }

    onChangeSearch(val: string) {
       this.getJobs(val);
    }

    onFocused(e:any){
        // do something when input is focused
    }

}
