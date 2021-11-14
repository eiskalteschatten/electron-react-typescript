// import { BrowserWindow, MenuItem as ElectronMenuItem } from 'electron';

import { MenuItem } from '../../menuBuilder';

export default (): MenuItem => {
  const submenuItems: MenuItem[] = [
    {
      item: {
        label: 'Cut',
        role: 'cut',
      },
    },
    {
      item: {
        label: 'Copy',
        role: 'copy',
      },
    },
    {
      item: {
        label: 'Paste',
        role: 'paste',
      },
    },
    {
      platforms: ['darwin'],
      item: {
        label: 'Paste and Match Style',
        role: 'pasteAndMatchStyle',
      },
    },
    {
      item: {
        label: 'Delete',
        role: 'delete',
      },
    },
    {
      item: {
        label: 'Select All',
        role: 'selectAll',
      },
    },
    {
      platforms: ['darwin'],
      item: { type: 'separator' },
    },
    {
      platforms: ['darwin'],
      item: {
        label: 'Speeche',
      },
      submenu: [
        {
          item: {
            label: 'Start Speaking',
            role: 'startSpeaking',
          },
        },
        {
          item: {
            label: 'Stop Speaking',
            role: 'stopSpeaking',
          },
        },
      ],
    },
    // {
    //   platforms: nonMacPlatforms,
    //   item: { type: 'separator' },
    // },
    // {
    //   platforms: nonMacPlatforms,
    //   item: {
    //     label: 'Preferences',
    //     accelerator: 'Ctrl+,',
    //     click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
    //       focusedWindow?.webContents.send('open-preferences');
    //     },
    //   },
    // },
  ];

  const menuItem: MenuItem = {
    item: {
      label: 'Edit',
    },
    submenu: submenuItems,
  };

  return menuItem;
};
