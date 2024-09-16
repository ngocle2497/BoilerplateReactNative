/* eslint-disable @typescript-eslint/no-empty-function */
import { initReactI18next } from 'react-i18next';

import { DEFAULT_FALLBACK_LNG_I18n } from '@env';
import i18n from 'i18next';

import { resources } from './locales';

(() => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    fallbackLng: DEFAULT_FALLBACK_LNG_I18n,
    interpolation: {
      escapeValue: false,
    },
    lng: DEFAULT_FALLBACK_LNG_I18n,
    resources,
  });
})();

export default i18n;
