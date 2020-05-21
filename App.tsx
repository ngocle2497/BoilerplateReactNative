import React, { Suspense } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './src/app/store';
import { AnimProcess,ProgressDialog } from '@components';
import { animProgressHolder, dropDown,dialogHolder } from '@utils'
import I18n from '@utils/i18n/i18n'
import { AppContainer } from '@navigation';

console.disableYellowBox = true
export const MyApp = (props: any) => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Suspense fallback={<View />}>
          <AppContainer />
          <DropdownAlert titleNumOfLines={1} closeInterval={2000} ref={dropDown} />
          <AnimProcess ref={animProgressHolder} underStatusbar={true} />
          <ProgressDialog ref={dialogHolder}/>
        </Suspense>
      </Provider>
    </SafeAreaProvider>
  );
};