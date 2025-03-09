const AuthActions = {
  LOGOUT: 'LOGOUT',
  USERDETAILS_REQUEST: 'USERDETAILS_REQUEST',
};

const ChatRoomActions = {
  CHATROOMS_REQUEST: 'CHATROOMS_REQUEST',
};

export default {
  ...AuthActions,
  ...ChatRoomActions,
};
