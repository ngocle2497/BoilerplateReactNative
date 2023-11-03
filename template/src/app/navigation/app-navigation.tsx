import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { useMMKVObject } from 'react-native-mmkv';
import { UnistylesTheme } from 'react-native-unistyles';
import { useSelector } from 'react-redux';

import { dispatch, RXStore } from '@common/redux';
import { SnackBar } from '@components/snack-bar';
import { PortalHost } from '@gorhom/portal';
import { RootNavigation } from '@navigation/root-navigator';
import { useFlipper } from '@react-navigation/devtools';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { selectAppConfig } from '@redux-selector/app';
import { appActions } from '@redux-slice';
import { AppTheme } from '@theme';
import { lightTheme } from '@theme/light';
import { AppStorage } from '@utils/storage';

import { NavigationService } from './navigation-service';

export const AppContainer = () => {
  // state
  const navigationRef = useNavigationContainerRef();

  const [appTheme] = useMMKVObject<AppTheme>('APP_THEME', AppStorage);

  const { loadingApp } = useSelector(selectAppConfig);

  // effect
  useEffect(() => {
    dispatch(appActions.startLoadApp());
  }, []);

  if (__DEV__) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFlipper(navigationRef);
  }

  // render
  return (
    <UnistylesTheme theme={appTheme || lightTheme}>
      <NavigationContainer
        ref={navigationRef}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: (appTheme || lightTheme).color.background,
          },
        }}>
        <>
          <StatusBar translucent backgroundColor={'transparent'} />
          {!loadingApp && (
            <>
              <RootNavigation />
              <PortalHost name={'AppModal'} />
              <SnackBar />
            </>
          )}
          <RXStore />
          <NavigationService />
        </>
      </NavigationContainer>
    </UnistylesTheme>
  );
};
