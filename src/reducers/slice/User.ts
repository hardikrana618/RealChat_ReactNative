import {PayloadAction} from '@reduxjs/toolkit';
import ActionType from '../actions/ActionType';

interface State {
  userDetails: UserNameProps | null;
}

const initialState: State = {
  userDetails: null,
};

export default function userReducer(
  state: State = initialState,
  action: PayloadAction<any>,
): State {
  switch (action.type) {
    case ActionType.USERDETAILS_REQUEST:
      return {...state, userDetails: action.payload};
    default:
      return state;
  }
}
