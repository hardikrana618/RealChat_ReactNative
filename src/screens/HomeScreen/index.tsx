import React, {useCallback, useEffect, useState} from 'react';
import {Animated, FlatList, StyleSheet, TextInput} from 'react-native';
import {useFormik} from 'formik';

import {AppContainerView, AppText, AppButton} from '@/components';
import {Colors, getResFont, getResHeight, getResWidth} from '@/theme';
import {navigate, navigateReplace} from '@/navigators/Navigationref';
import {PageName} from '@/config';
import {VectorIcon} from '@/hooks';
import {useAppDispatch, useAppSelector} from '@/store';
import {getChatRoomsAPI} from '@/services/Apis/ChatRooms';
import CreateRoomModal from './CreateRoomModal';

function Screen(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const userDetails = useAppSelector(state => state.user.userDetails);
  const chatRoomsData = useAppSelector(state => state.chatRooms.chatRoomsData);

  const [visableModal, setVisableModal] = useState<boolean>(false);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    await dispatch(getChatRoomsAPI());
  };

  const onPress = () => {
    setVisableModal(true);
    // navigate(PageName.ChatScreen);
  };
  const joinOnPress = item => {
    navigate(PageName.ChatScreen, {id: item.id, name: item.name});
  };

  const _itemRender = useCallback(({item, index}) => {
    return (
      <AppContainerView style={[style.itemStyle]}>
        <AppContainerView style={[style.itemContainer]}>
          <AppText
            fontWeight={700}
            fontSize={17}
            lineHeight={22}
            style={[style.nameTxt]}>
            {item?.name}
          </AppText>
          <AppButton
            title="JOIN"
            style={[style.joinBtn]}
            onPress={() => joinOnPress(item)}
          />
        </AppContainerView>
      </AppContainerView>
    );
  }, []);

  const _itemSeparatorComponent = useCallback(() => {
    return <AppContainerView style={[style.separatorView]} />;
  }, []);

  return (
    <>
      <CreateRoomModal
        visible={visableModal}
        onDismiss={() => {
          setVisableModal(false);
        }}
      />
      <AppContainerView style={[style.containerView]}>
        <AppContainerView safeAreaType={'top'} style={[style.headerStyle]}>
          <VectorIcon
            type="MaterialCommunityIcons"
            name="chat-processing-outline"
            color={Colors.primary}
            size={getResFont(25)}
          />
          <AppText
            fontSize={getResFont(18)}
            fontWeight={800}
            letterSpacing={0.4}
            style={[style.headerTitle]}>
            RealChat
          </AppText>
        </AppContainerView>
        <AppContainerView style={[style.mainView]}>
          <AppText
            fontSize={getResFont(22)}
            fontWeight={800}
            letterSpacing={0.4}
            style={[style.txt1]}>
            Available Chat Rooms
          </AppText>
          <AppButton
            title="Create Room"
            style={[style.btn]}
            // showIndiator={true}
            onPress={onPress}
          />
        </AppContainerView>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
          data={chatRoomsData}
          renderItem={_itemRender}
          ItemSeparatorComponent={_itemSeparatorComponent}
          contentContainerStyle={style.contentContainerStyle}
        />
      </AppContainerView>
    </>
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
    paddingHorizontal: '7%',
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
  headerTitle: {
    color: Colors.text,
    marginLeft: getResWidth(7),
  },
  mainView: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingTop: getResHeight(18),
  },
  txt1: {
    color: Colors.text,
    width: '50%',
  },
  btn: {
    width: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  contentContainerStyle: {
    paddingVertical: '3%',
  },
  itemStyle: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: getResHeight(10),
  },
  itemContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: getResHeight(12),
    paddingHorizontal: getResWidth(12),
    borderRadius: getResWidth(22),
    backgroundColor: Colors.accent,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.22,
    elevation: 10,
  },
  nameTxt: {
    width: '65%',
    height: 'auto',
    textAlignVertical: 'center',
  },
  joinBtn: {
    width: '25%',
    height: getResHeight(35),
  },
  separatorView: {
    width: '100%',
    height: getResHeight(1),
  },
});

export default Screen;
