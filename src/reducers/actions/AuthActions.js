import ActionType from './ActionType';

export const UserDetailsAction = data => ({
  type: ActionType.USERDETAILS_REQUEST,
  payload: data,
});
