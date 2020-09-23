import {combineReducers} from 'redux';

// imports: Reducers
import AuthReducer from './Auth';
import HomeReducer from './Home';

// Redux: Root Reducer
const rootReducer = combineReducers({
  //reducers will go here
  Auth: AuthReducer,
  Home: HomeReducer,
});

// exports
export default rootReducer;
