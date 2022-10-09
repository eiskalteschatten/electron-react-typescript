import { app, dialog, shell } from 'electron';

import i18n from '../../i18n/main';

const { t } = i18n;

export const showGenericErrorDialog = async () => {
  const result = await dialog.showMessageBox({
    message: t('errors:anErrorOccurred'),
    detail: t('errors:seeLogsForDetails'),
    type: 'error',
    buttons: [t('common:ok'), t('common:showLogFiles')],
    defaultId: 0,
    cancelId: 0,
  });

  if (result.response === 1) {
    shell.showItemInFolder(app.getPath('logs'));
  }
};

export const showErrorDialog = async (message: string, detail?: string) => {
  const result = await dialog.showMessageBox({
    message,
    detail,
    type: 'error',
    buttons: [t('common:ok'), t('common:showLogFiles')],
    defaultId: 0,
    cancelId: 0,
  });

  if (result.response === 1) {
    shell.showItemInFolder(app.getPath('logs'));
  }
};
