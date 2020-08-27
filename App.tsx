import React, { Suspense } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from '@store/store';
import I18n from './src/app/library/utils/i18n/i18n';
import { AppContainer } from './src/app/navigation/AppNavigation';
import { Transitioning } from 'react-native-reanimated';
import { _transitionApp, transition } from './src/app/transition/TransitionService';
import { I18nextProvider } from 'react-i18next';

console.disableYellowBox = true;
const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
export const MyApp = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <I18nextProvider i18n={I18n}>
          <Suspense fallback={<View />}>
            <Transitioning.View style={styles.root} transition={transition} ref={_transitionApp}>
              <AppContainer />
            </Transitioning.View>
          </Suspense>
        </I18nextProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
