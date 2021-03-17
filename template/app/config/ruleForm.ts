/* eslint-disable @typescript-eslint/no-explicit-any */
import {translate} from '@utils';
// Error
export const required = (value: string | undefined | null) =>
  value && value.toString().trim().length > 0
    ? undefined
    : translate('validate:required');
export const maxLength = (max: number, msg: string) => (
  value: string | undefined | null,
) => (value && value.length > max ? msg : undefined);

export const minLength4 = (value: string | undefined | null) =>
  value && value.length < 4 ? 'Must be' : undefined;

export const minValue = (min: number) => (value: number) =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const betweenLength = (min: number, max: number, msg: string) => (
  value: string,
) => ((value && value.length < min) || value.length > max ? msg : undefined);
export const mustGender = (msg: string) => (value: number) =>
  value !== 0 && value != 1 ? msg : undefined;
export const number = (msg: string) => (value: string | undefined | null) =>
  value && isNaN(Number(value)) ? msg : undefined;

export const isEmail = (value: string | undefined | null) =>
  value &&
  !/^[a-z][a-z0-9%_\.]{3,32}@[a-z0-9]{3,}(\.[a-z]{3,4}){1,2}$/i.test(value)
    ? translate('validate:lbErrorEmail')
    : undefined;

export const confirmPassword = (
  value: string | undefined | null,
  allValues: any,
  key: string,
) =>
  value !== allValues[key]
    ? translate('validate:lbPasswordNotMatch')
    : undefined;

export const confirmPW = (value: string | undefined | null, allValues: any) =>
  value !== allValues.password
    ? translate('validate:lbPasswordNotMatch')
    : undefined;

export const strongPassword = (value: string | undefined | null) =>
  value &&
  !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?!.*['"]).{8,}$/.test(value)
    ? 'Must like Abc@1234'
    : undefined;
// Warning
export const isYahoo = (value: string | undefined | null) =>
  value && /.+@yahoo\.com/.test(value)
    ? 'Really? You still use yahoo mail?'
    : undefined;

// Normalize
export const upper = (value: string | undefined | null) =>
  value && value.toUpperCase();

export const lower = (value: string | undefined | null) =>
  value && value.toLowerCase();

export const normalizePhone = (value: string | undefined | null) => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4)}`;
  }
  return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 7)}-${onlyNums.slice(
    7,
    11,
  )}`;
};
