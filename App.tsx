import React, { Suspense, useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { withTranslation } from 'react-i18next';
import { AppContainer } from './src/app/navigation/index';
import { Provider, useDispatch } from 'react-redux';
import codePush from 'react-native-code-push';
import { store } from './src/app/store/store';
const ReloadAppOnLanguageChange = withTranslation('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
  wait: true,
})(AppContainer);

const MyApp = (props: any) => {
  const [updating, setUpdating] = useState(true);
  const checkUpdate = async () => {
    
    await codePush.sync(
      { installMode: codePush.InstallMode.ON_NEXT_RESTART },
      status => {
        switch (status) {
          case codePush.SyncStatus.INSTALLING_UPDATE:
            setUpdating(true);
            break;
          case codePush.SyncStatus.UP_TO_DATE:
            setUpdating(false);
            break;
          default:
            setUpdating(false);
        }
      },
    );
  };
  useEffect(() => {
    checkUpdate();
  }, []);
  return updating ? (
    <View />
  ) : (
      <Provider store={store}>
        <Suspense fallback={<View />}>
          <ReloadAppOnLanguageChange />
        </Suspense>
      </Provider>
    );
};
const codePushOption = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
};
export const App = codePush(codePushOption)(MyApp);
