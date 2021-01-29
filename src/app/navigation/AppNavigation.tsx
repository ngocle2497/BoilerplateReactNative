import React, {useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {useSelector, AppDispatch, dispatch} from "@common";
import {ProgressDialog, SnackBar} from "@components";
import {dialogHolder, hideLoading, showLoading, snackBarHolder} from "@utils";
import {onLoadApp} from "@store/app_redux/reducer";
import {AppMode} from "@library/components/AppMode/AppMode";
import {MyAppTheme} from "@theme";

import {RootNavigation} from "./RootNavigator";
import {navigationRef} from "./navigationService";

export const AppContainer = () => {
  const {token, appMode, loading, showDialog, theme} = useSelector(
    (x) => x.app,
  );
  useEffect(() => {
    dispatch(onLoadApp());
  }, []);
  useEffect(() => {
    if (showDialog) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [showDialog]);
  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme[theme]}>
      <>
        {loading === false && (
          <>
            <RootNavigation token={token} />
            <ProgressDialog ref={dialogHolder} />
            <SnackBar ref={snackBarHolder} />
            {appMode !== "prod" && <AppMode {...{appMode}} />}
          </>
        )}
        <AppDispatch />
      </>
    </NavigationContainer>
  );
};
