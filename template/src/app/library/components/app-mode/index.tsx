import {APP_MODE} from '@config/api';
import {AppModeType} from '@networking';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {Text, View} from 'react-native';

import {styles} from './styles';
import {AppModeProps} from './type';

const modeToString = (mode: AppModeType): string => {
  switch (mode) {
    case APP_MODE.DEV:
      return 'Dev Mode';
    case APP_MODE.PROD:
      return 'Prod Mode';
    case APP_MODE.STAGING:
      return 'Staging Mode';
    default:
      return '';
  }
};
const AppModeComponent = ({appMode}: AppModeProps) => {
  // render
  return (
    <View pointerEvents={'none'} style={[styles.wrapMode]}>
      <Text adjustsFontSizeToFit={true} style={[styles.textAppMode]}>
        {modeToString(appMode)}
      </Text>
    </View>
  );
};

export const AppMode = memo(AppModeComponent, isEqual);
