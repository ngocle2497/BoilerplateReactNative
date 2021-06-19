import {isIos} from '@common';
import {store} from '@store/store';
import React, {Suspense} from 'react';
import {I18nextProvider} from 'react-i18next';
import {StyleSheet} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import {Transitioning} from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import I18n from './src/app/library/utils/i18n/i18n';
import {AppContainer} from './src/app/navigation/AppNavigation';
import {
  transition,
  _transitionApp,
} from './src/app/transition/TransitionService';

if (isIos) {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(false);
  KeyboardManager.setKeyboardDistanceFromTextField(10);
  KeyboardManager.setEnableAutoToolbar(false);
  // KeyboardManager.setToolbarDoneBarButtonItemText("Done");
  // KeyboardManager.setToolbarManageBehaviourBy("subviews"); // "subviews" | "tag" | "position"
  // KeyboardManager.setToolbarPreviousNextButtonEnable(false);
  // KeyboardManager.setToolbarTintColor('#0000FF'); // Only #000000 format is supported
  // KeyboardManager.setToolbarBarTintColor('#FFFFFF'); // Only #000000 format is supported
  // KeyboardManager.setShouldShowToolbarPlaceholder(true);
  KeyboardManager.setOverrideKeyboardAppearance(true);
  KeyboardManager.setKeyboardAppearance('default'); // "default" | "light" | "dark"
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setShouldPlayInputClicks(true);
  KeyboardManager.resignFirstResponder();
  // KeyboardManager.isKeyboardShowing()
  //   .then((isShowing) => {
  //       // ...
  //   });
}
// console.disableYellowBox = true;
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
            <Transitioning.View
              style={styles.root}
              transition={transition}
              ref={_transitionApp}>
              <AppContainer />
            </Transitioning.View>
          </Suspense>
        </I18nextProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
