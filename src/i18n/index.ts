import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import config from '../config';
import defaulti18nConfig from './config';

i18n
  .use(initReactI18next)
  .init({
    ...defaulti18nConfig,
    lng: navigator.language.split('-')[0] || config.intl.defaultLocale,
  });

export default i18n;
