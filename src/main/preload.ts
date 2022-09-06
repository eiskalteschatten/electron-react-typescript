import { contextBridge, ipcRenderer, shell } from 'electron';

contextBridge.exposeInMainWorld(
  'api',
  {
    send: ipcRenderer.send,
    sendSync: ipcRenderer.sendSync,
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
