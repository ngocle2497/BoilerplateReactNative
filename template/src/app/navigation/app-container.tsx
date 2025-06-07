import React, { useEffect } from 'react';

import { SnackBar } from '@components/snack-bar';
import { PortalHost } from '@gorhom/portal';
import { RootNavigation } from '@navigation/root-navigator';
import { selectAppLoading } from '@selectors/app';
import { appServices } from '@services/app';
import { useAppStore } from '@stores/app';
import { useShallow } from 'zustand/shallow';

export const AppContainer = () => {
  // state
  const { loadingApp } = useAppStore(useShallow(selectAppLoading));

  // effect
  useEffect(() => {
    appServices.startLoadApp();
  }, []);

  // render
  return (
    <>
      {!loadingApp && (
        <>
          <RootNavigation />
          <PortalHost name={'AppModal'} />
          <SnackBar />
        </>
      )}
    </>
  );
};
