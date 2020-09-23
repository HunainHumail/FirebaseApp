import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Metrix, Colors, Images, Fonts} from '../../config';
import ImagePicker from 'react-native-image-picker';
import {showToast, validateEmail} from '../../config/utills';
import {AuthActions} from '../../store/actions';

export const SignUpScreen = props => {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const isLoding = useSelector(state => state.Auth.isLoading);
  const dispatch = useDispatch();
  console.log('IS LOADING', isLoding);

  const signUp = () => {
    if (username && email && password && profileImage) {
      let payload = {
        username: username,
        email: email,
        password: password,
        profileImage: profileImage,
      };
      dispatch(AuthActions.signUpWithEmailPassword(payload));
    } else {
      showToast('Fields cannot be left empty');
    }
  };
  const options = {
    title: 'Select Image',
    takePhotoButtonTitle: 'Take Photo from your camera',
    chooseFromLibraryButtonTitle: 'Choose Photo from Library',
  };

  const addImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          name: response.fileName,
          type: response.type,
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', ''),
        };
        setProfileImage(source);
      }
    });
  };

  return (
    <ScrollView>
      <View
        style={{
          // height: Metrix.VerticalSize(),
          // width: Metrix.HorizontalSize(),
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: Fonts['Gilroy-ExtraBold'],
            fontSize: Metrix.FontLarge,
            fontWeight: 'bold',
            marginTop: Metrix.VerticalSize(80),
          }}>
          Sign Up
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
              setUserName(value);
            }}
            placeholder="Username"
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
            marginTop: Metrix.VerticalSize(20),
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Add Photo</Text>
          <TouchableOpacity
            onPress={() => {
              addImage();
            }}
            style={{
              width: Metrix.HorizontalSize(100),
              height: Metrix.VerticalSize(50),
              marginTop: Metrix.VerticalSize(20),
            }}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
              source={Images.add_photo}
            />
          </TouchableOpacity>
        </View>
        {profileImage ? (
          <View
            onPress={() => {
              addImage();
            }}
            style={{
              width: Metrix.HorizontalSize(300),
              height: Metrix.VerticalSize(300),
              marginTop: Metrix.VerticalSize(20),
            }}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
              source={profileImage}
            />
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          onPress={() => {
            signUp();
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
              Sign Up
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
