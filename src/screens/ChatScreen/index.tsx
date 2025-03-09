import React, {useCallback, useEffect, useState} from 'react';
import {Animated, FlatList, StyleSheet, TextInput} from 'react-native';
import {useFormik} from 'formik';
import moment from 'moment';

import {AppContainerView, AppText, AppButton, AppImage} from '@/components';
import {Colors, getResFont, getResHeight, getResWidth} from '@/theme';
import {goBack, navigateReplace} from '@/navigators/Navigationref';
import {PageName, Variables} from '@/config';
import {VectorIcon} from '@/hooks';
import {getImages} from '@/assets';
import {useAppSelector} from '@/store';
import {
  connectSocketURL,
  SocketProvider,
  useSocket,
} from '@/context/SocketContext';
import {Socket, Manager, io} from 'socket.io-client';
import {chatSchema} from '@/utils';
import {SOCKET_EVENTS} from '@/constants/api.endpoints';

type initialProps = {
  msg: string;
};

interface MessageProp {
  content: string;
  id: number;
  created_at: string;
  room_id: string;
  user_id: number;
  username: string;
}

function Screen(props): React.JSX.Element {
  const {route} = props;

  const roomDetails = route?.params;

  const userDetails = useAppSelector(state => state.user.userDetails);

  const {
    socket,
    connectListener,
    connectSocket,
    connectUser,
    offAllCustomEvents,
    offAllDefaultEvents,
    disconnectSocket,
    disconnectListener,
  } = useSocket();

  // const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageProp[]>([]);

  // useEffect(() => {
  //   // const socket_url = `${Variables.WEBSOCKETURL}${roomDetails.id}/${userDetails.username}`;
  //   const socket_url = 'wss://echo.websocket.in';
  //   const ws = new WebSocket(socket_url);
  //   ws.onopen = () => {
  //     console.log('Connected to WebSocket');
  //   };

  //   ws.onmessage = event => {
  //     console.log('Message received:', event);
  //     const data = JSON.parse(event.data);
  //     setMessages(prev => [...prev, data]);
  //   };

  //   ws.onerror = error => {
  //     console.error('WebSocket error:', error);
  //   };

  //   ws.onclose = () => {
  //     console.log('WebSocket disconnected');
  //   };

  //   setWSocket(ws);

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  useEffect(() => {
    disconnectListener(() => {
      console.log('disconnectListener');
    });
    connectListener(() => {
      connectUser()
        .then(() => {
          socket?.on(SOCKET_EVENTS.MESSAGE, response => {
            console.log('socket response', response);
          });
        })
        .catch(() => {});
    });
    connectSocket();
    return () => {
      offAllDefaultEvents();
      offAllCustomEvents();
      disconnectSocket();
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      msg: '',
    },
    validationSchema: chatSchema,
    onSubmit: (values, {resetForm}) => {
      try {
        console.log('verify socket 00', socket);
        if (socket && socket.connected) {
          console.log('verify socket 01');
          socket.emit(
            'message',
            {
              content: values.msg,
            },
            response => {
              console.log('Socket emit response', response);
            },
          );
          resetForm();
        }
      } catch (e) {
        console.log('send message error error', e);
      }
    },
  });
  const onChangeText = txt => {
    formik.setFieldValue('msg', txt);
  };

  const _itemRender = useCallback(fdata => {
    const item: MessageProp = fdata.item;
    const index: number = fdata.index;
    // let isMe = item?.user_id == userDetails?.id;
    let isMe = index % 2 === 0;
    return (
      <AppContainerView style={[style.itemStyle]}>
        <AppContainerView
          style={[
            style.itemContent,
            isMe && {
              flexDirection: 'row-reverse',
            },
          ]}>
          <AppContainerView style={[style.profileContainer]}>
            <AppImage
              source={getImages().ProfileAvatar}
              style={[style.profileImg]}
            />
          </AppContainerView>

          <AppContainerView
            style={[style.txtContainer, isMe && style.txtContainerMe]}>
            <AppContainerView style={[style.txtView, isMe && style.txtViewMe]}>
              <AppText
                fontSize={getResFont(14)}
                fontWeight={400}
                lineHeight={getResFont(15)}
                style={[style.txt]}>
                {item?.content}
              </AppText>
            </AppContainerView>
            <AppText
              fontSize={getResFont(12)}
              fontWeight={400}
              lineHeight={getResFont(14)}
              color={Colors.dimgray}
              style={[style.timeTxt]}
              children={`${item?.username} • ${moment(item?.created_at).format(
                'hh:mm A',
              )}`}
            />
          </AppContainerView>
        </AppContainerView>
      </AppContainerView>
    );
  }, []);

  const _itemSeparatorComponent = useCallback(() => {
    return <AppContainerView style={[style.separatorView]} />;
  }, []);

  return (
    // <SocketProvider roomID={roomDetails.id} username={userDetails.username}>
    <AppContainerView style={[style.containerView]}>
      <AppContainerView safeAreaType={'top'} style={[style.headerStyle]}>
        <AppButton
          title={roomDetails.name ? roomDetails.name : 'Chat Room'}
          iconDirection="left"
          titleColor={Colors.black}
          titleSize={getResFont(16)}
          titleWeight={800}
          backgroundColor={Colors.transparent}
          svgIcon={
            <VectorIcon
              type="FontAwesome6"
              name="arrow-left"
              color={Colors.black}
              size={getResFont(20)}
            />
          }
          style={[style.backBtn]}
          titleStyle={[style.headerTitle]}
          onPress={() => goBack()}
        />
      </AppContainerView>
      <AppContainerView style={[style.mainView]}>
        <FlatList
          inverted
          style={{
            flex: 1,
            width: '100%',
          }}
          data={messages}
          renderItem={_itemRender}
          ItemSeparatorComponent={_itemSeparatorComponent}
          contentContainerStyle={style.contentContainerStyle}
        />
        <AppContainerView
          safeAreaType={'bottom'}
          style={[style.bottomContainer]}>
          <TextInput
            value={formik.values.msg}
            selectionColor={Colors.primary}
            placeholder="Type a message..."
            style={[style.txtInput]}
            onChangeText={onChangeText}
            collapsable={false}
            autoCapitalize="none"
          />
          <AppButton
            title="Send"
            style={[style.sendBtn]}
            disabled={!(formik.dirty && formik.errors)}
            // showIndiator={true}
            onPress={formik.handleSubmit}
          />
        </AppContainerView>
      </AppContainerView>
    </AppContainerView>
    // </SocketProvider>
  );
}

