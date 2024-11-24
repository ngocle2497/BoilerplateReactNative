import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { dispatch, RXStore } from '@common/redux';
import { SnackBar } from '@components/snack-bar';
import { PortalHost } from '@gorhom/portal';
import { RootNavigation } from '@navigation/root-navigator';
import { selectAppConfig } from '@redux-selector/app';
import { appActions } from '@redux-slice/app';
import { StatusBar } from 'expo-status-bar';

export const AppContainer = () => {
  // state
  const { loadingApp } = useSelector(selectAppConfig);

  // effect
  useEffect(() => {
    dispatch(appActions.startLoadApp());
  }, []);

  // render
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      {!loadingApp && (
        <>
          <RootNavigation />
          <PortalHost name={'AppModal'} />
          <SnackBar />
        </>
      )}
      <RXStore />
    </>
  );
};
