import I18n from './i18n';

export function translate(key: I18nKeys, option?: Record<string, unknown>) {
  return key ? I18n.t(key, option) : '';
}
