import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import config from '../config';
import resources from './locales';

i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    fallbackLng: config.intl.defaultLocale,
    supportedLngs: config.intl.languages,
    preload: config.intl.languages,
    keySeparator: false,
    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;