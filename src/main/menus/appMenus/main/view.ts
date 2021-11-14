import { MenuItem } from '../../menuBuilder';

export default (): MenuItem => {
  const submenuItems: MenuItem[] = [
    {
      item: {
        label: 'Actual Size',
        role: 'resetZoom',
      },
    },
    {
      item: {
        label: 'Zoom In',
        role: 'zoomIn',
      },
    },
    {
      item: {
        label: 'Zoom Out',
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
        label: 'Toggle Full Screen',
        role: 'togglefullscreen',
      },
    },
    { item: { type: 'separator' } },
    {
      item: {
        label: 'Development',
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
      label: 'View',
    },
    submenu: submenuItems,
  };

  return menuItem;
};
