import {NativeModules} from 'react-native';

import {isIos} from '../method';

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
type Image = {
  uri: string;
  width?: number;
  height?: number;
};
type ImageResponse = {
  uri: string;
  name: string;
};
export const fixRotation = ({uri, height = 800, width = 600}: Image) => {
  return new Promise<ImageResponse>(rs => {
    if (isIos) {
      AppModule.fixRotation(
        uri,
        width,
        height,
        (_?: string, res?: ImageResponse) => {
          if (res) {
            rs({uri: res.uri, name: res.name});
          } else {
            rs({uri: uri, name: 'new_image.png'});
          }
        },
      );
    } else {
      AppModule.fixRotation(uri, width, height, rs, () => {
        rs({uri: uri, name: 'new_image.png'});
      });
    }
  });
};
