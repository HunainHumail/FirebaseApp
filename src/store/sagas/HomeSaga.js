import {put, call, select, all} from 'redux-saga/effects';
import {HomeActions} from '../actions';
import {showToast} from '../../config/utills';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const getDetails = async () => {
  let userData = await firestore()
    .collection('Users')
    .doc(auth().currentUser._user.uid)
    .get();
  return userData;
};

const getAllUserDetails = async () => {
  const data = [];
  await new Promise(res => {
    firestore()
      .collection('Users')
      .onSnapshot(
        querySnapshot => {
          querySnapshot.forEach(doc => {
            const {username, email, profileImage} = doc.data();
            data.push({
              username,
              email,
              profileImage,
            });
          });

          res(data);
        },
        e => console.log(e),
      );
  });
  return data;
};

export function* getUserDetails(action) {
  try {
    let res = yield getDetails();
    if (res._data) {
      yield put({
        type: HomeActions.GET_USER_DETAILS_SUCCESS,
        payload: res._data,
      });
    } else {
      yield put({type: HomeActions.GET_USER_DETAILS_FAIL});
    }
  } catch (e) {
    console.log(e);
    if (e) {
      console.log('ERRORRRR', e);

      yield put({type: HomeActions.GET_USER_DETAILS_FAIL});
    }
  }
}

export function* getAllUsers(action) {
  try {
    let res = yield getAllUserDetails();
    console.log('RESPONSE', res);
    if (res) {
      yield put({
        type: HomeActions.GET_ALL_USERS_SUCCESS,
        payload: res,
      });
    } else {
      yield put({type: HomeActions.GET_ALL_USERS_FAIL});
    }
  } catch (e) {
    console.log(e);
    if (e) {
      console.log('ERRORRRR', e);
      yield put({type: HomeActions.GET_ALL_USERS_FAIL});
    }
  }
}
