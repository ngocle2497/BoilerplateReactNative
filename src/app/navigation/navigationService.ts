import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(NavigationActions.navigate({routeName, params}));
}

function goBack(key) {
  _navigator.dispatch(NavigationActions.back({key: key}));
}

function replaceScreen(routeName, params) {
  _navigator.dispatch(StackActions.replace({routeName, params}));
}

export default {
  navigate,
  goBack,
  replaceScreen,
  setTopLevelNavigator,
};
