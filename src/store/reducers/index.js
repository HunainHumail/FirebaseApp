import {combineReducers} from 'redux';

// imports: Reducers
import AuthReducer from './Auth';
import HomeReducer from './Home';
import ChatReducer from './Chat';

// Redux: Root Reducer
const rootReducer = combineReducers({
  //reducers will go here
  Auth: AuthReducer,
  Home: HomeReducer,
  Chat: ChatReducer,
});

// exports
export default rootReducer;
