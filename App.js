/**
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationService, Colors} from './src/config';
import {Provider} from 'react-redux';
import {store} from './src/store/';
import {Root} from 'native-base';
import {MainStack} from './src/stacks/MainStack';
const App = () => {
  return (
    <Provider store={store}>
      {Platform.OS == 'android' ? (
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.AppBackground}
        />
      ) : (
        <></>
      )}
      <Root>
        <NavigationContainer
          ref={ref => NavigationService.setTopLevelNavigator(ref)}>
          <MainStack />
        </NavigationContainer>
      </Root>
    </Provider>
  );
};

export default App;
