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
import firestore from '@react-native-firebase/firestore';

export const ChatScreen = props => {
  const dispatch = useDispatch();
  const isLoding = useSelector(state => state.Auth.isLoading);
  const isLodingUserData = useSelector(state => state.Home.isLoading);
  const currentUserData = useSelector(state => state.Home.userDetails);
  const allUserData = useSelector(state => state.Home.allUserDetails);
  // const msgs = useSelector(state => state.Chat.messages);
  // console.log('MESSAGES: ', msgs);

  const [messages, setMessages] = useState([]);

  const chatterName = props.route.params.username;
  const chatterDP = props.route.params.profileImage;
  const channelID = props.route.params.channelId;
  // console.log('CHANNEL ID', channelID);

  const parse = message => {
    console.log('MESSAGE IN PARSE FUNCTION', message);
    // const {createdAt, text, user} = message.data();
    // const {id: _id} = message;

    return message;
  };

  const on = callback => {
    firestore()
      .collection('Messages')
      .doc(channelID)
      .collection('Messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        let data = [];
        console.log('SNAPPPPSHOTTTTT:', snapshot.docs);
        snapshot.docs.map(item => {
          data.push(item._data);
        });
        console.log('DATA IN ON: ', data);
        callback(parse(data));
        // snapshot.docChanges().forEach(change => {
        //   console.log('CHANGEEEEEEE:', change);
        //   if (change.type === 'added') {
        //     console.log('CHANGE DATA', change.doc._data);
        //     callback(parse(change.doc._data));
        //   }
        // });
      });
  };

  // const send = messages => {
  //   for (let i = 0; i < messages.length; i++) {
  //     const {text, user} = messages[i];
  //     const message = {text, user, createdAt: new Date()};
  //     this.append(message);
  //   }
  // };

  // const append = message => Fire.ref.add(message);

  useEffect(() => {
    console.log('USE EFFECT!!: ', auth().currentUser);
    dispatch(HomeActions.getUserDetail());
    dispatch(HomeActions.getAllUsers());
    on(message => {
      console.log('MESSAGE IN USEEFFECT: ', message);
      setMessages(previousState =>
        GiftedChat.append(previousState.messages, message),
      );
    });
    // dispatch(ChatActions.recieveMessages(channelID));
    // setMessages(msgs);
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hey Hunain',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: props.route.params.username,
    //       avatar: props.route.params.profileImage,
    //     },
    //   },
    // ]);
  }, []);

  const handleSend = messages => {
    const writes = messages.map(m => m);
    console.log(writes);
  };

  const onSend = useCallback((messages = []) => {
    // console.log('ONSEND: ', messages);

    // setMessages(
    //   previousMessages => GiftedChat.append(previousMessages, messages),
    //   console.log('PREVIOUS MESSAGES', ...messages),
    // );
    console.log('setMessages: ', messages);
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
          _id: auth().currentUser.uid,
        }}
      />
    </View>
  );
};
