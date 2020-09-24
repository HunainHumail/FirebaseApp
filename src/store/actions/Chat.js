export default class Action {
  //Constants

  static SEND_MESSAGE = 'SEND_MESSAGE';
  static SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
  static SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';

  //Actions
  static sendMessage(payload) {
    return {
      type: Action.SEND_MESSAGE,
      payload,
    };
  }
}
