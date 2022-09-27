import React, { Suspense } from 'react';
import { LogBox, StyleSheet, UIManager } from 'react-native';

import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { isIos } from '@common';
import { PortalProvider } from '@gorhom/portal';
import { AppModule } from '@native-module';
import { AppContainer } from '@navigation/app-navigation';
import { store } from '@store/store';
import I18n from '@utils/i18n/i18n';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function forwardRef<T, P = {}>(
    render: (
      props: P,
      ref: import('react').ForwardedRef<T>,
    ) => import('react').ReactElement | null,
  ): (
    props: P & import('react').RefAttributes<T>,
  ) => import('react').ReactElement | null;
}

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
/**
 * get icon name by file json
 * const json = require('./app/assets/vector-icon/selection.json');
 * const key = json.icons.reduce((pv, curr) => {
 *   pv[replaceAll(curr.properties.name, '-', '_')] = curr.properties.name;
 *   return pv;
 * }, {});
 * console.log(
 * Object.entries(key)
 *    .sort(([, a], [, b]) => a - b)
 *     .reduce((r, [k, v]) => ({ ...r, [k]: v }), {}),
 */
if (!isIos) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
AppModule.setIQKeyboardOption({
  enable: true,
  layoutIfNeededOnUpdate: true,
  enableDebugging: false,
  keyboardDistanceFromTextField: 10,
  enableAutoToolbar: false,
  overrideKeyboardAppearance: true,
  keyboardAppearance: 'default',
  shouldResignOnTouchOutside: true,
  shouldPlayInputClicks: true,
  resignFirstResponder: true,
  reloadLayoutIfNeeded: true,
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export const MyApp = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <I18nextProvider i18n={I18n}>
          <Suspense fallback={null}>
            <PortalProvider>
              <GestureHandlerRootView style={styles.root}>
                <AppContainer />
              </GestureHandlerRootView>
            </PortalProvider>
          </Suspense>
        </I18nextProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
