import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigationService';
import { AppState } from '../store/app_redux/type';
import { RootNavigation } from './RootNavigator';
import { useRedux } from '../common';
import { AnimProcess, ProgressDialog } from '@components';
import { animProgressHolder, dialogHolder, loadString } from '@utils';
import { R } from '@assets/value';
import { onSetAppMode } from '@store/app_redux/action';
import { AppMode } from '../library/components/AppMode/AppMode';

export const AppContainer = () => {
  const { dispatch, createSelector } = useRedux();
  const { token, appMode } = createSelector<AppState>((x: any) => x.app);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const _loadAppMode = async () => {
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
    }
    _loadAppMode();
    setLoading(false);
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      {loading === false ? <RootNavigation token={token} /> : null}
      {/* <AnimProcess ref={animProgressHolder} underStatusbar={true} /> */}
      <ProgressDialog ref={dialogHolder} />
      {appMode !== 'prod' && <AppMode {...{ appMode }} />}
    </NavigationContainer>
  );
};
