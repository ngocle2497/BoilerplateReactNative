import I18n from './i18n';

export function translate(key: string, option?: object) {
  return key ? I18n.t(key, option) : '';
}
