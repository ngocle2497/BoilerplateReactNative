import {dispatch, isIos, RXStore, useSelector} from '@common';
import {hideLoading, ProgressDialog, showLoading, SnackBar} from '@components';
import {AppMode} from '@library/components/AppMode/AppMode';
import {ImageTransition} from '@library/components/LightBox/ImageTransition';
import {NavigationContainer} from '@react-navigation/native';
import {onLoadApp} from '@store/app_redux/reducer';
import {MyAppTheme} from '@theme';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

import {navigationRef} from './navigationService';
import {RootNavigation} from './RootNavigator';

export const AppContainer = () => {
  // state
  const {token, appMode, loadingApp, showDialog, theme} = useSelector(
    x => x.app,
  );

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
        <StatusBar
          translucent
          backgroundColor={MyAppTheme[theme].colors.background}
        />
        {!loadingApp && (
          <>
            <RootNavigation token={token} />
            <ProgressDialog />
            <SnackBar />
            <ImageTransition />
            {appMode !== 'prod' && <AppMode {...{appMode}} />}
          </>
        )}
        <RXStore />
      </>
    </NavigationContainer>
  );
};
