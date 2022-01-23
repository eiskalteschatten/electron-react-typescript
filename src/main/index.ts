import path from 'path';
import { BrowserWindow } from 'electron';
import log from 'electron-log';

import './eventsFromRenderer';
import './workers';

import { setupi18n } from '../i18n/main';
import config from '../config';
import openMainWindow from './windows/main';
import checkForUpdates from './lib/checkForUpdates';

let app: Electron.App;

export default (_app: Electron.App): void => {
  app = _app;
  app.setName(config.app.name);

  app.on('window-all-closed', (): void => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.whenReady().then(async (): Promise<void> => {
    setupi18n();

    const initializeAppPath = 'file://' + path.join(__dirname, './workers/initializeApp.html');

    const initializeAppWindow = new BrowserWindow({
      width: 400,
      height: 400,
      show: false,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, './preload.js'),
      },
    });

    initializeAppWindow.loadURL(initializeAppPath);

    if (process.env.NODE_ENV === 'development') {
      const { default: installExtension, REDUX_DEVTOOLS } = await import('electron-devtools-installer');
      await installExtension(REDUX_DEVTOOLS);
    }

    openMainWindow();

    setTimeout(() => checkForUpdates(false), 3000);
  }).catch(log.error);
};
