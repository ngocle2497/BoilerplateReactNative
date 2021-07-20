import {NativeModules} from 'react-native';

const {AppModule} = NativeModules;
export const getVersion = () => {
  return AppModule.getVersion();
};
export const getDeviceType = () => {
  return AppModule.getDeviceType();
};
export const getAppName = () => {
  return AppModule.getAppName();
};
export const getDeviceId = () => {
  return AppModule.getDeviceId();
};
export const getBuildNumber = () => {
  return AppModule.getBuildNumber();
};
