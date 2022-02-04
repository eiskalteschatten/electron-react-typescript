import { BrowserWindow } from 'electron';
import path from 'path';

export const launchWorkerWindow = (htmlPath: string) => {
  const window = new BrowserWindow({
    width: 400,
    height: 400,
    show: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js'),
    },
  });

  window.loadURL(htmlPath);
};
