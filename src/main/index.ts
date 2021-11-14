import path from 'path';
import { BrowserWindow } from 'electron';

import './eventsFromRenderer';
import './workers';

import config from '../config';
import openMainWindow from './windows/main';
import checkForUpdates from './lib/checkForUpdates';

let app: Electron.App;

const onWindowAllClosed = (): void => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
};

export default (_app: Electron.App): void => {
  app = _app;
  app.setName(config.app.name);

  app.on('window-all-closed', onWindowAllClosed);

  app.on('ready', async (): Promise<void> => {
    const initializeAppPath = 'file://' + path.join(__dirname, '/workers/', 'initializeApp.html');

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
      const { default: installExtension, VUEJS_DEVTOOLS } = await import('electron-devtools-installer');
      await installExtension(VUEJS_DEVTOOLS);
    }

    openMainWindow();

    setTimeout(() => checkForUpdates(false), 3000);
  });
};
