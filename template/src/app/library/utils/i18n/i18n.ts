/* eslint-disable @typescript-eslint/no-empty-function */
import { initReactI18next } from 'react-i18next';

import { DEFAULT_FALLBACK_LNG_I18n } from '@env';
import i18n from 'i18next';

import { resources } from './locales';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: typeof resources;
    keySeparator: ':';
    interpolation: {
      escapeValue: false;
    };
  }
}

(() => {
  i18n.use(initReactI18next).init({
    fallbackLng: DEFAULT_FALLBACK_LNG_I18n,
    interpolation: {
      escapeValue: false,
    },
    keySeparator: false,
    lng: DEFAULT_FALLBACK_LNG_I18n,
    resources,
  });
})();

export default i18n;
