import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, AppDispatch, dispatch} from '@common';
import {AnimProcess, ProgressDialog, SnackBar} from '@components';
import {
  dialogHolder,
  animProgressHolder,
  hideLoading,
  showLoading,
  snackBarHolder,
  imageTransitionHolder,
} from '@utils';
import {onLoadApp} from '@store/app_redux/reducer';
import {AppMode} from '@library/components/AppMode/AppMode';
import {MyAppTheme} from '@theme';
import {ImageTransition} from '@library/components/LightBox/ImageTransition';

import {RootNavigation} from './RootNavigator';
import {navigationRef} from './navigationService';

export const AppContainer = () => {
  // state
  const {token, appMode, loading, showDialog, theme} = useSelector(x => x.app);

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

  // render
  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme[theme]}>
      <>
        {!loading && (
          <>
            <RootNavigation token={token} />
            <ProgressDialog ref={dialogHolder} />
            <SnackBar ref={snackBarHolder} />
            <AnimProcess ref={animProgressHolder} />
            <ImageTransition ref={imageTransitionHolder} />
            {appMode !== 'prod' && <AppMode {...{appMode}} />}
          </>
        )}
        <AppDispatch />
      </>
    </NavigationContainer>
  );
};
