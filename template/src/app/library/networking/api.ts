export const DEV_MODE_API = '';
export const PROD_MODE_API = '';
export const STAGING_MODE_API = '';
export const APP_URL = {
  dev: DEV_MODE_API,
  prod: PROD_MODE_API,
  staging: STAGING_MODE_API,
};
export type AppUrlType = keyof typeof APP_URL;

export const ApiConstants = {
  LOGIN: '',
  REFRESH_TOKEN: '',
};
