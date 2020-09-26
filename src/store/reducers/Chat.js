import {ChatActions} from '../actions/';
import auth from '@react-native-firebase/auth';

const INITIAL_STATE = {
  isLoading: true,
  messages: [],
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ChatActions.SEND_MESSAGE:
      return {...state, isLoading: true};
    case ChatActions.SEND_MESSAGE_SUCCESS:
      return {...state, isLoading: false};
    case ChatActions.SEND_MESSAGE_FAIL:
      return {...state, isLoading: false};

    case ChatActions.RECIEVE_MESSAGES:
      return {...state, isLoading: true};
    case ChatActions.RECIEVE_MESSAGES_SUCCESS:
      console.log('ACTION.PAYLOAD: ', action.payload);
      let data = [];
      let ids = [];
      action.payload.map(item => {
        data.push(item._data);
      });
      // action.payload.map(item => {
      //   ids.push({_id: item.id});
      // });
      //   ...data.push()
      console.log('data', data);
      return {...state, isLoading: false, messages: data};
    case ChatActions.RECIEVE_MESSAGES_FAIL:
      return {...state, isLoading: false};

    default:
      return state;
  }
}

export default Reducer;
