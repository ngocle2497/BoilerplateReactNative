import { ParseKeys, TOptions, TypeOptions } from 'i18next';

import en from './source/en.json';

export const resources = { en } as const;

declare global {
  type I18nKeys = ParseKeys<TypeOptions['defaultNS'], TOptions, undefined>;
}
