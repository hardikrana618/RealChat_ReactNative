import {Variables} from '@/config';
import {SOCKET_DEFAULT_EVENTS, SOCKET_EVENTS} from '@/constants/api.endpoints';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import io, {Socket} from 'socket.io-client';

// Define the context shape
interface SocketContextType {
  socket: Socket | null;
  isUserConnected: boolean;
  disconnectSocket: () => void;
  connectSocket: () => void;
  setIsUserConnected: (bool: boolean) => void;
  connectUser: () => Promise<boolean>;
  connectListener: (callback?: () => void) => void;
  reconnectListener: (callback?: () => void) => void;
  disconnectListener: (callback?: () => void) => void;
  offAllCustomEvents: () => void;
  offAllDefaultEvents: () => void;
}

// Create the context
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isUserConnected: false,
  connectSocket: () => {},
  disconnectSocket: () => {},
  setIsUserConnected: () => {},
  connectUser: () => new Promise((resolve, _) => resolve(false)),
  connectListener: () => {},
  disconnectListener: () => {},
  offAllCustomEvents: () => {},
  offAllDefaultEvents: () => {},
  reconnectListener: () => {},
});

// Custom hook to access the context
export const useSocket = () => useContext(SocketContext);

// Socket props interface
interface SocketProviderProps {
  children: React.JSX.Element | React.JSX.Element[];
}
// socket instance with some optional parameter which may change depend upon app requirements
const socket = io(
  'ws://chat-api-k4vi.onrender.com/ws/27c06f38-acf3-4ed3-9dc1-4a3fb9c452a7/hr_123',
  {
    autoConnect: false,
    reconnection: true,
  },
);
// export const connectSocketURL = (roomID: string, username: string): Socket => {
//   // const socketURL = `${Variables.WEBSOCKETURL}${roomID}/${username}`;
//   const socketURL = 'wss://echo.websocket.in';
//   const socket = io(socketURL, {
//     autoConnect: true,
//     reconnectionAttempts: 2,
//     timeout: 500,
//   });
//   socket.on('connect', () => {
//     console.log('Connected to Socket server!');
//   });
//   socket.on('error', e => {
//     console.log('Connected to Socket server! Error:', e);
//   });

//   socket.on('disconnect', () => {
//     console.log('Disconnected from WebSocket server!');
//   });
//   return socket;
// };

// Component to provide the socket context
export const SocketProvider = (props: SocketProviderProps) => {
  const {children} = props;

  // connection flag which indicated whether user is connected with specific room or not.
  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);

  // make connection request to socket server
  const connectSocket = () => {
    console.log('connectSocket called');
    socket?.connect();
  };

  /**
   * The `connectListener` function sets up a listener for a socket connection event and executes a
   * callback function when the connection is established.
   */
  const connectListener = (callback?: () => void) => {
    socket.on(SOCKET_DEFAULT_EVENTS.CONNECT, () => {
      console.log('Connect');
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  /**
   * The `reconnectListener` function sets up a listener for a socket go for reconnection event and executes a
   * callback function when the reconnection is triggered.
   */
  const reconnectListener = (callback?: () => void) => {
    socket.on(SOCKET_DEFAULT_EVENTS.RECONNECTING_ATTEMPT, () => {
      console.log('Reconnect');
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  /**
   * The `disconnectListener` function sets up a listener for a socket disconnection event and executes a
   * callback function when the disconnection is established.
   */
  const disconnectListener = (callback?: () => void) => {
    socket.on(SOCKET_DEFAULT_EVENTS.DISCONNECT, () => {
      console.log('Disconnect');
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  /**
   * The function `disconnectSocket` disconnects the current socket if it exists.
   */
  const disconnectSocket = () => {
    console.log('disconnectSocket called');
    socket?.disconnect();
  };

  /**
   * The function `connectSocket` disconnects the current socket if it exists.
   */
  const connectUser = (message: string): Promise<boolean> => {
    return new Promise((resolve, _) => {
      socket?.emit(
        SOCKET_EVENTS.MESSAGE,
        {
          event: 'message',
          content: message,
        },
        (response: unknown) => {
          setIsUserConnected(true);
          console.log('connectUser :- ', JSON.stringify(response));
          resolve(true);
        },
      );
    });
  };

  /**
   * The function `offAllCustomEvents` iterates through all values of `SOCKET_EVENTS` and removes event
   * listeners for each value from the `socket` object.
   */
  const offAllCustomEvents = () => {
    Object.values(SOCKET_EVENTS).forEach(key => socket?.off(key));
  };

  /**
   * The function `offAllDefaultEvents` iterates over all default events in `SOCKET_DEFAULT_EVENTS` and
   * removes event listeners for each event from the `socket` object.
   */
  const offAllDefaultEvents = () => {
    Object.values(SOCKET_DEFAULT_EVENTS).forEach(key => socket?.off(key));
  };

  /* The `useEffect` hook in the code snippet is setting up event listeners for socket connection,
    disconnection, and reconnection when the component mounts. It also returns a cleanup function that
    removes all event listeners when the component unmounts. */
  useEffect(() => {
    connectListener();
    disconnectListener();
    reconnectListener();
    return () => {
      offAllDefaultEvents();
      offAllCustomEvents();
    };
  }, []);

  const values = useMemo(() => {
    return {
      isUserConnected,
      socket,
      disconnectSocket,
      connectSocket,
      setIsUserConnected,
      connectUser,
      connectListener,
      disconnectListener,
      offAllCustomEvents,
      offAllDefaultEvents,
      reconnectListener,
    };
  }, [
    isUserConnected,
    socket,
    disconnectSocket,
    connectSocket,
    setIsUserConnected,
    connectUser,
    connectListener,
    disconnectListener,
    offAllCustomEvents,
    offAllDefaultEvents,
    reconnectListener,
  ]);

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};
