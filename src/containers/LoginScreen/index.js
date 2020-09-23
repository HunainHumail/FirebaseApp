import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Metrix, Colors, Images, Fonts, NavigationService} from '../../config';
import {AuthActions} from '../../store/actions';
import {useSelector, useDispatch} from 'react-redux';
import {showToast, validateEmail} from '../../config/utills';

export const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoding = useSelector(state => state.Auth.isLoading);
  const dispatch = useDispatch();
  console.log('IS LOADING', isLoding);

  const login = () => {
    if (email && password) {
      let payload = {
        email: email,
        password: password,
      };
      dispatch(AuthActions.login(payload));
    } else {
      showToast('Fields cannot be left empty');
    }
  };

  return (
    <View
      style={{
        height: Metrix.VerticalSize(),
        width: Metrix.HorizontalSize(),
        alignItems: 'center',
      }}>
      <View
        style={{
          width: Metrix.HorizontalSize(200),
          height: Metrix.VerticalSize(150),
          marginTop: Metrix.VerticalSize(100),
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
      <Text
        style={{
          fontFamily: Fonts['Gilroy-ExtraBold'],
          fontSize: Metrix.FontLarge,
          fontWeight: 'bold',
        }}>
        Firebase App
      </Text>
      <View
        style={{
          borderColor: Colors.BlackOpacity(),
          borderWidth: Metrix.VerticalSize(1),
          width: Metrix.HorizontalSize(300),
          borderRadius: 10,
          marginTop: Metrix.VerticalSize(80),
          marginHorizontal: Metrix.HorizontalSize(20),
        }}>
        <TextInput
          onChangeText={value => {
            setEmail(value);
          }}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize={'none'}
          placeholderTextColor={Colors.BlackOpacity()}
          style={{
            fontFamily: Fonts['Gilroy-Light'],
            fontSize: Metrix.FontSmall,
            color: Colors.Black,
            marginLeft: Metrix.HorizontalSize(10),
          }}
        />
      </View>
      <View
        style={{
          borderColor: Colors.BlackOpacity(),
          borderWidth: Metrix.VerticalSize(1),
          width: Metrix.HorizontalSize(300),
          borderRadius: 10,
          marginHorizontal: Metrix.HorizontalSize(20),
          marginTop: Metrix.VerticalSize(20),
        }}>
        <TextInput
          onChangeText={value => {
            setPassword(value);
          }}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          placeholderTextColor={Colors.BlackOpacity()}
          style={{
            fontFamily: Fonts['Gilroy-Light'],
            fontSize: Metrix.FontSmall,
            color: Colors.Black,
            marginLeft: Metrix.HorizontalSize(10),
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          login();
        }}
        style={{
          width: Metrix.HorizontalSize(300),
          marginTop: Metrix.VerticalSize(20),
          backgroundColor: Colors.YellowTag,
          height: Metrix.VerticalSize(50),
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isLoding ? (
          <ActivityIndicator color={Colors.WhiteText} />
        ) : (
          <Text
            style={{
              color: Colors.White,
            }}>
            Login
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate('SignUpScreen');
        }}
        style={{
          marginTop: Metrix.VerticalSize(20),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Colors.YellowTag,
          }}>
          Sign Up?
        </Text>
      </TouchableOpacity>
    </View>
  );
};
