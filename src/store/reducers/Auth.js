import {AuthActions} from '../actions/';
const INITIAL_STATE = {
  isLoading: false,
};

function Reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AuthActions.SIGNUP_WITH_EMAIL_PASSWORD:
      return {...state, isLoading: true};
    case AuthActions.SIGNUP_WITH_EMAIL_PASSWORD_SUCCESS:
      return {...state, isLoading: false};
    case AuthActions.SIGNUP_WITH_EMAIL_PASSWORD_FAIL:
      return {...state, isLoading: false};

    case AuthActions.LOGIN:
      return {...state, isLoading: true};
    case AuthActions.LOGIN_SUCCESS:
      return {...state, isLoading: false};
    case AuthActions.LOGIN_FAIL:
      return {...state, isLoading: false};
    default:
      return state;
  }
}

export default Reducer;
