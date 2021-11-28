import { BrowserWindow } from 'electron';

export default (browserWindow: BrowserWindow): void => {
  browserWindow.webContents.send('setPlatform', process.platform);
};
