import {dispatch, isIos, RXStore, useSelector} from '@common';
import {
  hideLoading,
  PortalHost,
  ProgressDialog,
  showLoading,
  SnackBar,
} from '@components';
import {ImageTransition} from '@library/components/light-box/image-transition';
import {NavigationContainer} from '@react-navigation/native';
import {onLoadApp} from '@store/app-redux/reducer';
import {MyAppTheme} from '@theme';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

import {navigationRef} from './navigation-service';
import {RootNavigation} from './root-navigator';

export const AppContainer = () => {
  // state
  const {token, loadingApp, showDialog, theme} = useSelector(x => x.app);

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
    if (isIos) {
      if (theme === 'dark') {
        KeyboardManager.setKeyboardAppearance('dark');
      } else {
        KeyboardManager.setKeyboardAppearance('light');
      }
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
