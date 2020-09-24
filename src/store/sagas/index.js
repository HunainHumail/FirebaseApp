// Imports: Dependencies
import {all, takeEvery, take} from 'redux-saga/effects';

// Imports: Actions
import {AuthActions, HomeActions, ChatActions} from '../actions/';

// Imports: Redux Sagas
import {signUpWithEmailPassword, login, logout} from './AuthSaga';
import {getUserDetails, getAllUsers} from './HomeSaga';
import {sendMessage} from './ChatSaga';

// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    takeEvery(AuthActions.SIGNUP_WITH_EMAIL_PASSWORD, signUpWithEmailPassword),
    takeEvery(AuthActions.LOGIN, login),
    takeEvery(AuthActions.LOGOUT, logout),
    takeEvery(HomeActions.GET_USER_DETAILS, getUserDetails),
    takeEvery(HomeActions.GET_ALL_USERS, getAllUsers),
    takeEvery(ChatActions.SEND_MESSAGE, sendMessage),

    // takeEvery(AuthActions.CHECK_USER, checkUser),

    //sagas will go here
  ]);
}
