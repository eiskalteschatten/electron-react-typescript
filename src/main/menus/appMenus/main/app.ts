import { app } from 'electron';
import { t } from 'i18next';

import config from '../../../../config';
import checkForUpdates from '../../../lib/checkForUpdates';
import { MenuItem } from '../../menuBuilder';

export default (): MenuItem => {
  const submenuItems: MenuItem[] = [
    {
      item: {
        role: 'about',
        label: t('appMenu:aboutApp', { appName: config.app.name }),
      },
    },
    {
      item: {
        label: t('appMenu:checkForUpdates'),
        click: (): void => {
          checkForUpdates(true);
        },
      },
    },
    { item: { type: 'separator' } },
    {
      item: {
        role: 'services',
        submenu: [],
        label: t('appMenu:services'),
      },
    },
    { item: { type: 'separator' } },
    {
      item: {
        role: 'hide',
        label: t('appMenu:hideApp', { appName: config.app.name }),
      },
    },
    {
      item: {
        role: 'hideOthers',
        label: t('appMenu:hideOthers'),
      },
    },
    {
      item: {
        role: 'unhide',
        label: t('appMenu:showAll'),
      },
    },
    { item: { type: 'separator' } },
    {
      item: {
        role: 'quit',
        label: t('appMenu:quitApp', { appName: config.app.name }),
      },
    },
  ];

  const menuItem: MenuItem = {
    platforms: ['darwin'],
    item: {
      label: app?.getName(),
    },
    submenu: submenuItems,
  };

  return menuItem;
};
