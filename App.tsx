import React, { Suspense } from 'react';
import { View, YellowBox } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './src/app/store';
import { AnimProcess } from './src/app/library/components';
import { animProgressHolder, dropDown } from './src/app/library/utils'
import { AppContainer } from './src/app/navigation';
const ReloadAppOnLanguageChange = withTranslation('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
  wait: true,
})(AppContainer);
YellowBox.ignoreWarnings([
  'Calling `getNode()` on the ref of an Animated component is no longer necessary. You can now directly use the ref instead.',
]);
export const MyApp = (props: any) => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Suspense fallback={<View />}>
          <ReloadAppOnLanguageChange />
          <DropdownAlert titleNumOfLines={1} closeInterval={2000} ref={dropDown} />
          <AnimProcess ref={animProgressHolder} underStatusbar={true} />
        </Suspense>
      </Provider>
    </SafeAreaProvider>
  );
};