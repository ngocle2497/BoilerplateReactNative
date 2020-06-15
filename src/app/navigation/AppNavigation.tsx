import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigationService";
import { AppState, App_Mode } from "../store/app_redux/type";
import { RootNavigation } from "./RootNavigator";
import { createSelector } from "../common";
import { AnimProcess, ProgressDialog } from '@components';
import { animProgressHolder, dropDown, dialogHolder, loadString } from '@utils'
import DropdownAlert from 'react-native-dropdownalert'
import { StyleSheet, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { R } from "@assets/value";
import { onSetAppMode, onSetAppUrl } from "@store/app_redux/action";
const modeToString = (mode: App_Mode): string => {
  switch (mode) {
    case 'dev':
      return "Dev Mode";
    case 'prod':
      return "Prod Mode";
    case 'staging':
      return "Staging Mode";
    default:
      return "";
  }
}
export const AppContainer = () => {
  const { token, appMode } = createSelector<AppState>((x: any) => x.app);
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true);
  const _loadAppMode = React.useCallback(async () => {
    const appMode = await loadString(R.strings.APP_MODE)
    if (typeof appMode === 'string') {
      switch (appMode) {
        case 'dev':
        case 'prod':
        case 'staging':
          dispatch(onSetAppMode(appMode))
          break;
        default:
          break;
      }
    }
  }, [])
  React.useEffect(async () => {
    await _loadAppMode()
    setLoading(false)
  }, [])
  return (
    <NavigationContainer ref={navigationRef}>
      {loading === false ? <RootNavigation token={token} /> : null}
      <DropdownAlert titleNumOfLines={1} closeInterval={2000} ref={dropDown} />
      {/* <AnimProcess ref={animProgressHolder} underStatusbar={true} /> */}
      <ProgressDialog ref={dialogHolder} />
      {appMode !== 'prod' && < View pointerEvents={'none'} style={[styles.wrapMode]}>
        <Text adjustsFontSizeToFit={true} style={[styles.textMode]}>{modeToString(appMode)}</Text>
      </View>}
    </NavigationContainer >
  );
};


const styles = StyleSheet.create({
  textMode: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 11,
    textAlign: 'center'
  },
  wrapMode: {
    position: 'absolute',
    right: -20,
    top: 0,
    zIndex: 999,
    width: 150,
    backgroundColor: '#bc9372',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    transform: [{ rotate: '45deg' }, { translateX: 30 }]
  }
});