import { app, shell } from 'electron';

import config from '../../../../config';
import checkForUpdates from '../../../lib/checkForUpdates';
import { MenuItem, nonMacPlatforms } from '../../menuBuilder';
import openAboutWindow from '../../../windows/about';
import i18n from '../../../../i18n/main';

const { t } = i18n;

export default (): MenuItem => {
  const submenuItems: MenuItem[] = [
    {
      platforms: ['win32'],
      item: {
        label: t('appMenu:checkForUpdates'),
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
        label: t('common:showLogFiles'),
        click: (): void => {
          shell.showItemInFolder(app.getPath('logs'));
        },
      },
    },
    {
      item: { type: 'separator' },
    },
    {
      item: {
        label: t('appMenu:appOnGitHub', { appName: config.app.name }),
        click: (): void => {
          shell.openExternal('https://github.com/eiskalteschatten/electron-react-typescript/');
        },
      },
    },
    {
      item: {
        label: t('appMenu:submitFeedback'),
        click: (): void => {
          shell.openExternal('https://www.alexseifert.com/contact');
        },
      },
    },
    {
      item: {
        label: t('appMenu:aboutAlexSeifert'),
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
        label: t('appMenu:aboutApp', { appName: config.app.name }),
        click: (): void => {
          openAboutWindow();
        },
      },
    },
  ];

  const menuItem: MenuItem = {
    item: {
      role: 'help',
      label: t('appMenu:help'),
    },
    submenu: submenuItems,
  };

  return menuItem;
};
