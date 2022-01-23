import { MenuItemConstructorOptions } from 'electron';

import menuBuilder from '../../menuBuilder';
import appMenuItems from './app';
import fileMenuItems from './file';
import editMenuItems from './edit';
import viewMenuItems from './view';
import helpMenuItems from './help';
import i18n from '../../../../i18n/main';

const { t } = i18n;

export default (): MenuItemConstructorOptions[] => {
  const template: MenuItemConstructorOptions[] = [
    menuBuilder(fileMenuItems()),
    menuBuilder(editMenuItems()),
    menuBuilder(viewMenuItems()),
    {
      role: 'windowMenu',
      label: t('appMenu:window'),
    },
    menuBuilder(helpMenuItems()),
  ];

  if (process.platform === 'darwin') {
    template.unshift(menuBuilder(appMenuItems()));
  }

  return template;
};
