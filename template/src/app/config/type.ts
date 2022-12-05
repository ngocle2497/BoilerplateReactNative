/* eslint-disable @typescript-eslint/no-explicit-any */
import { I18nKeys } from '@utils/i18n/locales';
import { AxiosRequestConfig } from 'axios';
import { z } from 'zod';

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

export interface ParamsNetwork extends AxiosRequestConfig {
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

export type ZodShape<T> = {
  // Require all the keys from T
  [key in keyof T]-?: undefined extends T[key]
    ? // When optional, require the type to be optional in zod
      z.ZodOptionalType<z.ZodType<T[key]>>
    : z.ZodType<T[key]>;
};
