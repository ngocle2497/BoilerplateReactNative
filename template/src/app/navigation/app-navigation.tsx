import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import KeyboardManager from 'react-native-keyboard-manager';
import { useSelector } from 'react-redux';

import { dispatch, RXStore } from '@common';
import {
  hideLoading,
  ProgressDialog,
  showLoading,
  SnackBar,
} from '@components';
import { ImageTransition } from '@components/light-box/image-transition';
import { PortalHost } from '@gorhom/portal';
import { navigationRef } from '@navigation/navigation-service';
import { RootNavigation } from '@navigation/root-navigator';
import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer } from '@react-navigation/native';
import { selectAppConfig } from '@redux-selector/app';
import { appActions } from '@redux-slice';
import { MyAppTheme } from '@theme';

export const AppContainer = () => {
  // state
  const { loadingApp, showDialog, theme } = useSelector(selectAppConfig);

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

  useEffect(() => {
    KeyboardManager.setKeyboardAppearance(theme);
  }, [theme]);

  if (__DEV__) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFlipper(navigationRef);
  }

  // render
  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme[theme]}>
      <>
        <StatusBar translucent backgroundColor={'transparent'} />
        {!loadingApp && (
          <>
            <RootNavigation />
            <PortalHost name={'AppModal'} />
            <ProgressDialog />
            <SnackBar />
            <ImageTransition />
          </>
        )}
        <RXStore />
      </>
    </NavigationContainer>
  );
};
