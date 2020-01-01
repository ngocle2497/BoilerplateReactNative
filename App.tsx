import React, {Suspense} from 'react';
import {View} from 'react-native';
import {withTranslation, useTranslation} from 'react-i18next';
import AppContainer from './src/app/navigation/index';
import {Provider} from 'react-redux';

import {store} from './src/app/store/store';

const WrappedStack = () => {
  const {t} = useTranslation();
  return <AppContainer screenProps={{t: t}} />;
};
const ReloadAppOnLanguageChange = withTranslation('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
  wait: true,
})(WrappedStack);

export const MyApp = (props: any) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<View />}>
        <ReloadAppOnLanguageChange />
      </Suspense>
    </Provider>
  );
};
