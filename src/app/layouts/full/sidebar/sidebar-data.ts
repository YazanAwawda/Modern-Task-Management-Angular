import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Team Components',
  },
  {
    displayName: 'All Teams',
    iconName: 'rosette',
    route: '/ui-components/teams',
  },
  {
    displayName: 'Create Team',
    iconName: 'poker-chip',
    route: '/ui-components/create-team',
  },
  {
    navCap : 'Project Components'
  },
  {
    displayName : 'All Projects ',
    iconName : 'poker-chip',
    route: '/ui-components/project-list',
  },
  {
    displayName : 'Create Project ',
    iconName : 'poker-chip',
    route: '/ui-components/create-project',
  },


  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  }
];
