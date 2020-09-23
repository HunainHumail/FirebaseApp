import {put, call, select} from 'redux-saga/effects';
import {AuthActions} from '../actions';
import {showToast} from '../../config/utills';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import {NavigationService} from '../../config';

const storageReference = storage().ref();
const uploadImage = async (uid, action) => {
  console.log('CHALRA H', uid);
  let profileImageReference = await storageReference.child(`users/${uid}`);
  return new Promise((resolve, reject) => {
    profileImageReference
      .putFile(action.payload.profileImage.uri)
      .then(function(snapshot) {
        profileImageReference
          .getDownloadURL()
          .then(function(url) {
            // console.log('URL *****', url)
            resolve(url);
          })
          .catch(function(error) {
            // Handle any errors
          });
      })
      .catch(e => {
        console.log(e);
      });
  });
};
export function* signUpWithEmailPassword(action) {
  let imageUrl;

  try {
    let res = yield auth().createUserWithEmailAndPassword(
      action.payload.email,
      action.payload.password,
    );
    if (res.additionalUserInfo.isNewUser == true) {
      try {
        imageUrl = yield uploadImage(res.user._user.uid, action);
        console.log('IMAGE URL', imageUrl);
        try {
          yield firestore()
            .collection('Users')
            .doc(res.user._user.uid)
            // .collection('Details')
            // .collection(res.user._user.uid)
            .set({
              username: action.payload.username,
              email: action.payload.email,
              profileImage: imageUrl,
            })
            .then(console.log('DATA ADDED'));
        } catch (e) {
          console.log(e);
        }
        yield put({type: AuthActions.SIGNUP_WITH_EMAIL_PASSWORD_SUCCESS});
        showToast('Account Created', 'success');
        NavigationService.reset_0('LoginScreen');
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    if (e.code === 'auth/email-already-in-use') {
      showToast('That email address is already in use!');
      yield put({type: AuthActions.SIGNUP_WITH_EMAIL_PASSWORD_FAIL});
    }
    if (e.code === 'auth/invalid-email') {
      showToast('That email address is invalid!');
      yield put({type: AuthActions.SIGNUP_WITH_EMAIL_PASSWORD_FAIL});
    }
  }
}

export function* login(action) {
  try {
    let res = yield auth().signInWithEmailAndPassword(
      action.payload.email,
      action.payload.password,
    );
    console.log('RESPONSE', res);
    if (res.user._user.uid) {
      yield put({type: AuthActions.LOGIN_SUCCESS, payload: res.user._user});
      showToast('LOGIN SUCCESS!', 'success');
      NavigationService.reset_0('HomeScreen');
    }
  } catch (e) {
    console.log(e);
    if (e.code === 'auth/invalid-email') {
      showToast('That email address is invalid!');
      yield put({type: AuthActions.LOGIN_FAIL});
    } else if (e.code === 'auth/wrong-password') {
      showToast('That password is invalid!');
      yield put({type: AuthActions.LOGIN_FAIL});
    }
  }
}

export function* logout(action) {
  try {
    let res = yield auth().signOut();
    console.log('RESPONSE', res);
    yield put({type: AuthActions.LOGIN_SUCCESS});
    showToast('LOGGED OUT', 'success');
    NavigationService.reset_0('SplashScreen');
  } catch (e) {
    console.log(e);
    if (e) {
      showToast(e);
      yield put({type: AuthActions.LOGIN_FAIL});
    }
  }
}

// export function* checkUser(action) {
//   try {
//     let res = yield auth().onAuthStateChanged();
//     console.log('RESPONSE', res);
//     if (res) {
//       yield put({type: AuthActions.CHECK_USER_SUCCESS});
//       NavigationService.reset_0('HomeScreen');
//     } else {
//       NavigationService.reset_0('LoginScreen');
//     }
//   } catch (e) {
//     console.log(e);
//     if (e) {
//       showToast(e);
//       yield put({type: AuthActions.CHECK_USER_FAIL});
//     }
//   }
// }
