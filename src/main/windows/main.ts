import { BrowserWindow, BrowserWindowConstructorOptions, Menu, nativeTheme, screen } from 'electron';
import path from 'path';
import log from 'electron-log';

import config from '../../config/main';
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
    backgroundColor: nativeTheme.shouldUseDarkColors
      ? config.windows.defaultBackgroundColors.dark
      : config.windows.defaultBackgroundColors.light,
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

    newWindow.on('resized', (e: Event) => onWindowChanged(e, {
      windowWidth: newWindow.getBounds().width,
      windowHeight: newWindow.getBounds().height,
      windowIsMaximized: false,
    }));
    newWindow.on('moved', (e: Event) => onWindowChanged(e, {
      windowX: newWindow.getBounds().x,
      windowY: newWindow.getBounds().y,
    }));
    newWindow.on('maximize', (e: Event) => onWindowChanged(e, {
      windowIsMaximized: newWindow.isMaximized(),
    }));
    newWindow.on('unmaximize', (e: Event) => onWindowChanged(e, {
      windowIsMaximized: newWindow.isMaximized(),
    }));
    newWindow.on('enter-full-screen', (e: Event) => onWindowChanged(e, {
      windowIsFullScreen: newWindow.isFullScreen(),
    }));
    newWindow.on('leave-full-screen', (e: Event) => onWindowChanged(e, {
      windowIsFullScreen: newWindow.isFullScreen(),
    }));
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

interface OnWindowChangedOptions {
  windowWidth?: number;
  windowHeight?: number;
  windowX?: number;
  windowY?: number;
  windowIsMaximized?: boolean;
  windowIsFullScreen?: boolean;
}

const onWindowChanged = async (e: Event, changedPreferences: OnWindowChangedOptions): Promise<void> => {
  try {
    // Save the Window preferences here
    // const windowsRepository = getRepository(Windows);
    // const preferences = await windowsRepository.findOne({
    //   where: {
    //     windowId: WINDOW_ID,
    //   },
    // });

    // if (!preferences) {
    //   await windowsRepository.save({
    //     windowId: WINDOW_ID,
    //     ...changedPreferences,
    //   });
    // }
    // else {
    //   await windowsRepository.update({
    //     id: preferences.id,
    //   }, {
    //     ...preferences,
    //     ...changedPreferences,
    //   });
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
