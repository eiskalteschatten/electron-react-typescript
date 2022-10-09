export {};

declare global {
  interface Window {
    api: {
      send: (channel: any, ...data: any[]) => void;
      sendSync: (channel: any, ...data: any[]) => void;
      on: (channel: any, callback: any) => void;
      once: (channel: any, callback: any) => void;
      removeListener: (channel: any, callback: any) => void;
      removeAllListeners: (channel: any) => void;
    };
    shell: {
      openExternal: (url: string) => Promise<void>;
    };
  }
}
