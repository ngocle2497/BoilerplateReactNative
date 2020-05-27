import * as React from "react";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigationService";
import { AppState } from "../store/app_redux/type";
import { RootNavigation } from "./RootNavigator";
import { MyAppTheme } from "../themes/index";
import AsyncStorage from "@react-native-community/async-storage";
import { APP_THEME } from "../config";
import { onSetAppTheme } from "../store/app_redux/action";
import { createSelector } from "../common";
import { AnimProcess, ProgressDialog } from '@components';
import { animProgressHolder, dropDown, dialogHolder } from '@utils'
import DropdownAlert from 'react-native-dropdownalert'
export const AppContainer = () => {
  const { token, theme } = createSelector<AppState>((x: any) => x.app);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const onLoadTheme = async () => {
    await AsyncStorage.getItem(APP_THEME)
      .then((val: string | null) => {
        if (val as keyof typeof MyAppTheme) {
          dispatch(onSetAppTheme(val));
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => {
    onLoadTheme();
  }, []);
  return (
    <NavigationContainer theme={MyAppTheme['default']} ref={navigationRef}>
      {loading === false ? <RootNavigation token={token} /> : null}
      <DropdownAlert titleNumOfLines={1} closeInterval={2000} ref={dropDown} />
      {/* <AnimProcess ref={animProgressHolder} underStatusbar={true} /> */}
      <ProgressDialog ref={dialogHolder} />
    </NavigationContainer>
  );
};
