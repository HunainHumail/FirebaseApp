import {put, call, select, all} from 'redux-saga/effects';
import {HomeActions} from '../actions';
import {showToast} from '../../config/utills';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const getDetails = async () => {
  let userData = await firestore()
    .collection('Users')
    .doc(auth().currentUser._user.uid)
    .get();
  return userData;
};
const getAllUserDetails = () =>
  // const data = [];
  // return new Promise(res => {
  //   firestore()
  //     .collection('Users')
  //     .onSnapshot(
  //       querySnapshot => {
  //         querySnapshot.forEach(async doc => {
  //           const {username, email, profileImage} = doc.data();
  //           let currentUserID = firebase.auth().currentUser.uid;
  //           let otherUserID = doc.id;
  //           const getChannelId = () =>
  //             new Promise((resolve, reject) => {
  //               let channelID;
  //               firestore()
  //                 .collection('Messages')
  //                 .get()
  //                 .then(documents => {
  //                   documents.forEach(document => {
  //                     // console.log(document, 'sadusahfdufhudsfjshfjdsjdsjdfs');
  //                     let id = document.id;
  //                     let splittedId = id.split('_');
  //                     console.log(splittedId.indexOf(currentUserID) != -1);
  //                     if (splittedId.indexOf(currentUserID) != -1) {
  //                       channelID = id;
  //                     } else {
  //                       channelID = currentUserID + '_' + otherUserID;
  //                     }
  //                   });
  //                   if (!channelID) {
  //                     channelID = currentUserID + '_' + otherUserID;
  //                   }

  //                   resolve(channelID);
  //                 });
  //             });
  //           getChannelId().then(channelID => {
  //             data.push({
  //               username,
  //               email,
  //               profileImage,
  //               id: doc.id,
  //               channelID,
  //             });
  //             console.log(data);
  //           });
  //         });
  //         console.log(data);
  //         res(data);
  //         // if (!channelID) {
  //         //   channelID = currentUserID + '_' + otherUserID;
  //         // }
  //       },
  //       e => console.log(e),
  //     );
  // });
  new Promise(async (resolve, rejcet) => {
    const data = [];
    const users = await firestore()
      .collection('Users')
      .get();
    const messages = await firestore()
      .collection('Messages')
      .get();
    users.forEach(user => {
      const {username, email, profileImage} = user.data();
      let currentUserID = firebase.auth().currentUser.uid;
      let otherUserID = user.id;
      let channelID = '';
      messages.forEach(message => {
        let id = message.id;
        let splittedId = id.split('_');
        if (
          splittedId.indexOf(currentUserID) != -1 &&
          splittedId.indexOf(otherUserID) != -1
        ) {
          channelID = id;
        } else {
          channelID = currentUserID + '_' + otherUserID;
        }
      });
      if (!channelID) {
        channelID = currentUserID + '_' + otherUserID;
      }
      data.push({
        username,
        email,
        profileImage,
        id: user.id,
        channelID,
      });
    });
    resolve(data);
    // firestore()
    //   .collection('Users')
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       const {username, email, profileImage} = doc.data();
    //       let currentUserID = firebase.auth().currentUser.uid;
    //       let otherUserID = doc.id;
    //       let channelId = '';
    //       // firestore()
    //       //   .collection('Messages')
    //       //   .get()
    //       //   .then(messages => {
    //       //     messages.forEach(message => {
    //       //       let id = message.id;
    //       //       let splittedId = id.split('_');
    //       //       if (splittedId.indexOf(currentUserID) != -1) {
    //       //         channelID = id;
    //       //       } else {
    //       //         channelID = currentUserID + '_' + otherUserID;
    //       //       }
    //       //     });
    //       //   });
    //       data.push({
    //         username,
    //         email,
    //         profileImage,
    //         id: doc.id,
    //         // channelID,
    //       });
    //     });
    //     resolve(data);
    //   });
  });

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
