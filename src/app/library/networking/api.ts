export const DEV_MODE_API = "";
export const PROD_MODE_API = "";
export const STAGING_MODE_API = "";
export const APP_MODE_URL = {
  dev: DEV_MODE_API,
  prod: PROD_MODE_API,
  staging: STAGING_MODE_API,
};
export type AppModeType = keyof typeof APP_MODE_URL;

export const ApiConstants = {
  LOGIN: "",
  REFRESH_TOKEN: "",
};
