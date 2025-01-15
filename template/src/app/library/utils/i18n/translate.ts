import { TOptions } from 'i18next';

import I18n from './i18n';

export function translate(key: I18nKeys, option?: TOptions) {
  return key ? I18n.t(key, option) : '';
}
