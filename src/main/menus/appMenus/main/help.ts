import { shell } from 'electron';

import config from '../../../../config';
import checkForUpdates from '../../../lib/checkForUpdates';
import { MenuItem, nonMacPlatforms } from '../../menuBuilder';

export default (): MenuItem => {
  const submenuItems: MenuItem[] = [
    {
      platforms: ['win32'],
      item: {
        label: 'Check for Updates...',
        click: (): void => {
          checkForUpdates(true);
        },
      },
    },
    {
      platforms: nonMacPlatforms,
      item: { type: 'separator' },
    },
    {
      item: {
        label: 'Glook on GitHub',
        click: (): void => {
          shell.openExternal('https://github.com/eiskalteschatten/Glook');
        },
      },
    },
    {
      item: {
        label: 'Submit Feedback',
        click: (): void => {
          shell.openExternal('https://www.alexseifert.com/contact');
        },
      },
    },
    {
      item: {
        label: 'About Alex Seifert',
        click: (): void => {
          shell.openExternal('https://www.alexseifert.com');
        },
      },
    },
    {
      platforms: nonMacPlatforms,
      item: { type: 'separator' },
    },
    {
      platforms: nonMacPlatforms,
      item: {
        role: 'about',
        label: `About ${config.app.name}`,
      },
    },
  ];

  const menuItem: MenuItem = {
    item: {
      role: 'help',
      label: 'Help',
    },
    submenu: submenuItems,
  };

  return menuItem;
};
