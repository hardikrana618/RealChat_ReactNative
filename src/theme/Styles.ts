import React from 'react';
import {StyleSheet} from 'react-native';

import {Colors} from './Colors';
import {getResFont, getResHeight, getResWidth} from './Responsive';

export const btnTheme = {
  height: getResHeight(42),
  radius: 100,
  bg: Colors.primary,
  disabledbg: Colors.rgbSecondary(),
  //
  text: Colors.accent,
  disableText: Colors.accent,
  fontSize: getResFont(14),
  fontWeight: 600,
  lineHeight: getResFont(24),
  //
  indiatorDirection: 'center',
  indiatorColor: Colors.accent,
  indiatorSize: getResWidth(30),
  gradintProps: {
    start: {x: 0, y: 0},
    end: {x: 1, y: 0},
  },
  activeOpacity: 0.5,
};

export default StyleSheet.create({
  cardStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
