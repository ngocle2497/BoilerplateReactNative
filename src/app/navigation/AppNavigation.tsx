import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigationService';
import {AppState} from '../store/app_redux/type';
import {RootNavigation} from './RootNavigator';
import {useRedux} from '../common';
import {AnimProcess, ProgressDialog} from '@components';
import {animProgressHolder, dropDown, dialogHolder, loadString} from '@utils';
import DropdownAlert from 'react-native-dropdownalert';
import {R} from '@assets/value';
import {onSetAppMode} from '@store/app_redux/action';
import {AppMode} from '../library/components/AppMode/AppMode';

export const AppContainer = () => {
  const {dispatch, createSelector} = useRedux();
  const {token, appMode} = createSelector<AppState>((x: any) => x.app);
  const [loading, setLoading] = React.useState(true);
  const _loadAppMode = React.useCallback(async () => {
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
  React.useEffect(async () => {
    await _loadAppMode();
    setLoading(false);
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      {loading === false ? <RootNavigation token={token} /> : null}
      <DropdownAlert titleNumOfLines={1} closeInterval={2000} ref={dropDown} />
      {/* <AnimProcess ref={animProgressHolder} underStatusbar={true} /> */}
      <ProgressDialog ref={dialogHolder} />
      {appMode !== 'prod' && <AppMode {...{appMode}} />}
    </NavigationContainer>
  );
};
