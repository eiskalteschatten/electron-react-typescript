import { BrowserWindow, BrowserWindowConstructorOptions, Menu } from 'electron';
import path from 'path';

import './eventsFromRenderer';

import config from '../config';
import initializeRenderer from './initializeRenderer';
import appMenu from '../menus/app';

let app: Electron.App;
const windows = new Set();

export const createWindow = async (): Promise<BrowserWindow> => {
  if (process.env.NODE_ENV === 'development') {
    const { default: installExtension, REDUX_DEVTOOLS } = await import('electron-devtools-installer');
    await installExtension(REDUX_DEVTOOLS);
  }

  // const preferences = load window preferences here;

  const browserWindowOptions: BrowserWindowConstructorOptions = {
    // width: preferences.windowWidth,
    // height: preferences.windowHeight,
    icon: path.join(__dirname, '../assets/images/icon128.png'),
    webPreferences: {
      nodeIntegration: true
    }
  };

  if (process.platform === 'darwin') {
    browserWindowOptions.titleBarStyle = 'hidden';
  }

  // if (preferences.windowX && preferences.windowY) {
  //   browserWindowOptions.x = preferences.windowX;
  //   browserWindowOptions.y = preferences.windowY;
  // }

  const newWindow = new BrowserWindow(browserWindowOptions);

  if (newWindow) {
    // if (preferences.windowIsMaximized) {
    //   newWindow.maximize();
    // }

    // newWindow.setFullScreen(preferences.windowIsFullScreen || false);

    newWindow.loadURL(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../index.html')}`
    );

    newWindow.on('closed', () => onClose(newWindow));

    newWindow.webContents.on('did-finish-load', (): void => {
      if (newWindow) {
        initializeRenderer(newWindow);
      }
    });

    newWindow.on('focus', () => {
      const menu = Menu.buildFromTemplate(appMenu);
      Menu.setApplicationMenu(menu);
    });

    windows.add(newWindow);
  }

  return newWindow;
};

const onWindowAllClosed = (): void => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
};

const onClose = async (window: BrowserWindow | null): Promise<void> => {
  try {
    if (window) {
      // const windowBounds = window.getBounds();

      // const windowPreferences = {
      //   windowWidth: windowBounds.width,
      //   windowHeight: windowBounds.height,
      //   windowX: windowBounds.x,
      //   windowY: windowBounds.y,
      //   windowIsFullScreen: window.isFullScreen(),
      //   windowIsMaximized: window.isMaximized(),
      // };

      windows.delete(window);
      window = null;
    }
  }
  catch (error) {
    console.error(error);
  }
};

const onReady = async (): Promise<void> => {

};

export default (_app: Electron.App): void => {
  app = _app;
  app.on('window-all-closed', onWindowAllClosed);
  app.on('ready', onReady);
  app.setName(config.app.name);

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (windows.size === 0) createWindow();
  });
};
