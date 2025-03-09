import React, {useContext} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  PixelRatio,
  Platform,
} from 'react-native';

const {height: deviceHeight, width: deviceWidth} = Dimensions.get('screen');

const [shortDimension, longDimension] =
  deviceWidth < deviceHeight
    ? [deviceWidth, deviceHeight]
    : [deviceHeight, deviceWidth];

const statusBarHeight = StatusBar.currentHeight;

const screenHeightIncludeNavBar = deviceHeight - statusBarHeight;

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const moderateVerticalScale = (size: number, factor: number = 0.5) =>
  size + (verticalScale(size) - size) * factor;

const toHeight = (percentage: number = 100) => {
  // const orientation = useOrientation();
  const {height} = Dimensions.get('screen');
  return PixelRatio.roundToNearestPixel((longDimension * percentage) / 100);
};
const toWidth = (percentage: number = 100) => {
  return PixelRatio.roundToNearestPixel((shortDimension * percentage) / 100);
};

function getResFont(size: number, factor = 0.5) {
  return moderateScale(size, factor);
}

function getResWidth(size: number, factor = 0.5) {
  return scale(size);
}

function getResHeight(size: number, factor = 0.5) {
  return verticalScale(size);
}

type NamedStyles<T> = {
  [P in keyof T]:
    | {skipResponsive?: boolean}
    | ViewStyle
    | TextStyle
    | ImageStyle;
};
export const XStyleSheet = {
  ...StyleSheet,
  create: <T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T>,
    skipResponsive?: boolean,
  ): T =>
    StyleSheet.create(
      objectMap(styles, (value: any) => {
        if (skipResponsive || value.skipResponsive) {
          return value;
        } else {
          return checkForResponsive(value);
        }
      }),
    ) as T,
};

const objectMap = (object: object, mapFn: Function) => {
  return Object.keys(object).reduce((result, key) => {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
};

const checkForResponsive = object => {
  const heightProperties = [
    'height',
    'paddingTop',
    'paddingBottom',
    'marginTop',
    'marginBottom',
    'paddingVertical',
    'marginVertical',
    'top',
    'bottom',
    'minHeight',
    'maxHeight',
    'borderTopWidth',
    'borderBottomWidth',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
  ];
  const widthProperties = [
    'width',
    'paddingLeft',
    'paddingRight',
    'marginLeft',
    'marginRight',
    'paddingHorizontal',
    'marginHorizontal',
    'left',
    'right',
    'minWidth',
    'maxWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
  ];
  const fontProperties = ['fontSize', 'lineHeight'];
  return Object.keys(object).reduce((result, key) => {
    if (typeof object[key] === 'number') {
      if (
        key.includes('flex') ||
        key.includes('opacity') ||
        key.includes('elevation') ||
        key.includes('shadowOpacity') ||
        key.includes('aspectRatio') ||
        key.includes('zIndex')
      ) {
        result[key] = object[key];
      } else {
        if (heightProperties.includes(key)) {
          result[key] = getResHeight(object[key]);
        } else if (widthProperties.includes(key)) {
          result[key] = getResWidth(object[key]);
        } else if (fontProperties.includes(key)) {
          result[key] = getResFont(object[key]);
        } else {
          result[key] = moderateScale(object[key]);
        }
      }
    } else {
      result[key] = object[key];
    }

    return {...result};
  }, {});
};

export {
  deviceHeight,
  deviceWidth,
  screenHeightIncludeNavBar,
  toHeight,
  toWidth,
  getResFont,
  getResWidth,
  getResHeight,
};
