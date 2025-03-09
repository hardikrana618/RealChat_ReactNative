import {combineReducers} from 'redux';
import User from './User';
import chatRooms from './ChatRoom';
import ActionType from '../actions/ActionType';

const appReducer = combineReducers({
  user: User,
  chatRooms: chatRooms,
});

const rootReducer = (state, action) => {
  if (action.type === ActionType.LOGOUT) {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
