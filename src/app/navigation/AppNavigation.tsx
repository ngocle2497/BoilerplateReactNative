import React, { useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationService';
import { AppState } from '../store/app_redux/type';
import { RootNavigation } from './RootNavigator';
import { useRedux } from '../common';
import { AnimProcess, ProgressDialog } from '@components';
import { animProgressHolder, dropDown, dialogHolder, loadString } from '@utils';
import DropdownAlert from 'react-native-dropdownalert';
import { R } from '@assets/value';
import { onSetAppMode } from '@store/app_redux/action';
import { AppMode } from '../library/components/AppMode/AppMode';

export const AppContainer = () => {
  const { dispatch, createSelector } = useRedux();
  const { token, appMode } = createSelector<AppState>((x: any) => x.app);
  const [loading, setLoading] = React.useState(true);
  const _loadAppMode = useCallback(async () => {
    const appMode = await loadString(R.strings.APP_MODE);
    if (typeof appMode === 'string') {
      switch (appMode) {
        case 'dev':
        case 'prod':
        case 'staging':
          dispatch(onSetAppMode(appMode));
          break;
        default:
          break;
      }
    }
  }, []);
  useEffect(() => {
    const _loadAppMpde = async () => {
      const appMode = await loadString(R.strings.APP_MODE);
      console.log("start")
      if (typeof appMode === 'string') {
        switch (appMode) {
          case 'dev':
          case 'prod':
          case 'staging':
            dispatch(onSetAppMode(appMode));
            console.log("start1")
            break;
          default:
            break;
        }
      }
    }
    _loadAppMpde();
    console.log('end')
    setLoading(false);
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      {loading === false ? <RootNavigation token={token} /> : null}
      <DropdownAlert titleNumOfLines={1} closeInterval={2000} ref={dropDown} />
      {/* <AnimProcess ref={animProgressHolder} underStatusbar={true} /> */}
      <ProgressDialog ref={dialogHolder} />
      {appMode !== 'prod' && <AppMode {...{ appMode }} />}
    </NavigationContainer>
  );
};
