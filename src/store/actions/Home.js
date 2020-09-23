export default class Action {
  //Constants

  static GET_USER_DETAILS = 'GET_USER_DETAILS';
  static GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
  static GET_USER_DETAILS_FAIL = 'GET_USER_DETAILS_FAIL';

  static GET_ALL_USERS = 'GET_ALL_USERS';
  static GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
  static GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';

  //Actions
  static getUserDetail(payload) {
    return {
      type: Action.GET_USER_DETAILS,
      payload,
    };
  }

  static getAllUsers(payload) {
    return {
      type: Action.GET_ALL_USERS,
      payload,
    };
  }
}
