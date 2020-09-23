import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {Metrix, Colors, Images, NavigationService} from '../../config';
import auth from '@react-native-firebase/auth';

export const SplashScreen = props => {
  const navToLogin = () => {
    setTimeout(() => {
      NavigationService.reset_0('LoginScreen');
    }, 2000);
  };
  const navToHome = () => {
    setTimeout(() => {
      NavigationService.reset_0('HomeScreen');
    }, 2000);
  };

  useEffect(() => {
    console.log('CHECKING EXISTING USER: ', auth().currentUser);
    if (auth().currentUser) {
      navToHome();
    } else {
      navToLogin();
    }
  }, []);

  return (
    <View
      style={{
        height: Metrix.VerticalSize(840),
        width: Metrix.HorizontalSize(),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: Metrix.HorizontalSize(332),
          height: Metrix.VerticalSize(213),
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
          source={Images.firebase}
        />
      </View>
    </View>
  );
};
