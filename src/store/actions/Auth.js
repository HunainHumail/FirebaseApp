export default class Action {
  //Constants
  static SIGNUP_WITH_EMAIL_PASSWORD = 'SIGNUP_WITH_EMAIL_PASSWORD';
  static SIGNUP_WITH_EMAIL_PASSWORD_SUCCESS =
    'SIGNUP_WITH_EMAIL_PASSWORD_SUCCESS';
  static SIGNUP_WITH_EMAIL_PASSWORD_FAIL = 'SIGNUP_WITH_EMAIL_PASSWORD_FAIL';

  static LOGIN = 'LOGIN';
  static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static LOGIN_FAIL = 'LOGIN_FAIL';

  static LOGOUT = 'LOGOUT';
  static LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
  static LOGOUT_FAIL = 'LOGOUT_FAIL';

  static CHECK_USER = 'CHECK_USER';
  static CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS';
  static CHECK_USER_FAIL = 'CHECK_USER_FAIL';

  //Actions
  static signUpWithEmailPassword(payload) {
    return {
      type: Action.SIGNUP_WITH_EMAIL_PASSWORD,
      payload,
    };
  }

  static login(payload) {
    return {
      type: Action.LOGIN,
      payload,
    };
  }

  static logout() {
    return {
      type: Action.LOGOUT,
    };
  }

  static checkUser() {
    return {
      type: Action.CHECK_USER,
    };
  }
}
