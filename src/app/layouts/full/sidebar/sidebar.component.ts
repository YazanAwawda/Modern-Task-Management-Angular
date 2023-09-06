import {Component, OnInit} from '@angular/core';
import {NavService} from '../../../services/nav-service/nav.service';
import {NavItem} from './nav-item/nav-item';
import {PermissionService} from "../../../services/permission-service/permission.service";
import {of} from "rxjs";
import {AuthenticationService} from "../../../services/auth-service/auth.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {


  navItems: NavItem[] = [
    {
      navCap: 'Home',
    },
    {
      displayName: 'Dashboard',
      iconName: 'layout-dashboard',
      route: '/dashboard',
      hasPermission :  of(true)
    } ,
    {
      navCap: 'Team Components',
    },
    {
      displayName: 'All Teams',
      iconName: 'rosette',
      route: '/ui-components/teams',
      hasPermission :  of(false) ,
      permissionKey : [41 , 42]


    },
    {
      displayName: 'Create Team',
      iconName: 'poker-chip',
      route: '/ui-components/create-team',
      hasPermission :  of(false) ,
      permissionKey : [39]


    },
    {
      navCap: 'Project Components'
    },
    {
      displayName: 'All Projects ',
      iconName: 'poker-chip',
      route: '/ui-components/project-list',
      hasPermission : of(false) ,
      permissionKey : [8,9]


    },
    {
      displayName: 'Create Project ',
      iconName: 'poker-chip',
      route: '/ui-components/create-project',
      permissionKey : [11] ,
      hasPermission :  of(false)
    }
    ,
    {
      navCap: 'Auth',
    },
    {
      displayName: 'Login',
      iconName: 'lock',
      route: '/authentication/login',
      hasPermission :  of(true && !this.authService.isAuthenticatedValue)


    },
    {
      displayName: 'Logout',
      iconName: 'lock',
      route: '/authentication/login',
      hasPermission :  of(true && this.authService.isAuthenticatedValue)


    },
    {
      displayName: 'Create User',
      iconName: 'user-plus',
      route: '/ui-components/create-user' ,
      hasPermission :  of(false),
      permissionKey:[47]

    },{
      displayName: 'User Role',
      iconName :'user-circle',
      route : '/ui-components/user-role',
      hasPermission :  of(false),
      permissionKey:[55 , 57]
    }
  ];


  constructor(private permissionService: PermissionService
    , public navService: NavService,
              private authService: AuthenticationService) {

  }



  ngOnInit(): void {
    this.navItems.forEach(navItem => {
      if (navItem.permissionKey) {
        navItem.hasPermission = this.permissionService.checkPermission(navItem.permissionKey);
      }
    });

  //  this.navItems[7].hasPermission = true;
    // this.navItems.forEach(navItem => {
    //   if (navItem.permissionKey === 11) {
    //     this.permissionService.getCurrentPermission$().subscribe(res => {
    //       this.permissionService.Permissions = res ;
    //       navItem.hasPermission = !this.permissionService.hasPermissionForOperation(11);
    //       console.log(   navItem.hasPermission );
    //
    //     })
    //   }
    }

}
