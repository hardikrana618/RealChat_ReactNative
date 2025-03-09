import ActionType from './ActionType';

export const ChatRoomsAction = data => ({
  type: ActionType.CHATROOMS_REQUEST,
  payload: data,
});
