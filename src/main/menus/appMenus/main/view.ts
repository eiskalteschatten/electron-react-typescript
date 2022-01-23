import { MenuItem } from '../../menuBuilder';
import i18n from '../../../../i18n/main';

const { t } = i18n;

export default (): MenuItem => {
  const submenuItems: MenuItem[] = [
    {
      item: {
        label: t('appMenu:actualSize'),
        role: 'resetZoom',
      },
    },
    {
      item: {
        label: t('appMenu:zoomIn'),
        role: 'zoomIn',
      },
    },
    {
      item: {
        label: t('appMenu:zoomOut'),
        role: 'zoomOut',
      },
    },
    {
      platforms: ['darwin'],
      item: {
        type: 'separator',
      },
    },
    {
      platforms: ['darwin'],
      item: {
        label: t('appMenu:togglefullscreen'),
        role: 'togglefullscreen',
      },
    },
    { item: { type: 'separator' } },
    {
      item: {
        label: t('appMenu:development'),
      },
      submenu: [
        { item: { role: 'reload' } },
        { item: { role: 'forceReload' } },
        { item: { role: 'toggleDevTools' } },
      ],
    },
  ];

  const menuItem: MenuItem = {
    item: {
      label: t('appMenu:view'),
    },
    submenu: submenuItems,
  };

  return menuItem;
};
