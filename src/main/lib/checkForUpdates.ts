import { dialog, shell } from 'electron';
import axios from 'axios';
import log from 'electron-log';

import config from '../../config/main';
import i18n from '../../i18n/main';

const { t } = i18n;

interface GithubUpdateResponse {
  html_url: string;
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
}

export default async (showNoUpdatesDialog = false): Promise<void> => {
  log.info('Checking for updates...');

  const response = await axios.get<GithubUpdateResponse[]>(config.updates.url);

  if (response.status === 200) {
    const latestVersion = response.data[0];
    const tagName = `v${config.app.version}`;

    if (latestVersion) {
      const checkForPrelease = config.app.version.includes('beta');

      if (latestVersion.tag_name !== tagName && !latestVersion.draft && (!latestVersion.prerelease || checkForPrelease)) {
        log.info(`Update found: current version ${tagName}, latest release ${latestVersion.tag_name}`);

        const result = await dialog.showMessageBox({
          type: 'info',
          buttons: [t('updates:download'), t('updates:later')],
          title: t('updates:updateAvailable'),
          message: t('updates:aNewVersionIsAvailable'),
          detail: t('updates:downloadAndInstallIt'),
        });

        if (result.response === 0) {
          shell.openExternal(latestVersion.html_url);
        }
      }
      else if (showNoUpdatesDialog) {
        log.info(`No updates found: current version ${tagName}, latest release ${latestVersion.tag_name}`);

        dialog.showMessageBox({
          message: t('updates:noUpdatesAvailable'),
          buttons: [t('common:ok')],
          type: 'info',
          defaultId: 0,
          cancelId: 0,
        });
      }
    }
    else {
      log.info(`No updates found: current version ${tagName}`);
    }
  }
  else {
    log.error(`An error occurred while checking for updates: ${JSON.stringify(response.data)}`);
  }
};
