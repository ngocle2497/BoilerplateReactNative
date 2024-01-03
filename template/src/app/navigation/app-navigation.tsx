import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { useSelector } from 'react-redux';

import { dispatch, RXStore } from '@common/redux';
import { SnackBar } from '@components/snack-bar';
import { PortalHost } from '@gorhom/portal';
import { RootNavigation } from '@navigation/root-navigator';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { selectAppConfig } from '@redux-selector/app';
import { appActions } from '@redux-slice';
import { useStyles } from '@theme';

import { NavigationService } from './navigation-service';

export const AppContainer = () => {
  // state
  const navigationRef = useNavigationContainerRef();

  const { theme } = useStyles();

  const { loadingApp } = useSelector(selectAppConfig);

  // effect
  useEffect(() => {
    dispatch(appActions.startLoadApp());
  }, []);

  // render
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.color.background,
        },
      }}>
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
        <NavigationService />
      </>
    </NavigationContainer>
  );
};
