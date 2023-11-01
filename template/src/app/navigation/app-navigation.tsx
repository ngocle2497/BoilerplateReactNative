import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { useMMKVObject } from 'react-native-mmkv';
import { UnistylesTheme } from 'react-native-unistyles';
import { useSelector } from 'react-redux';

import { dispatch, RXStore } from '@common';
import {
  hideLoading,
  ProgressDialog,
  showLoading,
} from '@components/progress-dialog';
import { SnackBar } from '@components/snack-bar';
import { PortalHost } from '@gorhom/portal';
import { RootNavigation } from '@navigation/root-navigator';
import { useFlipper } from '@react-navigation/devtools';
import {
  NavigationContainer,
  Theme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { selectAppConfig } from '@redux-selector/app';
import { appActions } from '@redux-slice';
import { AppTheme } from '@theme';
import { lightTheme } from '@theme/light';

import { NavigationService } from './navigation-service';

export const AppContainer = () => {
  // state
  const navigationRef = useNavigationContainerRef();

  const appTheme = useMMKVObject<AppTheme>('THEME');

  const { loadingApp, showDialog } = useSelector(selectAppConfig);

  // effect
  useEffect(() => {
    dispatch(appActions.startLoadApp());
  }, []);

  useEffect(() => {
    if (showDialog) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [showDialog]);

  if (__DEV__) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFlipper(navigationRef);
  }

  // render
  return (
    <UnistylesTheme theme={appTheme || lightTheme}>
      <NavigationContainer
        ref={navigationRef}
        theme={(appTheme || lightTheme) as unknown as Theme}>
        <>
          <StatusBar translucent backgroundColor={'transparent'} />
          {!loadingApp && (
            <>
              <RootNavigation />
              <PortalHost name={'AppModal'} />
              <ProgressDialog />
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
