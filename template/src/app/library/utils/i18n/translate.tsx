/* eslint-disable @typescript-eslint/no-explicit-any */
import I18n from './i18n';

export function translate(key: string, option?: any) {
  return key ? I18n.t(key, option) : '';
}
