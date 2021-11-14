import { contextBridge, ipcRenderer, shell } from 'electron';

import config from '../config';

contextBridge.exposeInMainWorld(
  'api',
  {
    send: ipcRenderer.send,
    on: (channel: any, callback: any): void => {
      ipcRenderer.on(channel, callback);
    },
    once: (channel: any, callback: any): void => {
      ipcRenderer.once(channel, callback);
    },
    removeListener: (channel: any, callback: any): void => {
      ipcRenderer.removeListener(channel, callback);
    },
    removeAllListeners: (channel: any): void => {
      ipcRenderer.removeAllListeners(channel);
    },
  }
);

contextBridge.exposeInMainWorld(
  'shell',
  {
    openExternal: (url: string): Promise<void> => shell.openExternal(url),
  }
);

contextBridge.exposeInMainWorld(
  'app',
  {
    getVersion: () => config.app.version,
  }
);
