import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigationService";
import { AppState } from "../store/app_redux/type";
import { RootNavigation } from "./RootNavigator";
import { createSelector } from "../common";
import { AnimProcess, ProgressDialog } from '@components';
import { animProgressHolder, dropDown, dialogHolder } from '@utils'
import DropdownAlert from 'react-native-dropdownalert'
export const AppContainer = () => {
  const { token } = createSelector<AppState>((x: any) => x.app);
  const [loading, setLoading] = React.useState(false);
  return (
    <NavigationContainer ref={navigationRef}>
      {loading === false ? <RootNavigation token={token} /> : null}
      <DropdownAlert titleNumOfLines={1} closeInterval={2000} ref={dropDown} />
      {/* <AnimProcess ref={animProgressHolder} underStatusbar={true} /> */}
      <ProgressDialog ref={dialogHolder} />
    </NavigationContainer>
  );
};
