/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import {RegisterOptions} from 'react-hook-form';
export interface ResponseBase<T = any> {
  code: number;

  msg?: string | undefined | null;

  data?: T;

  status: boolean;
}

export interface ParamsNetwork {
  url: string;
  params?: any;
  query?: any;
  body?: any;
}

export type HookFormRules = Exclude<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

export enum SLICE_NAME {
  APP = 'APP_',
  LOGIN = 'LOGIN_',
}

export type ValidateMessageObject = {
  keyT: string;
  optionsTx?: any;
  options?: any;
};
