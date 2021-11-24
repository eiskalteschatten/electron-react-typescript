import path from 'path';
import os from 'os';

let storagePath = '';

switch (process.platform) {
  case 'darwin':
    storagePath = path.join(os.homedir(), 'Library', 'Application Support', 'ElectronReactTypescript');
    break;
  case 'win32':
    storagePath = path.join(os.homedir(), 'AppData', 'Roaming', 'Alex Seifert', 'ElectronReactTypescript');
    break;
  default:
    storagePath = path.join(os.homedir(), '.electron-react-typescript');
    break;
}

export default {
  app: {
    name: 'ElectronReactTypeScript',
    version: '1.0.0',
    storagePath,
  },
  updates: {
    url: 'https://api.github.com/repos/eiskalteschatten/electron-react-typescript/releases',
  },
  intl: {
    defaultLocale: 'en',
    languages: ['en'],
  },
};
