import * as React from "react";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigationService";
import { AppState } from "../store/app_redux/type";
import { RootNavigation } from "./";
import { MyAppTheme } from "../themes/index";
import AsyncStorage from "@react-native-community/async-storage";
import { APP_THEME } from "../config";
import { onSetAppTheme } from "../store/app_redux/action";
import { createSelector } from "../common";
export const AppContainer = () => {
  const { token } = createSelector<AppState>((x) => x.app);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const onLoadTheme = async () => {
    await AsyncStorage.getItem(APP_THEME)
      .then((val: string | null) => {
        if (val && MyAppTheme[val]) {
          dispatch(onSetAppTheme(val));
        }
        setLoading(false);
      })
      .catch((er) => {
        setLoading(false);
      });
  };
  React.useEffect(() => {
    onLoadTheme();
  }, []);
  return (
    <NavigationContainer theme={MyAppTheme[theme]} ref={navigationRef}>
      {loading === false ? <RootNavigation token={token} /> : null}
    </NavigationContainer>
  );
};
