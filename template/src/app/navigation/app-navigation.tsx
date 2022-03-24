import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { AppModule, dispatch, RXStore, useSelector } from '@common';
import {
  hideLoading,
  PortalHost,
  ProgressDialog,
  showLoading,
  SnackBar,
} from '@components';
import { ImageTransition } from '@library/components/light-box/image-transition';
import { NavigationContainer } from '@react-navigation/native';
import { onLoadApp } from '@store/app-redux/reducer';
import { MyAppTheme } from '@theme';

import { navigationRef } from './navigation-service';
import { RootNavigation } from './root-navigator';

export const AppContainer = () => {
  // state
  const { token, loadingApp, showDialog, theme } = useSelector(x => x.app);

  // effect
  useEffect(() => {
    dispatch(onLoadApp());
  }, []);

  useEffect(() => {
    if (showDialog) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [showDialog]);

  useEffect(() => {
    if (theme === 'dark') {
      AppModule.setIQKeyboardOption({
        keyboardAppearance: 'dark',
      });
    } else {
      AppModule.setIQKeyboardOption({
        keyboardAppearance: 'light',
      });
    }
  }, [theme]);

  // render
  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme[theme]}>
      <>
        <StatusBar translucent backgroundColor={'transparent'} />
        {!loadingApp && (
          <>
            <PortalHost name={'AppModal'} />
            <RootNavigation token={token} />
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
