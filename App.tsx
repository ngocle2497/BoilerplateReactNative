import React, { Suspense } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from '@store/store';
import I18n from './src/app/library/utils/i18n/i18n';
import { AppContainer } from './src/app/navigation/AppNavigation';

console.disableYellowBox = true;
export const MyApp = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Suspense fallback={<View />}>
          <AppContainer />
        </Suspense>
      </Provider>
    </SafeAreaProvider>
  );
};
