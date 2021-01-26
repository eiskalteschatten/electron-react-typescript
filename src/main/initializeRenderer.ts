import { BrowserWindow } from 'electron';

export default (browserWindow: BrowserWindow): void => {
  browserWindow.webContents.send('appSetPlatform', process.platform);
};
