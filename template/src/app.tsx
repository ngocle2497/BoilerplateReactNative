import React, { Suspense } from 'react';
import { StyleSheet, UIManager } from 'react-native';

import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import KeyboardManager from 'react-native-keyboard-manager';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { isIos } from '@common';
import { PortalProvider } from '@gorhom/portal';
import { AppContainer } from '@navigation/app-navigation';
import { store } from '@store/store';
import I18n from '@utils/i18n/i18n';

// const json = require('./app/assets/vector-icon/selection.json');
// const key = json.icons.reduce((pv, curr) => {
//   pv[(curr.properties.name as string).replaceAll('-', '_')] =
//     curr.properties.name;
//   return pv;
// }, {});
// console.log(
//   Object.entries(key)
//     .sort(([, a], [, b]) => a - b)
//     .reduce((r, [k, v]) => ({ ...r, [k]: v }), {}),
// );

if (!isIos) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

KeyboardManager.setEnable(true);

KeyboardManager.setEnableDebugging(false);

KeyboardManager.setKeyboardDistanceFromTextField(10);

KeyboardManager.setLayoutIfNeededOnUpdate(true);

KeyboardManager.setEnableAutoToolbar(false);

KeyboardManager.setOverrideKeyboardAppearance(true);

// "default" | "light" | "dark"
KeyboardManager.setKeyboardAppearance('default');

KeyboardManager.setShouldResignOnTouchOutside(true);

KeyboardManager.setShouldPlayInputClicks(true);

KeyboardManager.resignFirstResponder();

KeyboardManager.reloadLayoutIfNeeded();

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
