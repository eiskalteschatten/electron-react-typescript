import i18n from 'i18next';

import config from '../config';
import defaulti18nConfig from './config';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

i18n
  .init({
    ...defaulti18nConfig,
    lng: navigator.language.split('-')[0] || config.intl.defaultLocale,
    returnNull: false,
  });

export default i18n;
