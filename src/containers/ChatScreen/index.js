import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Metrix, Colors, Images, Fonts, NavigationService} from '../../config';
import {AuthActions, HomeActions} from '../../store/actions';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {Header} from '../../components';

export const ChatScreen = props => {
  const dispatch = useDispatch();
  const isLoding = useSelector(state => state.Auth.isLoading);
  const isLodingUserData = useSelector(state => state.Home.isLoading);
  const currentUserData = useSelector(state => state.Home.userDetails);
  const allUserData = useSelector(state => state.Home.allUserDetails);
  console.log('CURRENT USER DETAILS: ', currentUserData);
  console.log('NAME: ', props.route.params.username);
  console.log('DP: ', props.route.params);

  const chatterName = props.route.params.username;
  const chatterDP = props.route.params.profileImage;

  useEffect(() => {
    console.log('CHECKING EXISTING USER: ', auth().currentUser);
    dispatch(HomeActions.getUserDetail());
    dispatch(HomeActions.getAllUsers());
  }, []);

  const logout = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <View
      style={{
        height: Metrix.VerticalSize(),
        width: Metrix.HorizontalSize(),
      }}>
      <Header
        leftItem={Images.backIcon}
        leftWidth={Metrix.VerticalSize(20)}
        leftHeight={Metrix.VerticalSize(20)}
        leftPress={() => {
          NavigationService.goBack();
        }}
        // username={currentUserData.username}
      />
      <Text
        style={{
          fontFamily: Fonts['Gilroy-ExtraBold'],
          fontSize: Metrix.FontLarge,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        CHAT with {chatterName}
      </Text>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: Colors.Black,
          backgroundColor: 'blue',
          width: '100%',
        }}
      />
      <Image
        resizeMode={'cover'}
        style={{
          width: Metrix.VerticalSize(60),
          height: Metrix.VerticalSize(60),
          marginTop: Metrix.VerticalSize(20),
          backgroundColor: Colors.White,
          borderRadius: 50,
          alignSelf: 'center',
        }}
        source={{uri: chatterDP}}
      />
      {/* {isLodingUserData ? (
        <View
          style={{
            height: Metrix.VerticalSize(),
            width: Metrix.HorizontalSize(),
            alignSelf: 'center',
            paddingTop: Metrix.VerticalSize(350),
          }}>
          <ActivityIndicator size={'large'} color={Colors.YellowTag} />
        </View>
      ) : (
        <View
          style={{
            height: Metrix.VerticalSize(),
            width: Metrix.HorizontalSize(),
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts['Gilroy-ExtraBold'],
              fontSize: Metrix.FontLarge,
              fontWeight: 'bold',
            }}>
            CHATS
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.Black,
              backgroundColor: 'blue',
              width: '100%',
            }}
          />
          <View style={{width: '100%'}}>
            <FlatList
              data={allUserData}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      // backgroundColor: 'red',
                    }}>
                    <View
                      style={{
                        width: Metrix.HorizontalSize(70),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginLeft: Metrix.HorizontalSize(10),
                        paddingVertical: Metrix.VerticalSize(20),
                        paddingLeft: Metrix.VerticalSize(10),
                        // backgroundColor: 'green',
                      }}>
                      <Image
                        resizeMode={'cover'}
                        style={{
                          width: Metrix.VerticalSize(60),
                          height: Metrix.VerticalSize(60),
                          backgroundColor: Colors.White,
                          borderRadius: 50,
                          alignSelf: 'center',
                          marginLeft: Metrix.HorizontalSize(100),
                        }}
                        source={{uri: item.profileImage}}
                      />
                      <Text
                        style={{
                          width: '100%',
                          // marginLeft: Metrix.HorizontalSize(40),
                          textAlign: 'center',
                          alignSelf: 'center',
                        }}>
                        {item.username}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      )} */}
    </View>
  );
};
