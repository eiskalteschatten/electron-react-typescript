import { BrowserWindow, BrowserWindowConstructorOptions, Menu, nativeTheme, screen } from 'electron';
import path from 'path';
import fs, { promises as fsPromises } from 'fs';
import log from 'electron-log';

import config from '../../config/main';
import initializeRenderer from '../initializeRenderer';
import getAppMenu from '../menus/appMenus/main';
import { WindowPreferences } from '../interfaces/windows';

export const windows = new Set();

const WINDOW_PREFERENCES_FILE = 'mainWindowPreferences.json';
const WINDOW_PREFERENCES_FILE_PATH = path.resolve(config.storagePath, WINDOW_PREFERENCES_FILE);

const getWindowPreferences = async (): Promise<WindowPreferences> => {
  try {
    const preferencesString = fs.existsSync(WINDOW_PREFERENCES_FILE_PATH)
      ? await fsPromises.readFile(WINDOW_PREFERENCES_FILE_PATH, 'utf8')
      : '';

    return preferencesString ? JSON.parse(preferencesString) : {};
  }
  catch (error) {
    log.error(error);
    return {};
  }
};

export default async (): Promise<BrowserWindow> => {
  const preferences = await getWindowPreferences();
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const defaultWidth = Math.floor(screenWidth * 0.6);
  const defaultHeight = Math.floor(screenHeight * 0.75);

  const browserWindowOptions: BrowserWindowConstructorOptions = {
    width: preferences.width || defaultWidth,
    height: preferences.height || defaultHeight,
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

  if (preferences.x && preferences.y) {
    browserWindowOptions.x = preferences.x;
    browserWindowOptions.y = preferences.y;
  }

  const newWindow = new BrowserWindow(browserWindowOptions);

  if (newWindow) {
    if (preferences.isMaximized) {
      newWindow.maximize();
    }

    newWindow.setFullScreen(preferences.isFullScreen || false);

    newWindow.loadURL(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../../index.html')}`
    );

    newWindow.on('resized', () => onWindowChanged({
      width: newWindow.getBounds().width,
      height: newWindow.getBounds().height,
      isMaximized: false,
    }));
    newWindow.on('moved', () => onWindowChanged({
      x: newWindow.getBounds().x,
      y: newWindow.getBounds().y,
      isMaximized: false,
    }));
    newWindow.on('maximize', () => onWindowChanged({
      isMaximized: newWindow.isMaximized(),
    }));
    newWindow.on('unmaximize', () => onWindowChanged({
      isMaximized: newWindow.isMaximized(),
    }));
    newWindow.on('enter-full-screen', () => onWindowChanged({
      isFullScreen: newWindow.isFullScreen(),
    }));
    newWindow.on('leave-full-screen', () => onWindowChanged({
      isFullScreen: newWindow.isFullScreen(),
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

const onWindowChanged = async (changedPreferences: WindowPreferences): Promise<void> => {
  try {
    const preferences = await getWindowPreferences();

    if (fs.existsSync(WINDOW_PREFERENCES_FILE_PATH)) {
      await fsPromises.unlink(WINDOW_PREFERENCES_FILE_PATH);
    }

    await fsPromises.writeFile(WINDOW_PREFERENCES_FILE_PATH, JSON.stringify({
      ...preferences,
      ...changedPreferences,
    }), 'utf8');
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
