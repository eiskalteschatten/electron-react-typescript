import { MenuItemConstructorOptions } from 'electron';

import menuBuilder from '../../menuBuilder';
import appMenuItems from './app';
import fileMenuItems from './file';
import editMenuItems from './edit';
import viewMenuItems from './view';
import helpMenuItems from './help';

export default (): MenuItemConstructorOptions[] => {
  const template: MenuItemConstructorOptions[] = [
    menuBuilder(fileMenuItems()),
    menuBuilder(editMenuItems()),
    menuBuilder(viewMenuItems()),
    {
      role: 'windowMenu',
      label: 'Window',
    },
    menuBuilder(helpMenuItems()),
  ];

  if (process.platform === 'darwin') {
    template.unshift(menuBuilder(appMenuItems()));
  }

  return template;
};
