import I18n from '../library/utils/i18n/i18n';
// Error
export const required = value =>
  value && value.toString().trim().length > 0
    ? undefined
    : I18n.t('validate:required');
export const maxLength = (maxLength, msg) => value =>
  value && value.length > maxLength ? msg : undefined;

export const minLength4 = value =>
  value && value.length < 4 ? 'Must be' : undefined;

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const betweenLength = (min, max, msg) => value =>
  (value && value.length < min) || value.length > max ? msg : undefined;
export const mustGender = msg => value =>
  value != 0 && value != 1 ? msg : undefined;
export const number = msg => value =>
  value && isNaN(Number(value)) ? msg : undefined;

export const isEmail = value =>
  value &&
  !/^[a-z][a-z0-9%_\.]{3,32}@[a-z0-9]{3,}(\.[a-z]{3,4}){1,2}$/i.test(value)
    ? I18n.t('validate:lbErrorEmail')
    : undefined;

export const confirmPassword = (value, allValues, key) =>
  value !== allValues[key] ? I18n.t('validate:lbPasswordNotMatch') : undefined;
export const confirmPW = (value, allValues) =>
  value !== allValues.password
    ? I18n.t('validate:lbPasswordNotMatch')
    : undefined;
export const strongPassword = value =>
  value &&
  !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?!.*['"]).{8,}$/.test(value)
    ? 'Must like Abc@1234'
    : undefined;
// Warning
export const isYahoo = value =>
  value && /.+@yahoo\.com/.test(value)
    ? 'Really? You still use yahoo mail?'
    : undefined;

// Normalize
export const upper = value => value && value.toUpperCase();
export const lower = value => value && value.toLowerCase();
export const normalizePhone = value => {
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
