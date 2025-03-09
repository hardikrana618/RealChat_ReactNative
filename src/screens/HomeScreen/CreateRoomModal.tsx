import React, {memo, useCallback, useState} from 'react';

import {AppButton, AppContainerView, AppText} from '@/components';
import {Modal, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useAppDispatch} from '@/store';
import {Colors, getResHeight, getResWidth, toHeight} from '@/theme';
import {VectorIcon} from '@/hooks';
import {useFormik} from 'formik';
import {groupNameSchema} from '@/utils';
import {postCreateRoomsAPI} from '@/services/Apis/ChatRooms';

interface CreateRoomProps {
  visible: boolean;
  onDismiss: () => void;
}

type initialProps = {
  groupName: string;
};

function CreateRoomModal({
  visible = false,
  onDismiss = () => {
    console.log('onDismiss function Calling');
  },
  ...reset
}: CreateRoomProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const [showLoder, setShowLoader] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      groupName: '',
    },
    validationSchema: groupNameSchema,
    onSubmit: values => onSubmitHandler(values),
  });

  const onSubmitHandler = async (values: initialProps) => {
    try {
      setShowLoader(true);
      let result = await dispatch(postCreateRoomsAPI({name: values.groupName}));
      if (result) {
        onDismiss();
      }
      setShowLoader(false);
    } catch {}
  };

  const onChangeText = (txt: string) => {
    formik.setFieldValue('groupName', txt);
  };

  return (
    <Modal visible={visible} transparent>
      <AppContainerView style={[style.containerStyle]}>
        <TouchableOpacity onPress={onDismiss} style={[style.touchStyle]} />
        <AppContainerView safeAreaType="bottom" style={[style.containerView]}>
          {/* Header View */}
          <AppContainerView style={[style.headerView]}>
            <AppText fontSize={18} fontWeight={700} style={[style.titleTxt]}>
              Create Chat Room
            </AppText>
            <AppButton
              radius={0}
              onPress={onDismiss}
              backgroundColor={Colors.transparent}
              style={[style.closebtn]}
              svgIcon={
                <VectorIcon
                  type="Ionicons"
                  name="close"
                  size={35}
                  color={Colors.black}
                />
              }
            />
          </AppContainerView>
          {/*  */}
          {/* Main Contain */}
          <AppContainerView
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              value={formik.values.groupName}
              selectionColor={Colors.primary}
              placeholder="Enter your username"
              style={[style.txtInput]}
              onChangeText={onChangeText}
              collapsable={false}
              autoCapitalize="none"
            />
            <AppButton
              title="Create"
              showIndiator={showLoder}
              style={[style.donebtn]}
              disabled={!(formik.dirty && formik.isValid)}
              onPress={formik.handleSubmit}
            />
          </AppContainerView>
          {/*  */}
        </AppContainerView>
      </AppContainerView>
    </Modal>
  );
}

const style = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Colors.rgbBlack(0.4),
    flexDirection: 'column-reverse',
  },
  touchStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  containerView: {
    width: '100%',
    height: toHeight(50),
    backgroundColor: Colors.accent,
    borderTopLeftRadius: getResWidth(20),
    borderTopRightRadius: getResWidth(20),
    overflow: 'hidden',
  },
  headerView: {
    width: '100%',
    height: getResHeight(45),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: getResWidth(12),
    backgroundColor: Colors.accent,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.22,
    elevation: 3,
  },
  titleTxt: {
    flex: 1,
  },
  closebtn: {
    width: getResWidth(40),
    height: getResWidth(40),
    paddingHorizontal: 0,
  },
  txtInput: {
    width: '90%',
    height: getResHeight(42),
    paddingHorizontal: getResWidth(15),
    marginBottom: getResHeight(15),
    borderRadius: 50,
    backgroundColor: Colors.accent,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 8,
  },
  donebtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default memo(CreateRoomModal);
