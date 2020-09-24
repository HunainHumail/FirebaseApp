import {HomeActions} from '../actions/';
import auth from '@react-native-firebase/auth';

const INITIAL_STATE = {
  isLoading: true,
  userDetails: {},
  allUserDetails: {},
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HomeActions.GET_USER_DETAILS:
      return {...state, isLoading: true};
    case HomeActions.GET_USER_DETAILS_SUCCESS:
      return {...state, isLoading: false, userDetails: action.payload};
    case HomeActions.GET_USER_DETAILS_FAIL:
      return {...state, isLoading: false};

    case HomeActions.GET_ALL_USERS:
      return {...state, isLoading: true};
    case HomeActions.GET_ALL_USERS_SUCCESS:
      let arr = [];
      action.payload.forEach(element => {
        if (element.email != auth().currentUser._user.email) {
          arr.push(element);
        }
      });
      return {...state, isLoading: false, allUserDetails: arr};
    case HomeActions.GET_ALL_USERS_FAIL:
      return {...state, isLoading: false};
    default:
      return state;
  }
}

export default Reducer;
