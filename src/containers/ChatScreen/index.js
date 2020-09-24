import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Metrix, Colors, Images, Fonts, NavigationService} from '../../config';
import {AuthActions, HomeActions, ChatActions} from '../../store/actions';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {Header} from '../../components';
import {GiftedChat} from 'react-native-gifted-chat';

export const ChatScreen = props => {
  const dispatch = useDispatch();
  const isLoding = useSelector(state => state.Auth.isLoading);
  const isLodingUserData = useSelector(state => state.Home.isLoading);
  const currentUserData = useSelector(state => state.Home.userDetails);
  const allUserData = useSelector(state => state.Home.allUserDetails);
  const [messages, setMessages] = useState([]);

  const chatterName = props.route.params.username;
  const chatterDP = props.route.params.profileImage;
  const channelID = props.route.params.channelId;
  console.log('CHANNEL ID', channelID);

  useEffect(() => {
    console.log('CHECKING EXISTING USER: ', auth().currentUser);
    dispatch(HomeActions.getUserDetail());
    dispatch(HomeActions.getAllUsers());
    setMessages([
      {
        _id: 1,
        text: 'Hey Hunain',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: props.route.params.username,
          avatar: props.route.params.profileImage,
        },
      },
    ]);
  }, []);

  const handleSend = messages => {
    const writes = messages.map(m => m);
    console.log(writes);
  };

  const onSend = useCallback((messages = []) => {
    setMessages(
      previousMessages => GiftedChat.append(previousMessages, messages),
      console.log('PREVIOUS MESSAGES', ...messages),
    );
    console.log('setMessages: ', messages);
    console.log('ONSEND: ', messages);
    dispatch(
      ChatActions.sendMessage({channelID: channelID, messages: messages}),
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header
        leftItem={Images.backIcon}
        View
        leftWidth={Metrix.VerticalSize(20)}
        leftHeight={Metrix.VerticalSize(20)}
        leftPress={() => {
          NavigationService.goBack();
        }}
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
      <GiftedChat
        messages={messages}
        renderUsernameOnMessage={true}
        onSend={messages => onSend(messages)}
        // onSend={messages => {
        //   handleSend(messages);
        // }}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};
