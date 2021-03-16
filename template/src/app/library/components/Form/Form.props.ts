/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {FieldErrors, SetValueConfig, RegisterOptions} from 'react-hook-form';
import {TextInput} from 'react-native';

type FieldValues = Record<string, any>;

export type ValidationMap<T = any, Keys extends keyof T = keyof T> = {
  [K in Keys]-?: RegisterOptions;
};

export interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  /**
   * Children of Form
   */
  children: JSX.Element | JSX.Element[];

  /**
   * validate of react hook form
   */
  rules?: ValidationMap;

  /**
   * trigger function of useForm
   */
  trigger?: (name?: any) => Promise<boolean>;

  /**
   * register function of useForm
   */
  register: ({name}: {name: string}, rules?: RegisterOptions) => void;

  /**
   * List errors of useForm
   */
  errors: FieldErrors<TFieldValues>;

  /**
   * setValue function of useForm
   */
  setValue: (name: any, value?: any, options?: SetValueConfig) => void;

  /**
   * getValue function of useForm
   */
  getValues: () => TFieldValues;
}

export interface ChildProps
  extends Pick<FormProps, 'setValue' | 'getValues' | 'trigger' | 'errors'> {
  child: JSX.Element;
  Inputs: React.MutableRefObject<TextInput[]>;
  i: number;
}
