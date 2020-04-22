import React from 'react'
import I18n from './i18n';

export function translate(key: string, option?: object) {
  // const [t,i18n] = useTranslation()
  return key ? I18n.t(key, option) : null;
}