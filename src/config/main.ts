import path from 'path';
import os from 'os';

import globalConfig from './index';

let storagePath = '';

switch (process.platform) {
  case 'darwin':
    storagePath = path.join(os.homedir(), 'Library', 'Application Support', 'MailCoach');
    break;
  case 'win32':
    storagePath = path.join(os.homedir(), 'AppData', 'Roaming', 'mailcoach');
    break;
  default:
    storagePath = path.join(os.homedir(), '.mailcoach');
    break;
}

export default {
  windows: {
    defaultBackgroundColors: {
      dark: '#222222',
      light: '#f0f0f0',
    },
  },
  storagePath,
  updates: {
    url: 'https://api.github.com/repos/eiskalteschatten/mailcoach-electron/releases',
  },
  ...globalConfig,
};
