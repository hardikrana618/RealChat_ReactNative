import React from 'react';

export const APIEndPoints = {
  userName: () => `chat/username`,
  chatRooms: () => `chat/rooms`,
  chatRoomId: (room_id: string) => `chat/rooms/${room_id}`,
};

export const SOCKET_DEFAULT_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  RECONNECTING_ATTEMPT: 'reconnection_attempt',
};

export const SOCKET_EVENTS = {
  MESSAGE: 'message',
};
