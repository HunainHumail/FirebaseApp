import {ChatActions} from '../actions/';
import auth from '@react-native-firebase/auth';

const INITIAL_STATE = {
  isLoading: true,
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ChatActions.SEND_MESSAGE:
      return {...state, isLoading: true};
    case ChatActions.SEND_MESSAGE_SUCCESS:
      return {...state, isLoading: false};
    case ChatActions.SEND_MESSAGE_FAIL:
      return {...state, isLoading: false};

    default:
      return state;
  }
}

export default Reducer;
