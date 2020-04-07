import React, { Suspense, useEffect, useState } from 'react';
import { View, YellowBox } from 'react-native';
import { withTranslation } from 'react-i18next';
import { AppContainer } from './src/app/navigation/index';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/app/store/store';
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
      <Provider store={store}>
        <Suspense fallback={<View />}>
          <ReloadAppOnLanguageChange />
        </Suspense>
      </Provider>
    );
};

