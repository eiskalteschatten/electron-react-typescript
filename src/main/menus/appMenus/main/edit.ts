// import { BrowserWindow, MenuItem as ElectronMenuItem } from 'electron';

import { MenuItem } from '../../menuBuilder';
import i18n from '../../../../i18n/main';

const { t } = i18n;

export default (): MenuItem => {
  const submenuItems: MenuItem[] = [
    {
      item: {
        label: t('appMenu:cut'),
        role: 'cut',
      },
    },
    {
      item: {
        label: t('appMenu:copy'),
        role: 'copy',
      },
    },
    {
      item: {
        label: t('appMenu:paste'),
        role: 'paste',
      },
    },
    {
      platforms: ['darwin'],
      item: {
        label: t('appMenu:pasteAndMatchStyle'),
        role: 'pasteAndMatchStyle',
      },
    },
    {
      item: {
        label: t('appMenu:delete'),
        role: 'delete',
      },
    },
    {
      item: {
        label: t('appMenu:selectAll'),
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
        label: t('appMenu:speech'),
      },
      submenu: [
        {
          item: {
            label: t('appMenu:startSpeaking'),
            role: 'startSpeaking',
          },
        },
        {
          item: {
            label: t('appMenu:stopSpeaking'),
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
    //     label: t('appMenu:preferences'),
    //     accelerator: 'Ctrl+,',
    //     click: (item: ElectronMenuItem, focusedWindow?: BrowserWindow): void => {
    //       focusedWindow?.webContents.send('open-preferences');
    //     },
    //   },
    // },
  ];

  const menuItem: MenuItem = {
    item: {
      label: t('appMenu:edit'),
    },
    submenu: submenuItems,
  };

  return menuItem;
};
