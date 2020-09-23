import {CommonActions} from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

function goBack() {
  _navigator.dispatch(CommonActions.goBack());
}

// function replace(routeName, params) {
//   _navigator.dispatch(
//     StackActions.replace({
//       routeName,
//       params,
//     }),
//   );
// }

function reset_0(routeName) {
  _navigator.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: routeName}],
    }),
  );
}

export default {
  setTopLevelNavigator,
  navigate,
  // replace,
  goBack,
  reset_0,
};
