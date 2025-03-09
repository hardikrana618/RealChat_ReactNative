import React, {memo, useCallback} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {btnTheme, Colors, getResHeight, getResWidth} from '@/theme';
import AppText, {AppTextProps} from '../AppText';
import ActivityIndicator, {IndiatorProps} from '../ActivityIndicator';

export type ButtonProps = {
  mode?: 'gradientborder' | 'gradient' | 'default';
  title?: string;
  icon?: ImageSourcePropType;
  svgIcon?: React.ReactNode;
  iconColor?: string;
  onPress?: () => void;
  isAnimated?: boolean;
  disabled?: boolean;
  backgroundColor?: AppTextProps['color'];
  gradientContainerStyle?: StyleProp<ViewStyle>;
  disabledBackgroundColor?: AppTextProps['color'];
  disabledTextColor?: AppTextProps['color'];
  titleColor?: AppTextProps['color'];
  titleSize?: number;
  titleWeight?: AppTextProps['fontWeight'];
  titleLineHeight?: number;
  titleStyle?: StyleProp<TextStyle>;
  titleLetterSpacing?: number;
  iconStyle?: StyleProp<ImageStyle>;
  opacity?: number;
  iconDirection?: 'left' | 'right';
  spaceBetween?: boolean;
  style?: StyleProp<ViewStyle> | ViewStyle;
  radius?: number;
  viewRef?: () => void;
  inputError?: boolean;
  shadowColor?: AppTextProps['color'];
  shadowOpacity?: number;
  shadowOffset?: {width: number; height: number};
  shadowRadius?: number;
  elevation?: number;
  center?: boolean;
  showIndiator?: boolean;
  indiatorDirection?: 'left' | 'right' | 'center';
  indiatorProps?: IndiatorProps;
};

const AppButton = ({
  mode = 'default',
  radius = btnTheme.radius,
  backgroundColor = btnTheme.bg,
  isAnimated = false,
  disabled,
  disabledBackgroundColor = Colors.rgbPrimary(0.5),
  disabledTextColor = btnTheme.disableText,
  gradientContainerStyle,
  icon,
  svgIcon,
  iconStyle,
  onPress = () => {
    console.log('onPress');
  },
  opacity = btnTheme.activeOpacity,
  title,
  viewRef,
  titleStyle,
  titleColor = btnTheme.text,
  titleSize = btnTheme.fontSize,
  titleWeight = btnTheme.fontWeight,
  titleLineHeight = btnTheme.lineHeight,
  titleLetterSpacing,
  iconDirection = 'right',
  spaceBetween,
  style,
  center = true,
  inputError = false,
  shadowColor,
  shadowOffset = {width: 0, height: getResHeight(2)},
  shadowOpacity = 0.25,
  shadowRadius = 8,
  elevation = 5.5,
  showIndiator = false,
  indiatorDirection = btnTheme.indiatorDirection,
  indiatorProps = {
    animating: true,
    color: btnTheme.indiatorColor,
    size: btnTheme.indiatorSize,
  },
  ...restProps
}: ButtonProps) => {
  const {...grdCstyle} = (StyleSheet.flatten(gradientContainerStyle) || {
    borderWidth: getResWidth(2),
    borderColor: Colors.accent,
  }) as ViewStyle;

  if (iconDirection == 'left' && indiatorDirection !== 'center') {
    indiatorDirection = indiatorDirection === 'left' ? 'right' : 'left';
  }

  const styles = StyleSheet.create({
    gradintStyle: {
      flex: 1,
      ...(grdCstyle.borderWidth && {
        margin: getResWidth(grdCstyle.borderWidth),
      }),
      borderRadius: getResWidth(radius),
      backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
    },
    indiatorContainerStyle: {
      backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
    },
    baseBtn: {
      flexDirection: iconDirection === 'right' ? 'row' : 'row-reverse',
      alignItems: 'center',
      justifyContent: spaceBetween
        ? 'space-between'
        : center
        ? 'center'
        : 'flex-start',
      width: '90%',
      height: btnTheme.height, // there is no need to define height and width you can set height and width based on your need
      paddingHorizontal: getResWidth(16),
      borderRadius: getResWidth(radius),
      backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
      ...(typeof shadowColor === 'string'
        ? {shadowColor, shadowOpacity, shadowOffset, shadowRadius, elevation}
        : {overflow: 'hidden'}),
    },
    baseTxt: {
      color: disabled ? disabledTextColor : titleColor,
    },
    btnBg: {
      ...StyleSheet.absoluteFillObject,
      zIndex: -1,
    },
    baseIc: {
      height: getResWidth(24),
      width: getResWidth(24),
    },
    errorStyle: {alignSelf: 'flex-start'},
  });

  // const [inputContainerLayout, setInputContainerLayout] = React.useState({
  //   width: 100,
  //   height: getResHeight(57),
  // });

  // const handleInputContainerLayout = React.useCallback(
  //   ({nativeEvent: {layout}}: LayoutChangeEvent) => {
  //     setInputContainerLayout({
  //       width: layout.width,
  //       height: layout.height,
  //     });
  //   },
  //   [],
  // );

  const showLoaderRender = useCallback(() => {
    const {style, ...indiatorRest} = indiatorProps;
    if (!showIndiator) {
      return null;
    }
    let dire = indiatorDirection;
    if (indiatorDirection !== 'center' && iconDirection == 'left') {
      dire = dire === 'left' ? 'right' : 'left';
    }
    return (
      <ActivityIndicator
        {...indiatorProps}
        style={[
          dire === 'left' && {
            marginRight: getResWidth(10),
          },
          dire === 'right' && {
            marginLeft: getResWidth(10),
          },
          style,
        ]}
      />
    );
  }, [showIndiator, indiatorDirection, indiatorProps]);

  return (
    <>
      <TouchableOpacity
        {...restProps}
        disabled={disabled || showIndiator}
        style={[styles.baseBtn, style]}
        activeOpacity={opacity}
        onPress={onPress}
        ref={viewRef}
        // onLayout={handleInputContainerLayout}
      >
        {(indiatorDirection == 'left' || indiatorDirection === 'center') &&
          showLoaderRender()}
        {(indiatorDirection === 'center' && showIndiator) ||
          (title && (
            <AppText
              lineHeight={titleLineHeight}
              fontSize={titleSize}
              fontWeight={titleWeight}
              color={titleColor}
              letterSpacing={titleLetterSpacing}
              style={[styles.baseTxt, titleStyle]}>
              {title}
            </AppText>
          ))}
        {(indiatorDirection === 'center' && showIndiator) ||
          ((!!icon || !!svgIcon) && (
            <>
              {svgIcon ? (
                svgIcon
              ) : (
                <Image source={icon} style={[styles.baseIc, iconStyle]} />
              )}
            </>
          ))}
        {indiatorDirection == 'right' && showLoaderRender()}
      </TouchableOpacity>
    </>
  );
};

export default memo(AppButton);
