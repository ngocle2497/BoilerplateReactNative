import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationService';
import { AppState } from '../store/app_redux/type';
import { RootNavigation } from './RootNavigator';
import { useRedux } from '../common';
import { ProgressDialog } from '@components';
import { dialogHolder } from '@utils';
import { onLoadApp } from '@store/app_redux/action';
import { AppMode } from '../library/components/AppMode/AppMode';
import { MyAppTheme } from '@theme';

export const AppContainer = () => {
  const { dispatch, createSelector } = useRedux();
  const { token, appMode, loading, theme } = createSelector<AppState>((x: any) => x.app);
  useEffect(() => {
    dispatch(onLoadApp())
  }, []);
  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme[theme]}>
      {loading === false &&
        <>
          <RootNavigation token={token} />
          <ProgressDialog ref={dialogHolder} />
          {appMode !== 'prod' && <AppMode {...{ appMode }} />}
        </>}
    </NavigationContainer>
  );
};
