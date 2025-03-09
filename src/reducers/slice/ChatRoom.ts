import {PayloadAction} from '@reduxjs/toolkit';
import ActionType from '../actions/ActionType';

interface State {
  chatRoomsData: ChatRoomsDataProps[];
}

const initialState: State = {
  chatRoomsData: [],
};

export default function userReducer(
  state: State = initialState,
  action: PayloadAction<any>,
): State {
  switch (action.type) {
    case ActionType.CHATROOMS_REQUEST:
      return {...state, chatRoomsData: action.payload};
    default:
      return state;
  }
}
