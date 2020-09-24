import {put, call, select, all} from 'redux-saga/effects';
import {HomeActions, ChatActions} from '../actions';
import {showToast} from '../../config/utills';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const sendingMessage = (channelId, message) => {
  let currentUserId = auth().currentUser.uid;
  try {
    firestore()
      .collection('Messages')
      .doc(channelId)
      .set({
        message,
      })
      .then(console.log('CHANNEL CREATED'));
  } catch (e) {
    console.log(e);
  }
};

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
