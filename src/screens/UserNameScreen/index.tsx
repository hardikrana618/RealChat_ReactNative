import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, TextInput} from 'react-native';
import {useFormik} from 'formik';

import {AppContainerView, AppText, AppButton} from '@/components';
import {Colors, getResFont, getResHeight, getResWidth} from '@/theme';
import Styles from '@/theme/Styles';
import {navigateReplace} from '@/navigators/Navigationref';
import {PageName} from '@/config';
import {UserNameSchema} from '@/utils';
import {postUserNameAPI} from '@/services/Apis/Auth';
import {useAppDispatch} from '@/store';

type initialProps = {
  username: string;
};

function Screen(): React.JSX.Element {
  let dispatch = useAppDispatch();

  const [showLoder, setShowLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: UserNameSchema,
    onSubmit: values => onSubmitHandler(values),
  });

  const onSubmitHandler = async (values: initialProps) => {
    try {
      setShowLoader(true);
      let result = await dispatch(postUserNameAPI({username: values.username}));
      setShowLoader(false);
      if (result) {
        navigateReplace(PageName.AppStack);
      }
    } catch {
      setShowLoader(false);
    }
  };

  const onChangeText = (txt: string) => {
    formik.setFieldValue('username', txt);
  };

  return (
    <AppContainerView style={[style.containerView]}>
      <AppText fontSize={getResFont(22)} style={[style.wlcText]}>
        Welcome to RealChat
      </AppText>
      <TextInput
        value={formik.values.username}
        selectionColor={Colors.primary}
        placeholder="Enter your username"
        style={[style.txtInput]}
        onChangeText={onChangeText}
        collapsable={false}
        autoCapitalize="none"
      />
      <AppButton
        title="Sign In"
        showIndiator={showLoder}
        style={[style.btn]}
        disabled={!(formik.dirty && formik.isValid)}
        onPress={formik.handleSubmit}
      />
    </AppContainerView>
  );
}

const style = StyleSheet.create({
  containerView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wlcText: {
    color: Colors.text,
    marginBottom: getResHeight(30),
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
    elevation: 10,
  },
  btn: {
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

export default Screen;
