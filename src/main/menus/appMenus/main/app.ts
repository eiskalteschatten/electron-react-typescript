import { app } from 'electron';

import config from '../../../../config';
import checkForUpdates from '../../../lib/checkForUpdates';
import { MenuItem } from '../../menuBuilder';

export default (): MenuItem => {
  const submenuItems: MenuItem[] = [
    {
      item: {
        role: 'about',
        label: `About ${config.app.name}`,
      },
    },
    {
      item: {
        label: 'Check for Updates...',
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
        label: 'Services',
      } ,
    },
    { item: { type: 'separator' } },
    {
      item: {
        role: 'hide',
        label: `Hide ${config.app.name}`,
      },
    },
    {
      item: {
        role: 'hideOthers',
        label: 'Hide Others',
      },
    },
    {
      item: {
        role: 'unhide',
        label: 'Show All',
      },
    },
    { item: { type: 'separator' } },
    {
      item: {
        role: 'quit',
        label: `Quit ${config.app.name}`,
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
