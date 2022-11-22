/* eslint-disable @typescript-eslint/no-explicit-any */
import { I18nKeys } from '@utils/i18n/locales';

export type ResponseBase<T = any, TStatus = boolean> = {
  code: number;
} & (TStatus extends true
  ? {
      data: T;

      status: true;
    }
  : {
      status: false;

      msg?: string | null;
    });
export interface ParamsNetwork {
  url: string;
  params?: Record<string, string | number>;
  path?: Record<string, string | number>;
  body?: Record<string, unknown>;
}

export type ActionBase<T = any> = {
  type: string;
  payload?: T;
};

export enum SLICE_NAME {
  APP = 'APP_',
  AUTHENTICATION = 'AUTHENTICATION_',
}

export type ValidateMessageObject = {
  keyT: I18nKeys;
  optionsTx?: Record<string, I18nKeys>;
  options?: Record<string, string | number>;
};
