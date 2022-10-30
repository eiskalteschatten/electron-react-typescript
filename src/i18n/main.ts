import { app } from 'electron';
import i18n from 'i18next';

import defaulti18nConfig from './config';

export const setupi18n = (): void => {
  i18n
    .init({
      ...defaulti18nConfig,
      lng: app.getLocale(),
    });
};

export default i18n;
