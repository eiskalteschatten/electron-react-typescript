import { BrowserWindow, BrowserWindowConstructorOptions, Menu, nativeTheme } from 'electron';
import path from 'path';

import config from '../../config/main';
import getAppMenu from '../menus/appMenus/main';
import i18n from '../../i18n/main';

const { t } = i18n;

export const WINDOW_ID = 'about';

// TODO
// const appIcon = process.platform === 'darwin'
//   ? path.join(__dirname, '../../assets/images/icon-mac.png')
//   : path.join(__dirname, '../../assets/images/icon.png');

const appIcon = path.join(__dirname, '../../assets/images/icon128.png');

const html = `
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;
          margin: 0;
          background-color: ${config.windows.defaultBackgroundColors.light};
        }
        body * {
          margin-top: 0;
        }
        body *:first-child {
          margin-top: 12px;
        }
        body *:not(:last-child) {
          margin-bottom: 8px;
        }
        .name {
          font-weight: 700;
          font-size: 14px;
        }
        .version, .copyright {
          font-size: .65em;
        }
        .nodejs {
          margin-top: 10px;
        }
        .nodejs, .chrome, .electron {
          font-size: .65em;
          margin-bottom: 5px !important;
        }
        @media (prefers-color-scheme: dark) {
          body {
            background-color: ${config.windows.defaultBackgroundColors.dark};
            color: #f0f0f0;
          }
        }
      </style>
    </head>
    <body>
      <img class="icon" src="file://${appIcon}" width="64">
      <p class="name">${config.app.name}</p>
      <p class="version">Version ${config.app.version}</p>
      <p class="copyright">&copy; 2022 Alex Seifert</p>
      <p class="nodejs"><b>Node.js:</b> ${process.versions.node}</p>
      <p class="chrome"><b>Chrome:</b> ${process.versions.chrome}</p>
      <p class="electron"><b>Electron:</b> ${process.versions.electron}</p>
    </body>
  </html>
`;

export let window: BrowserWindow | undefined;

export default async (): Promise<BrowserWindow | undefined> => {
  if (window) {
    window.focus();
    return;
  }

  const browserWindowOptions: BrowserWindowConstructorOptions = {
    width: 265,
    height: 260,
    // TODO
    // icon: path.join(__dirname, '../../assets/images/window-icon.png'),
    fullscreenable: false,
    maximizable: false,
    minimizable: false,
    resizable: false,
    title: t('appMenu:aboutApp', { appName: config.app.name }),
    center: true,
    webPreferences: {
      disableDialogs: true,
      webSecurity: false,
    },
    backgroundColor: nativeTheme.shouldUseDarkColors
      ? config.windows.defaultBackgroundColors.dark
      : config.windows.defaultBackgroundColors.light,
  };

  window = new BrowserWindow(browserWindowOptions);

  if (window) {
    const html64 = Buffer.from(html).toString('base64');
    window.loadURL(`data:text/html;base64,${html64}`);

    window.on('closed', closed);

    if (process.platform === 'darwin') {
      window.on('focus', () => {
        const menu = Menu.buildFromTemplate(getAppMenu());
        Menu.setApplicationMenu(menu);
      });
    }
    else {
      window.setMenuBarVisibility(false);
    }
  }

  return window;
};

const closed = (): void => {
  if (window) {
    window = undefined;
  }
};
