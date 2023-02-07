import { I18nKeys } from '@utils/i18n/locales';
import { AxiosRequestConfig } from 'axios';

export interface ParamsNetwork extends AxiosRequestConfig {
  url: string;
  params?: Record<string, string | number>;
  path?: Record<string, string | number>;
  body?: Record<string, unknown>;
  controller?: AbortController;
}

export enum SLICE_NAME {
  APP = 'APP_',
  AUTHENTICATION = 'AUTHENTICATION_',
}

export type ValidateMessageObject = {
  keyT: I18nKeys;
  optionsTx?: Record<string, I18nKeys>;
  options?: Record<string, string | number>;
};
