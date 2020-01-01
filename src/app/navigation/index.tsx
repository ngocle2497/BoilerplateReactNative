import React from 'react';
import {AppContainer} from './appContainer';
import NavigationService from './navigationService';
import {TFunction} from 'i18next';
interface AppProps {
  screenProps: {t: TFunction};
}
const AppNavigator = () => {
  return (
    <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};
export default AppNavigator;
