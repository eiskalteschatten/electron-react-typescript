import path from 'path';
import log from 'electron-log';

import './eventsFromRenderer';
import './workers';

import { setupi18n } from '../i18n/main';
import config from '../config';
import openMainWindow from './windows/main';
import checkForUpdates from './lib/checkForUpdates';
import { launchWorkerWindow } from './lib/workerHelpers';

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

    const initializeAppPath = 'file://' + path.join(__dirname, './workers/initializeApp/index.html');
    launchWorkerWindow(initializeAppPath);

    if (process.env.NODE_ENV === 'development') {
      const { default: installExtension, REDUX_DEVTOOLS } = await import('electron-devtools-installer');
      await installExtension(REDUX_DEVTOOLS);
    }

    openMainWindow();

    setTimeout(() => checkForUpdates(false), 3000);
  }).catch(log.error);
};
