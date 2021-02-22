import React from 'react';
import { Folder, People, PresentToAll, Dashboard, AccessibleForward } from '@material-ui/icons';
import { SvgIcon } from '@material-ui/core';

export interface INavigationItem {
  name: string;
  to: string;
  icon: typeof SvgIcon;
  subject: string;
}

const NavigationContext = React.createContext<INavigationItem[]>([
  {
    name: 'Folders',
    to: '/folders/root',
    icon: Folder,
    subject: 'Folders',
  },
  {
    name: 'Templates',
    to: '/templates',
    icon: PresentToAll,
    subject: 'Templates',
  },
  {
    name: 'Users',
    to: '/users',
    icon: People,
    subject: 'Users',
  },
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: Dashboard,
    subject: 'Dashboard',
  },
  {
    name: 'Outside CV',
    to: '/create-outside',
    icon: AccessibleForward,
    subject: 'CV'
  }
]);

export default NavigationContext;
