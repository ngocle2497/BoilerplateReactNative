/* eslint-disable @typescript-eslint/no-empty-function */
import { initReactI18next } from 'react-i18next';

import { DEFAULT_FALLBACK_LNG_I18n } from '@env';
import i18n, { LanguageDetectorAsyncModule, Resource } from 'i18next';

import { resources } from './locales';

const languageDetector: LanguageDetectorAsyncModule = {
  // flags below detection to be async
  async: true,

  cacheUserLanguage: () => {},
  detect: (callback: (lng: string | readonly string[] | undefined) => void) => {
    callback(DEFAULT_FALLBACK_LNG_I18n);
  },
  init: () => {},
  type: 'languageDetector',
};

export const initOptionsI18n = (source: Resource) => {
  return {
    debug: false,

    defaultNS: 'common',

    fallbackLng: DEFAULT_FALLBACK_LNG_I18n,

    // cache: {
    //   enabled: true
    // },
    interpolation: {
      // not needed for react as it does escape per default to prevent xss!
      escapeValue: false,
    },

    // have a common namespace used around the full app
    ns: ['common'],

    resources: source,
  };
};

/**
 * Config i18n for app
 */
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init(initOptionsI18n(resources));

export default i18n;
