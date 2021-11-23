import { BrowserWindow, BrowserWindowConstructorOptions, Menu, nativeTheme, screen } from 'electron';
import path from 'path';
import log from 'electron-log';

import initializeRenderer from '../initializeRenderer';
import getAppMenu from '../menus/appMenus/main';

export const windows = new Set();

export default async (): Promise<BrowserWindow> => {
  // const preferences = load window preferences here;

  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const defaultWidth = Math.floor(screenWidth * 0.6);
  const defaultHeight = Math.floor(screenHeight * 0.75);

  const browserWindowOptions: BrowserWindowConstructorOptions = {
    width: defaultWidth, // preferences.windowWidth || defaultWidth,
    height: defaultHeight, // preferences.windowHeight || defaultHeight,
    icon: path.join(__dirname, '../../assets/images/icon128.png'),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js'),
    },
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#111111' : '#f0f0f0',
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
        : `file://${path.join(__dirname, '../../index.html')}`
    );

    newWindow.on('close', (e: Event) => onClose(e, newWindow));
    newWindow.on('closed', () => closed(newWindow));

    newWindow.webContents.on('did-finish-load', async (): Promise<void> => {
      initializeRenderer(newWindow);
    });

    newWindow.on('focus', () => {
      const menu = Menu.buildFromTemplate(getAppMenu());
      Menu.setApplicationMenu(menu);
    });

    windows.add(newWindow);
  }

  return newWindow;
};

const onClose = async (e: Event, window?: BrowserWindow): Promise<void> => {
  try {
    // if (window) {
    //   const windowBounds = window.getBounds();

    //   const windowPreferences = {
    //     windowWidth: windowBounds.width,
    //     windowHeight: windowBounds.height,
    //     windowX: windowBounds.x,
    //     windowY: windowBounds.y,
    //     windowIsFullScreen: window.isFullScreen(),
    //     windowIsMaximized: window.isMaximized(),
    //   };
    // }
  }
  catch (error) {
    log.error(error);
  }
};

const closed = (window?: BrowserWindow): void => {
  if (window) {
    windows.delete(window);
    window = undefined;
  }
};
