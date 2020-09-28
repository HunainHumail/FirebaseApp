import {put, call, select, all} from 'redux-saga/effects';
import {HomeActions, ChatActions} from '../actions';
import {showToast} from '../../config/utills';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const sendingMessage = (channelId, messages) => {
  let currentUserId = auth().currentUser.uid;
  console.log('CHANNEL ID: ', messages);
  for (let i = 0; i < messages.length; i++) {
    const {text, user, createdAt, _id} = messages[i];
    const messageData = {
      text,
      user: {_id: currentUserId},
      createdAt,
      _id,
    };
    // console.log('CHANNEL ID: ', channelId);
    console.log('MESSAGE DATA', messageData);
    // this.append(message);
    try {
      firestore()
        .collection('Messages')
        .doc(channelId)
        .set({
          key: channelId,
        })
        .then(() => {
          firestore()
            .collection('Messages')
            .doc(channelId)
            .collection('Messages')
            .add(messageData)
            .then(r => {
              console.log('CHANNEL CREATED', r);
            });
        });
    } catch (e) {
      console.log(e);
    }
  }
};

const recievingMessage = async channelId => {
  // let currentUserId = auth().currentUser.uid;
  let msgData = [];
  console.log('CHANNEL ID: ', channelId);
  try {
    await new Promise(res => {
      firestore()
        .collection('Messages')
        .doc(channelId)
        .collection('Messages')
        .onSnapshot(querySnapshot => {
          console.log('SNAPSHOTTTTT: ', querySnapshot);
          querySnapshot.forEach(data => {
            msgData.push(data);
          });

          res(msgData);
        });
    });
  } catch (e) {
    console.log(e);
  }
  console.log('MESSAGE DATA: ', msgData);
  return msgData;
};

// const recievingMessageID = async () => {
//     // let currentUserId = auth().currentUser.uid;
//     let msgId = [];
//     console.log('CHANNEL ID: ', channelId);
//     try {
//       await new Promise(res => {
//         firestore()
//           .collection('Messages')
//           .doc(channelId)
//           .collection('Messages')
//           .onSnapshot(querySnapshot => {
//             console.log('SNAPSHOTTTTT: ', querySnapshot);
//             querySnapshot.forEach(data => {
//                 msgId.push(data);
//             });

//             res(msgId);
//           });
//       });
//     } catch (e) {
//       console.log(e);
//     }
//     console.log('MESSAGE DATA: ', msgId);
//     return msgId;
//   };

export function* sendMessage(action) {
  console.log('ACTION.PAYLOAD.CHANNELID: ', action.payload.channelID);
  console.log('ACTION.PAYLOAD.MESSAGE: ', action.payload.messages);

  try {
    let res = yield sendingMessage(
      action.payload.channelID,
      action.payload.messages,
    );

    if (res) {
      yield put({
        type: ChatActions.SEND_MESSAGE_SUCCESS,
        payload: res,
      });
    } else {
      yield put({type: ChatActions.SEND_MESSAGE_FAIL});
    }
  } catch (e) {
    console.log(e);
    if (e) {
      console.log('ERRORRRR', e);

      yield put({type: ChatActions.SEND_MESSAGE_FAIL});
    }
  }
}

export function* recieveMessage(action) {
  try {
    let res = yield recievingMessage(action.payload);
    // let resID = yield recievingMessageID();

    // console.log('RECIEVE MESSAGE RESPONSE: ', resID);

    console.log('RECIEVE MESSAGE RESPONSE: ', res);
    if (res) {
      yield put({
        type: ChatActions.RECIEVE_MESSAGES_SUCCESS,
        payload: res,
      });
    } else {
      yield put({type: ChatActions.RECIEVE_MESSAGES_FAIL});
    }
  } catch (e) {
    console.log(e);
    if (e) {
      console.log('ERRORRRR', e);

      yield put({type: ChatActions.RECIEVE_MESSAGES_FAIL});
    }
  }
}
