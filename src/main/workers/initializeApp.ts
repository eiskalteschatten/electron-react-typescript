import { ipcMain, IpcMainEvent } from 'electron';
// import fs, { promises as fsPromises } from 'fs';
// import path from 'path';
import log from 'electron-log';

// import config from '../../config';

ipcMain.on('initializeApp', async (e: IpcMainEvent): Promise<void> => {
  // if (!fs.existsSync(config.app.storagePath)) {
  //   await fsPromises.mkdir(config.app.storagePath, { recursive: true });
  // }

  // const pathToLockFile = path.resolve(config.app.storagePath, 'recentProjects.lock');

  // if (fs.existsSync(pathToLockFile)) {
  //   await fsPromises.unlink(pathToLockFile);
  // }

  log.info('App initialized');
  e.sender.send('initializeAppFinished');
});
