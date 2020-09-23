import {put, call, select, all} from 'redux-saga/effects';
import {HomeActions} from '../actions';
import {showToast} from '../../config/utills';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import {NavigationService} from '../../config';

const getDetails = async () => {
  let userData = await firestore()
    .collection('Users')
    .doc(auth().currentUser._user.uid)
    .get();
  return userData;
};

const getAllUserDetails = async () => {
  const data = [];
  // console.log('CHALRA H', auth().currentUser._user.uid);
  // let allUserData =

  // console.log('THE DATAAAAAAAAAA: ', data);
  await new Promise(res => {
    firestore()
      .collection('Users')
      .onSnapshot(
        querySnapshot => {
          // console.log('Snapshottt', a);
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

  // .doc('AVt4R5BFSTQGldGEWbEB1wtlXWy2')
  // .collection('Details')
  // .doc('Users')
  // .collection()
  // .get()
  // .then(snap => {
  //   snap.forEach(doc => {
  //     console.log('THE DAAAAAAAATTAAAAAAAAAAAAA', doc.data());
  //   });
  // })
  // .catch(e => {
  //   console.log(e);
  // });
  // return new Promise((resolve, reject) => {
  //   allUserData
  //     .then(collection => {
  //       console.log('Collection data:', collection); // Getting value from firebase
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // });
  // console.log('AAAAAAAAAAAAALLLLLLLLLLLLLLLLLLL', allUserData);
  // return allUserData.docs.map(doc => doc.data());
};

export function* getUserDetails(action) {
  try {
    let res = yield getDetails();
    // console.log('GET MYSELF', res);
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
      //   showToast('That email address is invalid!');
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
