export default class Action {
  //Constants

  static SEND_MESSAGE = 'SEND_MESSAGE';
  static SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
  static SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';

  static RECIEVE_MESSAGES = 'RECIEVE_MESSAGES';
  static RECIEVE_MESSAGES_SUCCESS = 'RECIEVE_MESSAGES_SUCCESS';
  static RECIEVE_MESSAGES_FAIL = 'RECIEVE_MESSAGES_FAIL';

  //Actions
  static sendMessage(payload) {
    return {
      type: Action.SEND_MESSAGE,
      payload,
    };
  }

  static recieveMessages(payload) {
    console.log('CHAT ACTION!!!', payload);
    return {
      type: Action.RECIEVE_MESSAGES,
      payload,
    };
  }
}
