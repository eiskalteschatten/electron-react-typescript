import { BrowserWindow, MenuItem as ElectronMenuItem } from 'electron';

import { MenuItem, nonMacPlatforms } from '../../menuBuilder';

export default (): MenuItem => {
  const submenuItems: MenuItem[] = [
    {
      item: {
        label: 'New',
      },
      submenu: [
        {
          item: {
            label: 'New Email',
            accelerator: 'CmdOrCtrl+N',
            click: async (): Promise<void> => {
              console.log('New Email');
            },
          },
        },
      ],
    },
    { item: { type: 'separator' } },
    {
      platforms: ['darwin'],
      item: {
        label: 'Close',
        role: 'close',
      },
    },
    {
      platforms: nonMacPlatforms,
      item: {
        label: 'Quit',
        role: 'quit',
      },
    },
  ];

  const menuItem: MenuItem = {
    item: {
      label: 'File',
    },
    submenu: submenuItems,
  };

  return menuItem;
};
