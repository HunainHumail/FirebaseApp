// Imports: Dependencies
import {all, takeEvery, take} from 'redux-saga/effects';

// Imports: Actions
import {AuthActions, HomeActions} from '../actions/';

// Imports: Redux Sagas
import {signUpWithEmailPassword, login, logout} from './AuthSaga';
import {getUserDetails, getAllUsers} from './HomeSaga';
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([
    takeEvery(AuthActions.SIGNUP_WITH_EMAIL_PASSWORD, signUpWithEmailPassword),
    takeEvery(AuthActions.LOGIN, login),
    takeEvery(AuthActions.LOGOUT, logout),
    takeEvery(HomeActions.GET_USER_DETAILS, getUserDetails),
    takeEvery(HomeActions.GET_ALL_USERS, getAllUsers),

    // takeEvery(AuthActions.CHECK_USER, checkUser),

    //sagas will go here
  ]);
}