const style = StyleSheet.create({
  containerView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
  headerStyle: {
    height: getResHeight(40),
    paddingHorizontal: '3%',
    flexDirection: 'row',
    backgroundColor: Colors.accent,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    elevation: 3,
  },
  backBtn: {
    width: 'auto',
    height: 'auto',
    paddingHorizontal: '2%',
  },
  headerTitle: {
    color: Colors.text,
    marginLeft: getResWidth(7),
  },
  mainView: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: getResHeight(18),
  },
  txt1: {
    color: Colors.text,
    width: '50%',
  },
  contentContainerStyle: {
    paddingVertical: '3%',
  },
  itemStyle: {
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingVertical: getResHeight(10),
  },
  itemContent: {
    width: '95%',
    flexDirection: 'row',
  },
  separatorView: {
    width: '100%',
    height: getResHeight(25),
  },
  profileContainer: {
    width: '12%',
    alignItems: 'center',
    paddingTop: getResHeight(5),
  },
  profileImg: {
    width: getResWidth(40),
    height: getResWidth(40),
  },
  txtContainer: {
    maxWidth: '83%',
    // minWidth: '30%',
    marginLeft: getResWidth(12),
  },
  txtContainerMe: {
    marginRight: getResWidth(12),
  },
  txtView: {
    // minWidth: '25%',
    borderRadius: getResWidth(24),
    justifyContent: 'center',
    backgroundColor: Colors.lightGrayish,
    paddingHorizontal: getResWidth(12),
    paddingVertical: getResWidth(12),
  },
  txtViewMe: {
    backgroundColor: Colors.accent,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  txt: {
    textAlignVertical: 'center',
  },
  timeTxt: {
    marginTop: getResHeight(8),
    marginLeft: getResWidth(2),
  },
  bottomContainer: {
    width: '100%',
    marginTop: getResWidth(10),
    paddingVertical: getResWidth(10),
    paddingHorizontal: getResWidth(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.accent,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
    elevation: 5,
  },
  txtInput: {
    width: '73%',
    height: getResHeight(40),
    paddingHorizontal: getResWidth(15),
    borderRadius: 50,
    backgroundColor: Colors.accent,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 5,
  },
  sendBtn: {
    width: '22%',
    height: getResHeight(40),
  },
});

export default Screen;
