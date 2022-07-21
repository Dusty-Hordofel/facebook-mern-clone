import { combineReducers } from 'redux';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
}); //combineReducers is used to create many instances of reducers

export default rootReducer;
