import { BrowserWindow } from 'electron';
import path from 'path';

export const launchWorkerWindow = <T>(htmlPath: string, data?: T) => {
  const window = new BrowserWindow({
    width: 400,
    height: 400,
    show: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js'),
    },
  });

  if (data) {
    window.webContents.once('did-finish-load', () => {
      window.webContents.send('workerSendData', data);
    });
  }

  window.loadURL(htmlPath);
};
