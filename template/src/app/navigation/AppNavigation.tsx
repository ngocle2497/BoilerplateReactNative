import {dispatch, isIos, RXStore, useSelector} from '@common';
import {ProgressDialog, SnackBar} from '@components';
import {AppMode} from '@library/components/AppMode/AppMode';
import {ImageTransition} from '@library/components/LightBox/ImageTransition';
import {NavigationContainer} from '@react-navigation/native';
import {onLoadApp} from '@store/app_redux/reducer';
import {MyAppTheme} from '@theme';
import {
  dialogHolder,
  hideLoading,
  imageTransitionHolder,
  showLoading,
  snackBarHolder,
} from '@utils';
import React, {useEffect} from 'react';
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
        {!loadingApp && (
          <>
            <RootNavigation token={token} />
            <ProgressDialog ref={dialogHolder} />
            <SnackBar ref={snackBarHolder} />
            <ImageTransition ref={imageTransitionHolder} />
            {appMode !== 'prod' && <AppMode {...{appMode}} />}
          </>
        )}
        <RXStore />
      </>
    </NavigationContainer>
  );
};
